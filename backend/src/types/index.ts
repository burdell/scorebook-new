/**
 * Data models for baseball scorecards
 * 
 * This file defines the core data structures for the backend.
 * These types mirror the frontend types but will eventually be
 * backed by a database schema.
 */

export interface Player {
  id: string
  name: string
  number: number
  position: string
  teamId?: string
}

export interface AtBat {
  id: string
  inning: number
  batterId: string
  pitcherId: string
  result: '1B' | '2B' | '3B' | 'HR' | 'K' | 'BB' | 'HBP' | 'OUT' | 'SAC' | 'DP' | 'TP' | 'E' | 'FC'
  rbis: number
  runs: number
  baseRunning?: ('SB' | 'CS' | 'PO')[]
  notes?: string
  gameId: string
}

export interface Scorecard {
  id: string
  gameDate: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  innings: number
  homeLineup: Player[]
  awayLineup: Player[]
  atBats: AtBat[]
  winningPitcher?: string
  losingPitcher?: string
  save?: string
  createdAt: string
  updatedAt: string
}

export interface Team {
  id: string
  name: string
  abbreviation: string
  city: string
  league: 'AL' | 'NL'
  division: string
}
