import type { Story } from "@ladle/react";
import { ScorecardGrid } from "./ScorecardGrid";
import type { GameOutput } from "../api";

const mockGame: GameOutput = {
  id: 'game-001',
  gameInfo: {
    homeTeam: { fullName: 'Red Sox', abbreviation: 'BOS' },
    visitingTeam: { fullName: 'Yankees', abbreviation: 'NYY' },
    date: '2024-07-15',
    location: 'Fenway Park',
    startTime: '7:10pm',
    id: 'game-001',
  },
  lineups: {
    home: [
      [{ player: { name: 'Betts', number: 50 }, position: 9, inning: 0 }],
      [{ player: { name: 'Devers', number: 11 }, position: 5, inning: 0 }],
      [{ player: { name: 'Bogaerts', number: 2 }, position: 6, inning: 0 }],
      [{ player: { name: 'Martinez', number: 28 }, position: 'DH', inning: 0 }],
    ],
    visiting: [
      [{ player: { name: 'Judge', number: 99 }, position: 8, inning: 0 }],
      [{ player: { name: 'Stanton', number: 27 }, position: 'DH', inning: 0 }],
      [{ player: { name: 'Rizzo', number: 48 }, position: 3, inning: 0 }],
      [{ player: { name: 'LeMahieu', number: 26 }, position: 4, inning: 0 }],
    ],
  },
  pitchers: {
    home: [
      { player: { name: 'Sale', number: 41 }, inning: 0, type: 'starter', stats: { er: 3 } },
    ],
    visiting: [
      { player: { name: 'Cole', number: 45 }, inning: 0, type: 'starter', stats: { er: 5 } },
    ],
  },
  gameplay: {
    home: Array(9).fill(null).map(() => []),
    visiting: Array(9).fill(null).map(() => []),
  },
  stats: {
    home: {
      scoring: [0, 0, 2, 0, 1, 0, 0, 2, 0],
      runs: 5,
      hits: 8,
      errors: 0,
    },
    visiting: {
      scoring: [1, 0, 0, 1, 0, 0, 1, 0, 0],
      runs: 3,
      hits: 6,
      errors: 1,
    },
  },
};

export const Default: Story = () => (
  <div className="p-4">
    <ScorecardGrid scorecard={mockGame} />
  </div>
);

export const DifferentScore: Story = () => {
  const highScoringGame: GameOutput = {
    ...mockGame,
    id: 'game-002',
    gameInfo: {
      ...mockGame.gameInfo,
      homeTeam: { fullName: 'Dodgers', abbreviation: 'LAD' },
      visitingTeam: { fullName: 'Giants', abbreviation: 'SF' },
      location: 'Dodger Stadium',
    },
    stats: {
      home: {
        scoring: [2, 3, 1, 0, 4, 2, 0, 1, 2],
        runs: 15,
        hits: 18,
        errors: 0,
      },
      visiting: {
        scoring: [1, 0, 2, 1, 0, 3, 0, 4, 0],
        runs: 11,
        hits: 14,
        errors: 2,
      },
    },
  };

  return (
    <div className="p-4">
      <ScorecardGrid scorecard={highScoringGame} />
    </div>
  );
};

export const ExtraInnings: Story = () => {
  const extraInningsGame: GameOutput = {
    ...mockGame,
    id: 'game-003',
    stats: {
      home: {
        scoring: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        runs: 2,
        hits: 8,
        errors: 0,
      },
      visiting: {
        scoring: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        runs: 1,
        hits: 6,
        errors: 1,
      },
    },
  };

  return (
    <div className="p-4">
      <ScorecardGrid scorecard={extraInningsGame} />
    </div>
  );
};
