import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, TrendingUp, Award, Calendar } from 'lucide-react';
import { players } from '@/app/data/mockData';
import { Button } from '@/app/components/ui/button';

export function PlayerStats() {
  const { id } = useParams();
  const navigate = useNavigate();

  const player = players.find(p => p.id === id);

  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Speler niet gevonden</h2>
          <Button onClick={() => navigate(-1)}>Ga terug</Button>
        </div>
      </div>
    );
  }

  const statLabels: Record<string, string> = {
    gamesPlayed: 'Wedstrijden Gespeeld',
    pointsPerGame: 'Punten per Wedstrijd',
    assistsPerGame: 'Assists per Wedstrijd',
    reboundsPerGame: 'Rebounds per Wedstrijd',
    threePointersPerGame: 'Three-Pointers per Wedstrijd',
    passingYards: 'Passing Yards',
    touchdowns: 'Touchdowns',
    goals: 'Doelpunten',
    acesPerMatch: 'Aces per Wedstrijd'
  };

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
          className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-2xl mb-8 overflow-hidden relative"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-6xl border-4 border-white/30 overflow-hidden">
              {player.imageUrl ? (
                <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover" />
              ) : (
                '👤'
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{player.name}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                {player.position && (
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold border border-white/30">
                    {player.position}
                  </span>
                )}
                {player.jerseyNumber && (
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold border border-white/30">
                    #{player.jerseyNumber}
                  </span>
                )}
                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold border border-white/30 capitalize">
                  {player.sport}
                </span>
              </div>
              {player.team && (
                <p className="text-blue-100 text-lg">
                  Speelt voor <span className="font-semibold text-white">{player.team}</span>
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        {player.stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900">Seizoen Statistieken</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(player.stats).map(([key, value]) => {
                if (value === undefined) return null;
                
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow border border-slate-200"
                  >
                    <div className="text-center">
                      <div className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
                        {value}
                      </div>
                      <div className="text-sm text-slate-600 font-medium">
                        {statLabels[key] || key}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Performance Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-md mb-8 border border-slate-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-[#1DB954]" />
            <h2 className="text-2xl font-bold text-slate-900">Prestatie Hoogtepunten</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-[#1DB954]/10 to-[#1ED760]/10 rounded-xl border border-[#1DB954]/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#1DB954] flex items-center justify-center text-white font-bold text-lg">
                  🏆
                </div>
                <div>
                  <div className="text-sm text-slate-600 font-medium">Huidige Vorm</div>
                  <div className="text-lg font-bold text-slate-900">Uitstekend</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  📊
                </div>
                <div>
                  <div className="text-sm text-slate-600 font-medium">Ranking</div>
                  <div className="text-lg font-bold text-slate-900">Top 10</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-md border border-slate-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900">Recente Wedstrijden</h2>
          </div>

          <div className="space-y-3">
            {[
              { date: '30 Jan 2026', opponent: 'vs Warriors', performance: 'Uitstekend', score: '45 PTS' },
              { date: '28 Jan 2026', opponent: 'vs Celtics', performance: 'Goed', score: '32 PTS' },
              { date: '25 Jan 2026', opponent: 'vs Nets', performance: 'Gemiddeld', score: '18 PTS' }
            ].map((game, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-xs text-slate-500 font-medium">{game.date}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{game.opponent}</div>
                    <div className="text-sm text-slate-600">{game.performance}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">{game.score}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
