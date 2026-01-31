import type { Scorecard } from '~/utils/scorecards'
import { Link } from '@tanstack/react-router'

interface ScorecardListProps {
  scorecards: Scorecard[]
}

export function ScorecardList({ scorecards }: ScorecardListProps) {
  if (scorecards.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No games found for this date.
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
              <div className="text-sm text-gray-500">{scorecard.gameDate}</div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{scorecard.awayTeam}</span>
                <span className="text-gray-400">@</span>
                <span className="font-semibold">{scorecard.homeTeam}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold">
                {scorecard.awayScore} - {scorecard.homeScore}
              </div>
              <div className="text-sm text-gray-500">
                {scorecard.innings} inn
              </div>
            </div>
          </div>
          {(scorecard.winningPitcher || scorecard.losingPitcher) && (
            <div className="mt-2 text-xs text-gray-500">
              {scorecard.winningPitcher && `W: ${scorecard.winningPitcher} `}
              {scorecard.losingPitcher && `L: ${scorecard.losingPitcher} `}
              {scorecard.save && `SV: ${scorecard.save}`}
            </div>
          )}
        </Link>
      ))}
    </div>
  )
}
