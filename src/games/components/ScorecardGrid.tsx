import type { GameOutput, BatterEntry } from "~/games/api";

interface ScorecardGridProps {
  scorecard: GameOutput;
}

// Get position display name
function getPositionName(position: number | string): string {
  const positions: Record<number | string, string> = {
    1: "P",
    2: "C",
    3: "1B",
    4: "2B",
    5: "3B",
    6: "SS",
    7: "LF",
    8: "CF",
    9: "RF",
    DH: "DH",
    PH: "PH",
    PR: "PR",
  };
  return positions[position] || String(position);
}

// Get current batter from lineup
function getCurrentBatter(
  lineup: BatterEntry[][],
  lineupSpot: number,
): BatterEntry | null {
  if (!lineup[lineupSpot] || lineup[lineupSpot].length === 0) return null;
  return lineup[lineupSpot][0];
}

export function ScorecardGrid({ scorecard }: ScorecardGridProps) {
  const { gameInfo, lineups, pitchers, gameplay, stats } = scorecard;
  const innings = stats.home.scoring.length;
  const inningNumbers = Array.from({ length: innings }, (_, i) => i + 1);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-2 py-1 text-left">Team</th>
            {inningNumbers.map((inning) => (
              <th
                key={inning}
                className="border border-gray-300 px-2 py-1 text-center w-12"
              >
                {inning}
              </th>
            ))}
            <th className="border border-gray-300 px-2 py-1 text-center">R</th>
            <th className="border border-gray-300 px-2 py-1 text-center">H</th>
            <th className="border border-gray-300 px-2 py-1 text-center">E</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-2 py-1 font-semibold">
              {gameInfo.visitingTeam.abbreviation}
            </td>
            {inningNumbers.map((inning) => (
              <td key={inning} className="border border-gray-300 p-0">
                <div className="h-16 flex items-center justify-center text-xs">
                  {stats.visiting.scoring[inning - 1] || 0}
                </div>
              </td>
            ))}
            <td className="border border-gray-300 px-2 py-1 text-center font-bold">
              {stats.visiting.runs}
            </td>
            <td className="border border-gray-300 px-2 py-1 text-center">
              {stats.visiting.hits}
            </td>
            <td className="border border-gray-300 px-2 py-1 text-center">
              {stats.visiting.errors}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-2 py-1 font-semibold">
              {gameInfo.homeTeam.abbreviation}
            </td>
            {inningNumbers.map((inning) => (
              <td key={inning} className="border border-gray-300 p-0">
                <div className="h-16 flex items-center justify-center text-xs">
                  {stats.home.scoring[inning - 1] || 0}
                </div>
              </td>
            ))}
            <td className="border border-gray-300 px-2 py-1 text-center font-bold">
              {stats.home.runs}
            </td>
            <td className="border border-gray-300 px-2 py-1 text-center">
              {stats.home.hits}
            </td>
            <td className="border border-gray-300 px-2 py-1 text-center">
              {stats.home.errors}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2">
            {gameInfo.visitingTeam.fullName} Lineup
          </h4>
          <ul className="text-sm">
            {lineups.visiting.map((lineupSpot, idx) => {
              const batter = getCurrentBatter(lineups.visiting, idx);
              if (!batter) return null;
              return (
                <li key={idx} className="flex gap-2">
                  <span className="font-mono">{idx + 1}.</span>
                  <span className="font-mono">{batter.player.number}</span>
                  <span>{batter.player.name}</span>
                  <span className="text-gray-500">
                    ({getPositionName(batter.position)})
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">
            {gameInfo.homeTeam.fullName} Lineup
          </h4>
          <ul className="text-sm">
            {lineups.home.map((lineupSpot, idx) => {
              const batter = getCurrentBatter(lineups.home, idx);
              if (!batter) return null;
              return (
                <li key={idx} className="flex gap-2">
                  <span className="font-mono">{idx + 1}.</span>
                  <span className="font-mono">{batter.player.number}</span>
                  <span>{batter.player.name}</span>
                  <span className="text-gray-500">
                    ({getPositionName(batter.position)})
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {(pitchers.home.length > 0 || pitchers.visiting.length > 0) && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">
              {gameInfo.visitingTeam.fullName} Pitchers
            </h4>
            <ul className="text-sm">
              {pitchers.visiting.map((pitcher, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="font-mono">{pitcher.player.number}</span>
                  <span>{pitcher.player.name}</span>
                  <span className="text-gray-500">
                    ({pitcher.type}, {pitcher.stats.er} ER)
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">
              {gameInfo.homeTeam.fullName} Pitchers
            </h4>
            <ul className="text-sm">
              {pitchers.home.map((pitcher, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="font-mono">{pitcher.player.number}</span>
                  <span>{pitcher.player.name}</span>
                  <span className="text-gray-500">
                    ({pitcher.type}, {pitcher.stats.er} ER)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        {gameInfo.location && <span>Location: {gameInfo.location} | </span>}
        {gameInfo.startTime && <span>Start: {gameInfo.startTime}</span>}
      </div>
    </div>
  );
}
