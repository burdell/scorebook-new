import { createFileRoute } from '@tanstack/react-router'
import { getScorecards } from '~/utils/scorecards'
import { ScorecardList } from '~/components/scorecards/ScorecardList'

export const Route = createFileRoute('/games/')({
  component: GamesIndexComponent,
  loader: async () => {
    const scorecards = await getScorecards()
    return { scorecards }
  },
})

function GamesIndexComponent() {
  const { scorecards } = Route.useLoaderData()

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Baseball Games</h1>
      <ScorecardList scorecards={scorecards} />
    </div>
  )
}
