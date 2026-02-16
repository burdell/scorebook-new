import type { GameOutput, GameInfo, Gameplay, GameStats, Team, BatterEntry, PitcherEntry, AtBat } from 'scorekeepr'

// Re-export scorekeepr types for use in components
export type { GameOutput, GameInfo, Gameplay, GameStats, Team, BatterEntry, PitcherEntry, AtBat }

// Mock data store using scorekeepr types
const mockScorecards: GameOutput[] = [
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
  },
]

// Simple async functions for data fetching
export async function getScorecards(): Promise<GameOutput[]> {
  return mockScorecards
}

export async function getScorecardById(id: string): Promise<GameOutput | null> {
  return mockScorecards.find((sc) => sc.id === id) || null
}

export async function getScorecardsByDate(date: string): Promise<GameOutput[]> {
  return mockScorecards.filter((sc) => sc.gameInfo.date === date)
}
