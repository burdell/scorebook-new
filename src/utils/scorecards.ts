import { z } from 'zod'

// Types for baseball scorecards
export const PlayerSchema = z.object({
  id: z.string(),
  name: z.string(),
  number: z.number(),
  position: z.string(),
})

export const AtBatSchema = z.object({
  inning: z.number(),
  batterId: z.string(),
  pitcherId: z.string(),
  result: z.enum(['1B', '2B', '3B', 'HR', 'K', 'BB', 'HBP', 'OUT', 'SAC', 'DP', 'TP', 'E', 'FC']),
  rbis: z.number().default(0),
  runs: z.number().default(0),
  baseRunning: z.array(z.enum(['SB', 'CS', 'PO'])).optional(),
  notes: z.string().optional(),
})

export const ScorecardSchema = z.object({
  id: z.string(),
  gameDate: z.string(),
  homeTeam: z.string(),
  awayTeam: z.string(),
  homeScore: z.number(),
  awayScore: z.number(),
  innings: z.number(),
  homeLineup: z.array(PlayerSchema),
  awayLineup: z.array(PlayerSchema),
  atBats: z.array(AtBatSchema),
  winningPitcher: z.string().optional(),
  losingPitcher: z.string().optional(),
  save: z.string().optional(),
})

export type Player = z.infer<typeof PlayerSchema>
export type AtBat = z.infer<typeof AtBatSchema>
export type Scorecard = z.infer<typeof ScorecardSchema>

// Mock data store
const mockScorecards: Scorecard[] = [
  {
    id: 'game-001',
    gameDate: '2024-07-15',
    homeTeam: 'Red Sox',
    awayTeam: 'Yankees',
    homeScore: 5,
    awayScore: 3,
    innings: 9,
    homeLineup: [
      { id: 'p1', name: 'Betts', number: 50, position: 'RF' },
      { id: 'p2', name: 'Devers', number: 11, position: '3B' },
      { id: 'p3', name: 'Bogaerts', number: 2, position: 'SS' },
      { id: 'p4', name: 'Martinez', number: 28, position: 'DH' },
    ],
    awayLineup: [
      { id: 'y1', name: 'Judge', number: 99, position: 'CF' },
      { id: 'y2', name: 'Stanton', number: 27, position: 'DH' },
      { id: 'y3', name: 'Rizzo', number: 48, position: '1B' },
      { id: 'y4', name: 'LeMahieu', number: 26, position: '2B' },
    ],
    atBats: [
      { inning: 1, batterId: 'y1', pitcherId: 'p1', result: '1B', rbis: 0, runs: 1 },
      { inning: 3, batterId: 'p2', pitcherId: 'y1', result: 'HR', rbis: 2, runs: 1 },
      { inning: 5, batterId: 'p4', pitcherId: 'y2', result: '2B', rbis: 1, runs: 0 },
    ],
    winningPitcher: 'Sale',
    losingPitcher: 'Cole',
  },
]

// Simple async functions for data fetching
export async function getScorecards(): Promise<Scorecard[]> {
  return mockScorecards
}

export async function getScorecardById(id: string): Promise<Scorecard | null> {
  return mockScorecards.find((sc) => sc.id === id) || null
}

export async function getScorecardsByDate(date: string): Promise<Scorecard[]> {
  return mockScorecards.filter((sc) => sc.gameDate === date)
}
