import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import { 
  ArrowLeft,
  TrendingUp,
  Users,
  Activity,
  Target,
  Zap,
  AlertCircle,
  Clock,
  Shirt,
  ArrowUpDown,
  BarChart3
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface MatchStats {
  matchId: string;
  sport: string;
  teams: {
    home: { name: string; logo: string; score: number };
    away: { name: string; logo: string; score: number };
  };
  status: string;
  time: string;
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
  yellowCards: { home: number; away: number };
  redCards: { home: number; away: number };
  recentEvents: Array<{
    time: string;
    type: 'goal' | 'substitution' | 'card' | 'penalty';
    team: 'home' | 'away';
    player?: string;
    description: string;
    icon: string;
  }>;
  topPlayers: Array<{
    name: string;
    team: 'home' | 'away';
    stat: string;
    value: string;
  }>;
}

const mockMatchData: Record<string, MatchStats> = {
  'live-1': {
    matchId: 'live-1',
    sport: 'Soccer',
    teams: {
      home: { name: 'FC Barcelona', logo: '🔵🔴', score: 2 },
      away: { name: 'Real Madrid', logo: '⚪', score: 1 }
    },
    status: 'Live - 2nd Half',
    time: "67'",
    possession: { home: 58, away: 42 },
    shots: { home: 14, away: 9 },
    shotsOnTarget: { home: 6, away: 4 },
    corners: { home: 7, away: 3 },
    fouls: { home: 8, away: 11 },
    yellowCards: { home: 2, away: 3 },
    redCards: { home: 0, away: 0 },
    recentEvents: [
      { time: "65'", type: 'substitution', team: 'away', player: 'Vinicius Jr.', description: 'Substitution: Vinicius Jr. OFF', icon: '🔄' },
      { time: "58'", type: 'card', team: 'away', player: 'Kroos', description: 'Yellow Card: Kroos', icon: '🟨' },
      { time: "52'", type: 'goal', team: 'home', player: 'Lewandowski', description: 'GOAL! Lewandowski scores!', icon: '⚽' },
      { time: "38'", type: 'goal', team: 'away', player: 'Benzema', description: 'GOAL! Benzema equalizes!', icon: '⚽' },
      { time: "23'", type: 'goal', team: 'home', player: 'Pedri', description: 'GOAL! Pedri opens scoring!', icon: '⚽' }
    ],
    topPlayers: [
      { name: 'Lewandowski', team: 'home', stat: 'Goals', value: '1' },
      { name: 'Pedri', team: 'home', stat: 'Assists', value: '2' },
      { name: 'Ter Stegen', team: 'home', stat: 'Saves', value: '4' },
      { name: 'Benzema', team: 'away', stat: 'Goals', value: '1' }
    ]
  },
  'live-2': {
    matchId: 'live-2',
    sport: 'Basketball',
    teams: {
      home: { name: 'Lakers', logo: '💜💛', score: 89 },
      away: { name: 'Warriors', logo: '💙💛', score: 92 }
    },
    status: 'Live - 3rd Quarter',
    time: '8:24',
    possession: { home: 52, away: 48 },
    shots: { home: 68, away: 71 },
    shotsOnTarget: { home: 38, away: 42 },
    corners: { home: 0, away: 0 },
    fouls: { home: 14, away: 12 },
    yellowCards: { home: 0, away: 0 },
    redCards: { home: 0, away: 0 },
    recentEvents: [
      { time: '8:24', type: 'goal', team: 'away', player: 'Curry', description: '3-pointer by Curry', icon: '🏀' },
      { time: '9:15', type: 'goal', team: 'home', player: 'LeBron', description: 'Dunk by LeBron James', icon: '🏀' },
      { time: '10:30', type: 'substitution', team: 'home', player: 'Davis', description: 'Davis enters the game', icon: '🔄' },
      { time: '11:45', type: 'goal', team: 'away', player: 'Thompson', description: '3-pointer by Thompson', icon: '🏀' }
    ],
    topPlayers: [
      { name: 'LeBron James', team: 'home', stat: 'Points', value: '28' },
      { name: 'Anthony Davis', team: 'home', stat: 'Rebounds', value: '12' },
      { name: 'Stephen Curry', team: 'away', stat: 'Points', value: '31' },
      { name: 'Klay Thompson', team: 'away', stat: '3-Pointers', value: '6' }
    ]
  },
  'live-3': {
    matchId: 'live-3',
    sport: 'Soccer',
    teams: {
      home: { name: 'Manchester United', logo: '🔴', score: 1 },
      away: { name: 'Liverpool', logo: '🔴', score: 1 }
    },
    status: 'Live - 2nd Half',
    time: "72'",
    possession: { home: 45, away: 55 },
    shots: { home: 11, away: 15 },
    shotsOnTarget: { home: 4, away: 7 },
    corners: { home: 4, away: 8 },
    fouls: { home: 13, away: 9 },
    yellowCards: { home: 3, away: 2 },
    redCards: { home: 0, away: 0 },
    recentEvents: [
      { time: "68'", type: 'card', team: 'home', player: 'Casemiro', description: 'Yellow Card: Casemiro', icon: '🟨' },
      { time: "61'", type: 'goal', team: 'away', player: 'Salah', description: 'GOAL! Salah equalizes!', icon: '⚽' },
      { time: "55'", type: 'substitution', team: 'away', player: 'Núñez', description: 'Substitution: Núñez ON', icon: '🔄' },
      { time: "41'", type: 'goal', team: 'home', player: 'Rashford', description: 'GOAL! Rashford scores!', icon: '⚽' }
    ],
    topPlayers: [
      { name: 'Rashford', team: 'home', stat: 'Goals', value: '1' },
      { name: 'Bruno Fernandes', team: 'home', stat: 'Key Passes', value: '3' },
      { name: 'Salah', team: 'away', stat: 'Goals', value: '1' },
      { name: 'Alexander-Arnold', team: 'away', stat: 'Assists', value: '1' }
    ]
  }
};

export function LiveMatchStats() {
  const navigate = useNavigate();
  const { matchId } = useParams<{ matchId: string }>();
  const [matchData, setMatchData] = useState<MatchStats | null>(null);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (matchId && mockMatchData[matchId]) {
      setMatchData(mockMatchData[matchId]);
      
      // Simulate live updates
      const interval = setInterval(() => {
        setMatchData(prev => {
          if (!prev) return prev;
          // Randomly update some stats
          return {
            ...prev,
            possession: {
              home: Math.max(30, Math.min(70, prev.possession.home + (Math.random() - 0.5) * 4)),
              away: Math.max(30, Math.min(70, prev.possession.away + (Math.random() - 0.5) * 4))
            }
          };
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [matchId]);

  if (!matchData) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading match data...</div>
      </div>
    );
  }

  const StatBar = ({ label, home, away }: { label: string; home: number; away: number }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-white font-semibold">{home}</span>
        <span className="text-slate-400">{label}</span>
        <span className="text-white font-semibold">{away}</span>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden flex">
        <div 
          className="bg-[#1DB954] transition-all duration-500" 
          style={{ width: `${(home / (home + away)) * 100}%` }}
        />
        <div 
          className="bg-blue-500 transition-all duration-500" 
          style={{ width: `${(away / (home + away)) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-orange-500" />
            <h1 className="font-bold text-white">Live Match Stats</h1>
          </div>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Match Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 shadow-xl"
        >
          {/* Live Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              {matchData.status}
            </span>
            <span className="text-slate-400 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {matchData.time}
            </span>
          </div>

          {/* Score */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-4xl">{matchData.teams.home.logo}</span>
                <span className="text-xl font-bold text-white">{matchData.teams.home.name}</span>
              </div>
              <span className="text-4xl font-bold text-white mx-4">{matchData.teams.home.score}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-4xl">{matchData.teams.away.logo}</span>
                <span className="text-xl font-bold text-white">{matchData.teams.away.name}</span>
              </div>
              <span className="text-4xl font-bold text-white mx-4">{matchData.teams.away.score}</span>
            </div>
          </div>
        </motion.div>

        {/* Possession */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-[#1DB954]" />
            <h3 className="text-lg font-bold text-white">Possession</h3>
          </div>
          <div className="flex justify-between text-3xl font-bold mb-3">
            <span className="text-[#1DB954]">{Math.round(matchData.possession.home)}%</span>
            <span className="text-blue-500">{Math.round(matchData.possession.away)}%</span>
          </div>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden flex">
            <motion.div 
              className="bg-[#1DB954]" 
              initial={{ width: 0 }}
              animate={{ width: `${matchData.possession.home}%` }}
              transition={{ duration: 0.5 }}
            />
            <motion.div 
              className="bg-blue-500" 
              initial={{ width: 0 }}
              animate={{ width: `${matchData.possession.away}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Match Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#1DB954]" />
            <h3 className="text-lg font-bold text-white">Statistics</h3>
          </div>
          <div className="space-y-4">
            <StatBar label="Shots" home={matchData.shots.home} away={matchData.shots.away} />
            <StatBar label="Shots on Target" home={matchData.shotsOnTarget.home} away={matchData.shotsOnTarget.away} />
            {matchData.sport === 'Soccer' && (
              <>
                <StatBar label="Corners" home={matchData.corners.home} away={matchData.corners.away} />
                <StatBar label="Fouls" home={matchData.fouls.home} away={matchData.fouls.away} />
              </>
            )}
          </div>
        </motion.div>

        {/* Recent Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-[#1DB954]" />
            <h3 className="text-lg font-bold text-white">Recent Events</h3>
          </div>
          <div className="space-y-3">
            {matchData.recentEvents.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.05 }}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  event.type === 'goal' ? 'bg-green-500/10 border border-green-500/20' :
                  event.type === 'card' ? 'bg-yellow-500/10 border border-yellow-500/20' :
                  'bg-slate-700/30 border border-slate-600/20'
                }`}
              >
                <span className="text-2xl">{event.icon}</span>
                <div className="flex-1">
                  <div className="text-white font-medium">{event.description}</div>
                  {event.player && (
                    <div className="text-sm text-slate-400">{event.player}</div>
                  )}
                </div>
                <span className="text-slate-400 font-mono text-sm">{event.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Top Players */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-[#1DB954]" />
            <h3 className="text-lg font-bold text-white">Top Performers</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {matchData.topPlayers.map((player, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600/20"
              >
                <div>
                  <div className="text-white font-medium">{player.name}</div>
                  <div className="text-sm text-slate-400">{player.stat}</div>
                </div>
                <div className="text-2xl font-bold text-[#1DB954]">{player.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}