import type { Scorecard, AtBat, Player } from '~/utils/scorecards'

interface ScorecardGridProps {
  scorecard: Scorecard
}

function AtBatCell({ atBat, players }: { atBat: AtBat; players: Player[] }) {
  const batter = players.find((p) => p.id === atBat.batterId)
  
  const getResultColor = (result: AtBat['result']) => {
    switch (result) {
      case '1B':
      case '2B':
      case '3B':
        return 'bg-green-100 text-green-800'
      case 'HR':
        return 'bg-green-300 text-green-900 font-bold'
      case 'BB':
      case 'HBP':
        return 'bg-yellow-100 text-yellow-800'
      case 'K':
        return 'bg-red-100 text-red-800'
      case 'OUT':
      case 'DP':
      case 'TP':
      case 'FC':
      case 'E':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-white'
    }
  }

  return (
    <div className={`p-2 text-xs border ${getResultColor(atBat.result)}`}>
      <div className="font-semibold">{atBat.result}</div>
      {batter && <div className="text-xs">{batter.name}</div>}
      {atBat.rbis > 0 && <div className="text-xs">RBI: {atBat.rbis}</div>}
    </div>
  )
}

export function ScorecardGrid({ scorecard }: ScorecardGridProps) {
  const innings = Array.from({ length: scorecard.innings }, (_, i) => i + 1)

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-2 py-1 text-left">Team</th>
            {innings.map((inning) => (
              <th key={inning} className="border border-gray-300 px-2 py-1 text-center w-12">
                {inning}
              </th>
            ))}
            <th className="border border-gray-300 px-2 py-1 text-center">R</th>
            <th className="border border-gray-300 px-2 py-1 text-center">H</th>
            <th className="border border-gray-300 px-2 py-1 text-center">E</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-2 py-1 font-semibold">
              {scorecard.awayTeam}
            </td>
            {innings.map((inning) => (
              <td key={inning} className="border border-gray-300 p-0">
                <div className="h-16 flex items-center justify-center">
                  {scorecard.atBats
                    .filter((ab) => ab.inning === inning)
                    .map((ab, idx) => (
                      <AtBatCell
                        key={idx}
                        atBat={ab}
                        players={scorecard.awayLineup}
                      />
                    ))}
                </div>
              </td>
            ))}
            <td className="border border-gray-300 px-2 py-1 text-center font-bold">
              {scorecard.awayScore}
            </td>
            <td className="border border-gray-300 px-2 py-1 text-center">
              {scorecard.atBats.filter((ab) => ab.batterId.startsWith('y') && ['1B', '2B', '3B', 'HR'].includes(ab.result)).length}
            </td>
            <td className="border border-gray-300 px-2 py-1 text-center">-</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-2 py-1 font-semibold">
              {scorecard.homeTeam}
            </td>
            {innings.map((inning) => (
              <td key={inning} className="border border-gray-300 p-0">
                <div className="h-16 flex items-center justify-center">
                  {scorecard.atBats
                    .filter((ab) => ab.inning === inning)
                    .map((ab, idx) => (
                      <AtBatCell
                        key={idx}
                        atBat={ab}
                        players={scorecard.homeLineup}
                      />
                    ))}
                </div>
              </td>
            ))}
            <td className="border border-gray-300 px-2 py-1 text-center font-bold">
              {scorecard.homeScore}
            </td>
            <td className="border border-gray-300 px-2 py-1 text-center">
              {scorecard.atBats.filter((ab) => ab.batterId.startsWith('p') && ['1B', '2B', '3B', 'HR'].includes(ab.result)).length}
            </td>
            <td className="border border-gray-300 px-2 py-1 text-center">-</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2">{scorecard.awayTeam} Lineup</h4>
          <ul className="text-sm">
            {scorecard.awayLineup.map((player) => (
              <li key={player.id} className="flex gap-2">
                <span className="font-mono">{player.number}</span>
                <span>{player.name}</span>
                <span className="text-gray-500">({player.position})</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">{scorecard.homeTeam} Lineup</h4>
          <ul className="text-sm">
            {scorecard.homeLineup.map((player) => (
              <li key={player.id} className="flex gap-2">
                <span className="font-mono">{player.number}</span>
                <span>{player.name}</span>
                <span className="text-gray-500">({player.position})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {(scorecard.winningPitcher || scorecard.losingPitcher) && (
        <div className="mt-4 text-sm text-gray-600">
          {scorecard.winningPitcher && <span>W: {scorecard.winningPitcher} </span>}
          {scorecard.losingPitcher && <span>L: {scorecard.losingPitcher} </span>}
          {scorecard.save && <span>SV: {scorecard.save}</span>}
        </div>
      )}
    </div>
  )
}
