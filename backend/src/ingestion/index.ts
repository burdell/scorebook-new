/**
 * Ingestion Pipeline
 * 
 * This module will handle importing game data from external sources:
 * - MLB Stats API
 * - Retrosheet
 * - Manual entry
 * - CSV/JSON uploads
 */

export interface IngestionSource {
  name: string
  type: 'api' | 'file' | 'manual'
  config: Record<string, unknown>
}

export interface GameDataImporter {
  importGame(gameId: string): Promise<void>
  importDateRange(startDate: string, endDate: string): Promise<void>
  importTeam(teamId: string, season: number): Promise<void>
}

// Placeholder for future implementation
export class MLBStatsImporter implements GameDataImporter {
  async importGame(_gameId: string): Promise<void> {
    throw new Error('Not implemented')
  }

  async importDateRange(_startDate: string, _endDate: string): Promise<void> {
    throw new Error('Not implemented')
  }

  async importTeam(_teamId: string, _season: number): Promise<void> {
    throw new Error('Not implemented')
  }
}
