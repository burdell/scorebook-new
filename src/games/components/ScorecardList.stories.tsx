import type { Story } from "@ladle/react";
import { ScorecardList } from "./ScorecardList";
import type { GameOutput } from "../api";

const mockGames: GameOutput[] = [
  {
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
      home: [],
      visiting: [],
    },
    pitchers: {
      home: [],
      visiting: [],
    },
    gameplay: {
      home: [],
      visiting: [],
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
  },
  {
    id: 'game-002',
    gameInfo: {
      homeTeam: { fullName: 'Dodgers', abbreviation: 'LAD' },
      visitingTeam: { fullName: 'Giants', abbreviation: 'SF' },
      date: '2024-07-16',
      location: 'Dodger Stadium',
      startTime: '7:10pm',
      id: 'game-002',
    },
    lineups: {
      home: [],
      visiting: [],
    },
    pitchers: {
      home: [],
      visiting: [],
    },
    gameplay: {
      home: [],
      visiting: [],
    },
    stats: {
      home: {
        scoring: [1, 0, 0, 2, 0, 1, 0, 0, 0],
        runs: 4,
        hits: 9,
        errors: 1,
      },
      visiting: {
        scoring: [0, 0, 1, 0, 0, 0, 1, 0, 0],
        runs: 2,
        hits: 5,
        errors: 0,
      },
    },
  },
  {
    id: 'game-003',
    gameInfo: {
      homeTeam: { fullName: 'Cubs', abbreviation: 'CHC' },
      visitingTeam: { fullName: 'Cardinals', abbreviation: 'STL' },
      date: '2024-07-17',
      location: 'Wrigley Field',
      startTime: '2:20pm',
      id: 'game-003',
    },
    lineups: {
      home: [],
      visiting: [],
    },
    pitchers: {
      home: [],
      visiting: [],
    },
    gameplay: {
      home: [],
      visiting: [],
    },
    stats: {
      home: {
        scoring: [0, 1, 0, 0, 0, 0, 0, 0, 0],
        runs: 1,
        hits: 4,
        errors: 2,
      },
      visiting: {
        scoring: [2, 0, 0, 0, 1, 0, 0, 0, 0],
        runs: 3,
        hits: 7,
        errors: 0,
      },
    },
  },
];

export const Default: Story = () => (
  <div className="p-4 max-w-4xl">
    <ScorecardList scorecards={mockGames} />
  </div>
);

export const Empty: Story = () => (
  <div className="p-4 max-w-4xl">
    <ScorecardList scorecards={[]} />
  </div>
);

export const SingleGame: Story = () => (
  <div className="p-4 max-w-4xl">
    <ScorecardList scorecards={[mockGames[0]]} />
  </div>
);
