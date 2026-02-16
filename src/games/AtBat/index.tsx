import type { AtBat, BaseResult } from "~/games/api";

interface AtBatProps {
  atBat: AtBat | null;
}

function getBasePosition(baseIndex: number): { cx: number; cy: number } {
  // Base positions on a 100x100 coordinate system
  // Home is at bottom (50, 90)
  // 1B is at right (90, 50)
  // 2B is at top (50, 10)
  // 3B is at left (10, 50)
  const positions: Record<number, { cx: number; cy: number }> = {
    0: { cx: 50, cy: 90 }, // Home
    1: { cx: 90, cy: 50 }, // 1B
    2: { cx: 50, cy: 10 }, // 2B
    3: { cx: 10, cy: 50 }, // 3B
  };
  return positions[baseIndex] || positions[0];
}

function getResultDisplay(result: AtBat["result"]): string {
  if (!result) return "";
  return result.display || "";
}

function BasePath({
  from,
  to,
  solid = true,
}: {
  from: number;
  to: number;
  solid?: boolean;
}) {
  const positions = [
    { x: 50, y: 90 }, // Home
    { x: 90, y: 50 }, // 1B
    { x: 50, y: 10 }, // 2B
    { x: 10, y: 50 }, // 3B
  ];

  const start = positions[from];
  const end = positions[to];

  return (
    <line
      x1={`${start.x}%`}
      y1={`${start.y}%`}
      x2={`${end.x}%`}
      y2={`${end.y}%`}
      stroke="#1f2937"
      strokeWidth="2"
      strokeDasharray={solid ? undefined : "4 2"}
    />
  );
}

export function AtBatComponent({ atBat }: AtBatProps) {
  if (!atBat) {
    return (
      <div className="w-full h-full relative">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{ display: "block" }}
        >
          {/* Light background */}
          <rect x="0" y="0" width="100" height="100" fill="white" />
          
          {/* Diamond outline */}
          <polygon
            points="50,10 90,50 50,90 10,50"
            fill="none"
            stroke="#1f2937"
            strokeWidth="1"
            opacity="0.3"
          />
        </svg>
      </div>
    );
  }

  // Determine which bases were reached
  const reachedBases: number[] = [];
  atBat.bases.forEach((baseResult: BaseResult, index: number) => {
    if (baseResult.advanced) {
      reachedBases.push(index + 1);
    }
  });

  // Determine hit type and base reached based on result
  let hitType: string | null = null;
  let baseReached: number | null = null;
  const resultType = atBat.result?.type;
  const resultValue = atBat.result?.result;
  
  if (resultType === "hit" && typeof resultValue === "number") {
    if (resultValue === 1) { hitType = "1B"; baseReached = 1; }
    else if (resultValue === 2) { hitType = "2B"; baseReached = 2; }
    else if (resultValue === 3) { hitType = "3B"; baseReached = 3; }
    else if (resultValue === 4) {
      hitType = "HR";
      baseReached = 4;
      // For home runs, all bases should be filled
      [1, 2, 3].forEach(base => {
        if (!reachedBases.includes(base)) {
          reachedBases.push(base);
        }
      });
    }
  } else if (resultType === "pitcher-result") {
    // Only walks and HBP result in batter reaching 1st base
    // Strikeouts (K, K-looking) do not
    if (resultValue === "BB" || resultValue === "IBB" || resultValue === "HB") {
      baseReached = 1;
    }
  }

  // Get the main result display
  const mainResult = getResultDisplay(atBat.result);

  return (
    <div className="w-full h-full relative">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ display: "block" }}
      >
        {/* Light background */}
        <rect x="0" y="0" width="100" height="100" fill="white" />
        
        {/* Diamond outline */}
        <polygon
          points="50,10 90,50 50,90 10,50"
          fill="none"
          stroke="#1f2937"
          strokeWidth="1"
        />

        {/* Basepaths for hits, walks, HBP */}
        {(hitType || (resultType === "pitcher-result" && baseReached === 1)) && (
          <g>
            {(hitType === "1B" || baseReached === 1) && <BasePath from={0} to={1} />}
            {hitType === "2B" && (
              <>
                <BasePath from={0} to={1} />
                <BasePath from={1} to={2} />
              </>
            )}
            {hitType === "3B" && (
              <>
                <BasePath from={0} to={1} />
                <BasePath from={1} to={2} />
                <BasePath from={2} to={3} />
              </>
            )}
            {hitType === "HR" && (
              <>
                <BasePath from={0} to={1} />
                <BasePath from={1} to={2} />
                <BasePath from={2} to={3} />
                <BasePath from={3} to={0} />
              </>
            )}
          </g>
        )}

        {/* HR - fill the diamond */}
        {hitType === "HR" && (
          <polygon
            points="50,10 90,50 50,90 10,50"
            fill="#1f2937"
            opacity="0.15"
          />
        )}

        {/* Sacrifice indicator - "SAC" in green in top left */}
        {atBat.isSacrifice && (
          <text
            x="5"
            y="12"
            fontSize="8"
            fill="#16a34a"
            fontWeight="bold"
          >
            SAC
          </text>
        )}

        {/* Outs - small red dot in top right corner */}
        {atBat.isOut && (
          <circle
            cx="92"
            cy="8"
            r="3"
            fill="#dc2626"
          />
        )}

        {/* Base markers - diamond shapes positioned so baselines meet at corners */}
        {/* Filled bases (reached) - dark */}
        {[1, 2, 3].map((baseNum) => {
          const reached = reachedBases.includes(baseNum);
          if (!reached) return null;
          
          const depth = 6; // How far the base extends inward from the corner
          const width = 4; // How wide the base is perpendicular to the diamond edge
          
          let points: string;
          if (baseNum === 1) {
            // 1B at (90,50): extends left toward center
            // Outer corner at baseline intersection, sides align with baselines
            points = `${90},${50} ${90-width},${50-width} ${90-depth},${50} ${90-width},${50+width}`;
          } else if (baseNum === 2) {
            // 2B at (50,10): extends down toward center
            points = `${50},${10} ${50+width},${10+width} ${50},${10+depth} ${50-width},${10+width}`;
          } else {
            // 3B at (10,50): extends right toward center
            points = `${10},${50} ${10+width},${50-width} ${10+depth},${50} ${10+width},${50+width}`;
          }
          
          return (
            <polygon
              key={baseNum}
              points={points}
              fill="#1f2937"
              stroke="#1f2937"
              strokeWidth="1"
            />
          );
        })}
        
        {/* Unreached bases - just outline in default color */}
        {[1, 2, 3].map((baseNum) => {
          const reached = reachedBases.includes(baseNum);
          if (reached) return null;
          
          const depth = 6; // How far the base extends inward from the corner
          const width = 4; // How wide the base is perpendicular to the diamond edge
          
          let points: string;
          if (baseNum === 1) {
            // 1B at (90,50): extends left toward center
            points = `${90},${50} ${90-width},${50-width} ${90-depth},${50} ${90-width},${50+width}`;
          } else if (baseNum === 2) {
            // 2B at (50,10): extends down toward center
            points = `${50},${10} ${50+width},${10+width} ${50},${10+depth} ${50-width},${10+width}`;
          } else {
            // 3B at (10,50): extends right toward center
            points = `${10},${50} ${10+width},${50-width} ${10+depth},${50} ${10+width},${50+width}`;
          }
          
          return (
            <polygon
              key={baseNum}
              points={points}
              fill="none"
              stroke="#1f2937"
              strokeWidth="1"
            />
          );
        })}
      </svg>

      {/* Result text overlay - show in center for outs, at base for hits/walks/HBP */}
      {/* Only show in center if initial result was an out (not if batter reached and was later thrown out) */}
      {atBat.isOut && !baseReached ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-gray-900">
            {mainResult}
          </span>
        </div>
      ) : baseReached && (
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold bg-white px-1 rounded"
          style={{
            left: baseReached === 1 ? "90%" : baseReached === 2 ? "50%" : baseReached === 3 ? "10%" : "50%",
            top: baseReached === 1 ? "50%" : baseReached === 2 ? "10%" : baseReached === 3 ? "50%" : "50%",
            color: "#1f2937",
          }}
        >
          {mainResult}
        </div>
      )}

      {/* Base-specific results - show on the basepath between bases */}
      {atBat.bases.map((baseResult: BaseResult, index: number) => {
        if (!baseResult.result) return null;

        const baseNum = index + 1;
        const display = baseResult.result.display || "";
        
        // Position on the basepath leading TO this base (from previous base)
        // Home (50,90) to 1B (90,50): midpoint is (70,70)
        // 1B (90,50) to 2B (50,10): midpoint is (70,30)
        // 2B (50,10) to 3B (10,50): midpoint is (30,30)
        // 3B (10,50) to Home (50,90): midpoint is (30,70)
        let left, top;
        if (baseNum === 1) {
          // On basepath from Home to 1B
          left = "70%";
          top = "70%";
        } else if (baseNum === 2) {
          // On basepath from 1B to 2B
          left = "70%";
          top = "30%";
        } else if (baseNum === 3) {
          // On basepath from 2B to 3B
          left = "30%";
          top = "30%";
        } else {
          // Home (baseNum would be 0 or invalid)
          left = "30%";
          top = "70%";
        }

        return (
          <div
            key={baseNum}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold bg-white px-1 rounded"
            style={{
              left,
              top,
              color: "#1f2937",
            }}
          >
            {display}
          </div>
        );
      })}

      {/* Pitch count - balls on top, strikes on bottom, bottom right corner */}
      <div className="absolute bottom-1 right-1 flex flex-col items-end gap-0.5">
        {/* Balls - 3 circles on top */}
        <div className="flex gap-0.5 justify-end">
          {[0, 1, 2].map((i) => (
            <div
              key={`ball-${i}`}
              className={`w-1.5 h-1.5 rounded-full border border-gray-400 ${
                i < atBat.balls ? "bg-gray-800" : "bg-white"
              }`}
            />
          ))}
        </div>
        {/* Strikes - 2 circles on bottom */}
        <div className="flex gap-0.5 justify-end">
          {[0, 1].map((i) => (
            <div
              key={`strike-${i}`}
              className={`w-1.5 h-1.5 rounded-full border border-gray-400 ${
                i < atBat.strikes ? "bg-gray-800" : "bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
