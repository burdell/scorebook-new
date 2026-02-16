import type { Story } from "@ladle/react";
import { AtBatComponent } from "./index";
import type { AtBat, BaseResult } from "~/games/api";

// Helper to create AtBat objects
function createAtBat(
  balls: number,
  strikes: number,
  isOut: boolean,
  result: AtBat["result"],
  bases: BaseResult[]
): AtBat {
  return {
    balls,
    strikes,
    pitchCount: balls + strikes,
    isOut,
    result,
    bases,
  };
}

// Mock data factories
function createPitcherResult(type: string, display: string): AtBat["result"] {
  return { type: "pitcher-result", result: type, display } as AtBat["result"];
}

function createHit(base: number): AtBat["result"] {
  const display = base === 4 ? "HR" : `${base}B`;
  return { type: "hit", result: base, display } as AtBat["result"];
}

function createFlyOut(position: number): AtBat["result"] {
  return { type: "flyout", result: position, display: `F${position}` } as AtBat["result"];
}

function createLineOut(position: number): AtBat["result"] {
  return { type: "lineout", result: position, display: `L${position}` } as AtBat["result"];
}

function createPutOut(positions: number[]): AtBat["result"] {
  const display = positions.length === 1 ? `${positions[0]}u` : positions.join("-");
  return { type: "putout", result: positions, display } as AtBat["result"];
}

// Base result arrays
const singleBases: BaseResult[] = [{ advanced: true }, { advanced: false }, { advanced: false }];
const doubleBases: BaseResult[] = [{ advanced: true }, { advanced: true }, { advanced: false }];
const tripleBases: BaseResult[] = [{ advanced: true }, { advanced: true }, { advanced: true }];
const homeRunBases: BaseResult[] = [{ advanced: true }, { advanced: true }, { advanced: true }];
const outBases: BaseResult[] = [{ advanced: false }, { advanced: false }, { advanced: false }];

const container = (children: React.ReactNode) => (
  <div className="p-8 space-y-8">
    <h2 className="text-2xl font-bold mb-4">AtBat Component Examples</h2>
    {children}
  </div>
);

export const AllExamples: Story = () => {
  return container(
    <div className="space-y-8">
      {/* Empty State */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Empty State</h3>
        <div className="w-32 h-32 border border-gray-300">
          <AtBatComponent atBat={null} />
        </div>
      </section>

      {/* Hits */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Hits</h3>
        <div className="flex gap-4">
          <div className="text-center">
            <div className="w-32 h-32 border border-gray-300">
              <AtBatComponent
                atBat={createAtBat(1, 1, false, createHit(1), singleBases)}
              />
            </div>
            <p className="text-sm mt-1">Single</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 border border-gray-300">
              <AtBatComponent
                atBat={createAtBat(2, 1, false, createHit(2), doubleBases)}
              />
            </div>
            <p className="text-sm mt-1">Double</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 border border-gray-300">
              <AtBatComponent
                atBat={createAtBat(0, 2, false, createHit(3), tripleBases)}
              />
            </div>
            <p className="text-sm mt-1">Triple</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 border border-gray-300">
              <AtBatComponent
                atBat={createAtBat(2, 0, false, createHit(4), homeRunBases)}
              />
            </div>
            <p className="text-sm mt-1">Home Run</p>
          </div>
        </div>
      </section>

      {/* Outs */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Outs</h3>
        <div className="flex gap-4">
          <div className="text-center">
            <div className="w-32 h-32 border border-gray-300">
              <AtBatComponent
                atBat={createAtBat(1, 3, true, createPitcherResult("K", "K"), outBases)}
              />
            </div>
            <p className="text-sm mt-1">Strikeout</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 border border-gray-300">
              <AtBatComponent
                atBat={createAtBat(0, 3, true, createFlyOut(8), outBases)}
              />
            </div>
            <p className="text-sm mt-1">Fly Out (CF)</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 border border-gray-300">
              <AtBatComponent
                atBat={createAtBat(1, 2, true, createLineOut(6), outBases)}
              />
            </div>
            <p className="text-sm mt-1">Line Out (SS)</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 border border-gray-300">
              <AtBatComponent
                atBat={createAtBat(2, 1, true, createPutOut([3]), outBases)}
              />
            </div>
            <p className="text-sm mt-1">Ground Out (1B)</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 border border-gray-300">
              <AtBatComponent
                atBat={createAtBat(1, 1, true, createPutOut([6, 4, 3]), outBases)}
              />
            </div>
            <p className="text-sm mt-1">Double Play (6-4-3)</p>
          </div>
        </div>
      </section>

      {/* Walks and HBP */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Walks and HBP</h3>
        <div className="flex gap-4">
          <div className="text-center">
            <div className="w-32 h-32 border border-gray-300">
              <AtBatComponent
                atBat={createAtBat(4, 1, false, createPitcherResult("BB", "BB"), singleBases)}
              />
            </div>
            <p className="text-sm mt-1">Walk</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 border border-gray-300">
              <AtBatComponent
                atBat={createAtBat(4, 0, false, createPitcherResult("IBB", "IBB"), singleBases)}
              />
            </div>
            <p className="text-sm mt-1">Intentional Walk</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 border border-gray-300">
              <AtBatComponent
                atBat={createAtBat(1, 1, false, createPitcherResult("HB", "HB"), singleBases)}
              />
            </div>
            <p className="text-sm mt-1">Hit By Pitch</p>
          </div>
        </div>
      </section>

      {/* Reached but then Out */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Reached Base but Then Out</h3>
        <div className="flex gap-4">
          <div className="text-center">
            <div className="w-32 h-32 border border-gray-300">
              <AtBatComponent
                atBat={{
                  balls: 1,
                  strikes: 1,
                  pitchCount: 2,
                  isOut: true,
                  result: createHit(1),
                  bases: [
                    { advanced: true },  // Reached 1B
                    { advanced: false, result: { type: "putout", result: [6, 4], display: "6-4" }, isAtBatResult: true },  // Out trying to reach 2B
                    { advanced: false }
                  ]
                }}
              />
            </div>
            <p className="text-sm mt-1">Single, Out at 2B (6-4)</p>
          </div>
        </div>
      </section>

      {/* Sacrifice Fly */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Sacrifice Fly</h3>
        <div className="flex gap-4">
          <div className="text-center">
            <div className="w-32 h-32 border border-gray-300">
              <AtBatComponent
                atBat={{
                  balls: 0,
                  strikes: 0,
                  pitchCount: 1,
                  isOut: true,
                  isSacrifice: true,
                  result: createFlyOut(8),
                  bases: [
                    { advanced: false },
                    { advanced: false },
                    { advanced: false }
                  ]
                }}
              />
            </div>
            <p className="text-sm mt-1">Sacrifice Fly (F8)</p>
          </div>
        </div>
      </section>

      {/* Scalability Demo */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Scalability (Same Component, Different Sizes)</h3>
        <div className="flex gap-4 items-end">
          <div className="text-center">
            <div className="w-16 h-16 border border-gray-300">
              <AtBatComponent
                atBat={createAtBat(1, 1, false, createHit(2), doubleBases)}
              />
            </div>
            <p className="text-sm mt-1">64x64px</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 border border-gray-300">
              <AtBatComponent
                atBat={createAtBat(1, 1, false, createHit(2), doubleBases)}
              />
            </div>
            <p className="text-sm mt-1">96x96px</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 border border-gray-300">
              <AtBatComponent
                atBat={createAtBat(1, 1, false, createHit(2), doubleBases)}
              />
            </div>
            <p className="text-sm mt-1">128x128px</p>
          </div>
          <div className="text-center">
            <div className="w-48 h-48 border border-gray-300">
              <AtBatComponent
                atBat={createAtBat(1, 1, false, createHit(2), doubleBases)}
              />
            </div>
            <p className="text-sm mt-1">192x192px</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export const Empty: Story = () => (
  <div className="p-8">
    <h3 className="text-lg font-semibold mb-2">Empty AtBat</h3>
    <div className="w-32 h-32 border border-gray-300">
      <AtBatComponent atBat={null} />
    </div>
  </div>
);

export const Single: Story = () => (
  <div className="p-8">
    <h3 className="text-lg font-semibold mb-2">Single</h3>
    <div className="w-32 h-32 border border-gray-300">
      <AtBatComponent
        atBat={createAtBat(1, 1, false, createHit(1), singleBases)}
      />
    </div>
  </div>
);

export const Strikeout: Story = () => (
  <div className="p-8">
    <h3 className="text-lg font-semibold mb-2">Strikeout</h3>
    <div className="w-32 h-32 border border-gray-300">
      <AtBatComponent
        atBat={createAtBat(1, 3, true, createPitcherResult("K", "K"), outBases)}
      />
    </div>
  </div>
);
