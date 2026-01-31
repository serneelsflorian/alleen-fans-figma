import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Trophy, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { teamStats, players } from '@/app/data/mockData';
import { Button } from '@/app/components/ui/button';

export function TeamStats() {
  const { id } = useParams();
  const navigate = useNavigate();

  const team = teamStats.find(t => t.id === id);
  const teamPlayers = players.filter(p => p.team === id);

  if (!team) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Team niet gevonden</h2>
          <Button onClick={() => navigate(-1)}>Ga terug</Button>
        </div>
      </div>
    );
  }

  const winPercentage = ((team.wins / (team.wins + team.losses)) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#1DB954] to-[#1ED760] rounded-3xl p-8 text-white shadow-2xl mb-8 overflow-hidden relative"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-4 border-white/30 overflow-hidden">
                <img src={team.imageUrl} alt={team.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{team.name}</h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold border border-white/30 capitalize">
                    {team.sport}
                  </span>
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold border border-white/30">
                    #{team.standing} in Competitie
                  </span>
                </div>
              </div>
            </div>

            {/* Win-Loss Record */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <div className="text-3xl font-bold mb-1">{team.wins}</div>
                <div className="text-sm text-white/80">Gewonnen</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <div className="text-3xl font-bold mb-1">{team.losses}</div>
                <div className="text-sm text-white/80">Verloren</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <div className="text-3xl font-bold mb-1">{winPercentage}%</div>
                <div className="text-sm text-white/80">Win Rate</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-md mb-8 border border-slate-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#1DB954]" />
            <h2 className="text-2xl font-bold text-slate-900">Recente Vorm</h2>
          </div>

          <div className="flex items-center justify-center gap-2">
            {team.recentForm.map((result, i) => (
              <div
                key={i}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg ${
                  result === 'W' ? 'bg-[#1DB954]' : 'bg-red-500'
                }`}
              >
                {result}
              </div>
            ))}
          </div>

          <p className="text-center text-slate-600 mt-4 text-sm">
            {team.recentForm.filter(r => r === 'W').length} overwinningen in de laatste 5 wedstrijden
          </p>
        </motion.div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900">Team Statistieken</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(team.stats).map(([key, value], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow border border-slate-200"
              >
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-br from-[#1DB954] to-[#1ED760] bg-clip-text text-transparent mb-2">
                    {value}
                  </div>
                  <div className="text-sm text-slate-600 font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-md mb-8 border border-slate-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <h2 className="text-2xl font-bold text-slate-900">Prestaties</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl border border-yellow-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-2xl">
                  🏆
                </div>
                <div>
                  <div className="text-sm text-slate-600 font-medium">Kampioenschappen</div>
                  <div className="text-lg font-bold text-slate-900">3x Winnaar</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                  ⭐
                </div>
                <div>
                  <div className="text-sm text-slate-600 font-medium">All-Stars</div>
                  <div className="text-lg font-bold text-slate-900">{teamPlayers.length} Spelers</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Roster */}
        {teamPlayers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-md border border-slate-200"
          >
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-[#1DB954]" />
              <h2 className="text-2xl font-bold text-slate-900">Team Selectie</h2>
            </div>

            <div className="space-y-3">
              {teamPlayers.map((player) => (
                <button
                  key={player.id}
                  onClick={() => navigate(`/player/${player.id}`)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-[#1DB954]/10 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1DB954] to-[#1ED760] flex items-center justify-center text-white font-bold overflow-hidden">
                      {player.imageUrl ? (
                        <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover" />
                      ) : (
                        player.jerseyNumber || '?'
                      )}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-900 group-hover:text-[#1DB954] transition-colors">
                        {player.name}
                      </div>
                      <div className="text-sm text-slate-600">{player.position}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    {player.stats?.pointsPerGame && (
                      <div className="text-lg font-bold text-[#1DB954]">
                        {player.stats.pointsPerGame} PPG
                      </div>
                    )}
                    {player.stats?.goals && (
                      <div className="text-lg font-bold text-[#1DB954]">
                        {player.stats.goals} Goals
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
