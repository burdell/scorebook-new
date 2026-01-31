import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Scorebook</h1>
        <p className="text-xl text-gray-600 mb-8">
          View and analyze baseball game scorecards
        </p>
        <Link
          to="/games"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Games
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Visual Scorecards</h3>
          <p className="text-gray-600">
            Beautiful, easy-to-read scorecard grids showing every at-bat and play.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Game History</h3>
          <p className="text-gray-600">
            Access historical game data and search by date, team, or player.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Statistics</h3>
          <p className="text-gray-600">
            Detailed statistics and analytics derived from game data.
          </p>
        </div>
      </div>
    </div>
  )
}
