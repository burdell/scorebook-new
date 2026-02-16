import type { GameOutput } from '~/games/api'
import { Link } from '@tanstack/react-router'

interface ScorecardListProps {
  scorecards: GameOutput[]
}

export function ScorecardList({ scorecards }: ScorecardListProps) {
  if (scorecards.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No games found.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {scorecards.map((scorecard) => (
        <Link
          key={scorecard.id}
          to="/games/$gameId"
          params={{ gameId: scorecard.id }}
          className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">{scorecard.gameInfo.date}</div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{scorecard.gameInfo.visitingTeam.fullName}</span>
                <span className="text-gray-400">@</span>
                <span className="font-semibold">{scorecard.gameInfo.homeTeam.fullName}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold">
                {scorecard.stats.visiting.runs} - {scorecard.stats.home.runs}
              </div>
              <div className="text-sm text-gray-500">
                {scorecard.stats.home.scoring.length} inn
              </div>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            H: {scorecard.stats.home.hits} | E: {scorecard.stats.home.errors} &nbsp;&nbsp;
            V: {scorecard.stats.visiting.hits} | E: {scorecard.stats.visiting.errors}
          </div>
        </Link>
      ))}
    </div>
  )
}
