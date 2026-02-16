import { createFileRoute } from '@tanstack/react-router'
import { getScorecardById } from '~/games/api'
import { ScorecardGrid } from '~/games/components/ScorecardGrid'
import { NotFound } from '~/shared/components/NotFound'

export const Route = createFileRoute('/games/$gameId')({
  component: GameDetailComponent,
  loader: async ({ params }) => {
    const scorecard = await getScorecardById(params.gameId)
    return { scorecard }
  },
})

function GameDetailComponent() {
  const { scorecard } = Route.useLoaderData()

  if (!scorecard) {
    return <NotFound />
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {scorecard.awayTeam} @ {scorecard.homeTeam}
        </h1>
        <p className="text-gray-600">{scorecard.gameDate}</p>
      </div>
      <ScorecardGrid scorecard={scorecard} />
    </div>
  )
}
