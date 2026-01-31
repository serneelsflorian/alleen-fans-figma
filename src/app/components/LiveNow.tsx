import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { LiveMatch, teams } from '@/app/data/mockData';
import { useNavigate } from 'react-router';
import { useState } from 'react';

interface LiveNowProps {
  matches: LiveMatch[];
}

export function LiveNow({ matches }: LiveNowProps) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  if (matches.length === 0) {
    return null; // Collapse when no live events
  }

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[#0085C7] via-[#F4C300] via-[#000000] via-[#009F3D] to-[#EE334E] p-1 rounded-2xl">
          <div className="bg-white rounded-xl px-4 py-2">
            {/* Live Now Header - Always Visible */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full py-3 flex items-center justify-between group hover:opacity-90 transition-opacity"
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 bg-[#1DB954] rounded-full"
                    animate={{
                      opacity: [1, 0.3, 1],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <h2 className="text-slate-900 font-bold text-sm uppercase tracking-wider">
                    Live Now
                  </h2>
                </div>
                <div className="text-slate-700 text-xs font-medium px-2 py-0.5 bg-slate-100 rounded-full">
                  {matches.length}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-slate-600 text-xs font-medium hidden sm:block">
                  {isExpanded ? 'Collapse' : 'View matches'}
                </span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-slate-700" />
                </motion.div>
              </div>
            </button>

            {/* Expandable Content - Live Matches */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory">
                    {matches.map((match, index) => {
                      // Get team data for colors
                      const team1Data = teams.find(t => t.id === match.team1.id);
                      const team2Data = teams.find(t => t.id === match.team2.id);
                      
                      return (
                        <motion.button
                          key={match.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => navigate(`/live-match/${match.id}`)}
                          className="flex-shrink-0 w-72 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all snap-start group hover:bg-white active:scale-[0.98]"
                        >
                          {/* Match Header with Sport & Status */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <motion.div
                                className="w-1.5 h-1.5 bg-[#1DB954] rounded-full"
                                animate={{
                                  opacity: [1, 0.3, 1],
                                  scale: [1, 1.3, 1],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                }}
                              />
                              <span className="text-xs font-bold text-[#1DB954] uppercase">
                                {match.status}
                              </span>
                            </div>
                            <span className="text-xs font-semibold text-slate-500">
                              {match.time}
                            </span>
                          </div>

                          {/* Teams & Scores */}
                          <div className="space-y-3">
                            {/* Team 1 */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div 
                                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                                  style={{ backgroundColor: team1Data?.color || '#6B7280' }}
                                >
                                  <span className="text-white text-xs font-bold">
                                    {match.team1.name.substring(0, 2).toUpperCase()}
                                  </span>
                                </div>
                                <div className="font-semibold text-slate-900 truncate">
                                  {match.team1.name}
                                </div>
                              </div>
                              <div className="text-2xl font-bold text-slate-900 ml-3">
                                {match.team1.score}
                              </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-slate-200" />

                            {/* Team 2 */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div 
                                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                                  style={{ backgroundColor: team2Data?.color || '#6B7280' }}
                                >
                                  <span className="text-white text-xs font-bold">
                                    {match.team2.name.substring(0, 2).toUpperCase()}
                                  </span>
                                </div>
                                <div className="font-semibold text-slate-900 truncate">
                                  {match.team2.name}
                                </div>
                              </div>
                              <div className="text-2xl font-bold text-slate-900 ml-3">
                                {match.team2.score}
                              </div>
                            </div>
                          </div>

                          {/* View Details Link */}
                          <div className="flex items-center justify-center gap-1 mt-4 pt-3 border-t border-slate-100">
                            <span className="text-xs font-semibold text-[#1DB954] group-hover:text-[#1DB954]/80">
                              View Live Stats
                            </span>
                            <ChevronRight className="w-4 h-4 text-[#1DB954] group-hover:text-[#1DB954]/80 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}