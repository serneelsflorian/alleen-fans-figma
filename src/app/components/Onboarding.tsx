import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { motion } from 'motion/react';
import { useUser } from '@/app/contexts/UserContext';
import { sports, teams } from '@/app/data/mockData';
import { Button } from '@/app/components/ui/button';
import { Check, Flame, Info, EyeOff } from 'lucide-react';

export function Onboarding() {
  const navigate = useNavigate();
  const { updateSports, updateTeams, completeOnboarding, toggleHideSport, toggleHideTeam, isSportHidden, isTeamHidden } = useUser();
  const [step, setStep] = useState(1);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  const toggleSport = (sportId: string) => {
    setSelectedSports(prev =>
      prev.includes(sportId)
        ? prev.filter(id => id !== sportId)
        : [...prev, sportId]
    );
  };

  const toggleTeam = (teamId: string) => {
    setSelectedTeams(prev =>
      prev.includes(teamId)
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    );
  };

  const handleContinue = () => {
    if (step === 1) {
      updateSports(selectedSports);
      setStep(2);
    } else if (step === 2) {
      updateTeams(selectedTeams);
      setStep(3);
    } else {
      completeOnboarding();
      navigate('/');
    }
  };

  const availableTeams = teams.filter(team => 
    selectedSports.includes(team.sport)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-[#1DB954]/10 rounded-full border border-[#1DB954]/20">
            <Flame className="w-4 h-4 text-[#1DB954]" />
            <span className="text-sm text-[#1DB954]">Personalize Your Feed</span>
          </div>
          <h1 className="text-4xl md:text-5xl mb-4">
            {step === 1 ? 'What sports do you love?' : step === 2 ? 'Follow your favorite teams' : 'Hide content you don\'t want'}
          </h1>
          <p className="text-slate-400 text-lg">
            {step === 1 
              ? 'Select your interests to get a personalized feed' 
              : step === 2
              ? 'Get instant updates on the teams you care about'
              : 'Customize your feed by hiding sports or teams (optional)'}
          </p>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-[#1DB954]' : 'bg-slate-700'}`} />
          <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-[#1DB954]' : 'bg-slate-700'}`} />
          <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-[#1DB954]' : 'bg-slate-700'}`} />
        </div>

        {/* Step 1: Sports */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {sports.map((sport) => (
                <motion.button
                  key={sport.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleSport(sport.id)}
                  className={`relative overflow-hidden rounded-2xl border-2 transition-all ${
                    selectedSports.includes(sport.id)
                      ? 'border-[#1DB954] bg-[#1DB954]/10'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  {/* Sport Image Background */}
                  <div className="relative h-32 w-full">
                    <img 
                      src={sport.imageUrl} 
                      alt={sport.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>
                    
                    {/* Sport Name Overlay */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="text-base font-bold text-white drop-shadow-lg">{sport.name}</div>
                    </div>
                    
                    {/* Selection Checkmark */}
                    {selectedSports.includes(sport.id) && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-[#1DB954] rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <Button
              onClick={handleContinue}
              disabled={selectedSports.length === 0}
              className="w-full h-14 text-lg bg-[#1DB954] hover:bg-[#1DB954]/90 disabled:opacity-50"
            >
              Continue ({selectedSports.length} selected)
            </Button>
          </motion.div>
        )}

        {/* Step 2: Teams */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {availableTeams.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {availableTeams.map((team) => (
                    <motion.button
                      key={team.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleTeam(team.id)}
                      className={`relative overflow-hidden rounded-xl border-2 transition-all ${
                        selectedTeams.includes(team.id)
                          ? 'border-[#1DB954] bg-[#1DB954]/10'
                          : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                      }`}
                    >
                      {/* Team Image Background */}
                      <div className="relative h-32 w-full">
                        <img 
                          src={team.imageUrl} 
                          alt={team.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>
                        
                        {/* Team Name Overlay */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="text-base font-bold text-white drop-shadow-lg">{team.name}</div>
                          <div className="text-xs text-slate-300 capitalize mt-0.5">{team.sport}</div>
                        </div>
                        
                        {/* Selection Checkmark */}
                        {selectedTeams.includes(team.id) && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-[#1DB954] rounded-full flex items-center justify-center shadow-lg">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1 h-14 text-lg"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleContinue}
                    className="flex-1 h-14 text-lg bg-[#1DB954] hover:bg-[#1DB954]/90"
                  >
                    {selectedTeams.length > 0 ? `Continue (${selectedTeams.length} teams)` : 'Skip for Now'}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400 mb-6">
                  Select some sports first to see available teams
                </p>
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="w-full h-14 text-lg"
                >
                  Go Back
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 3: Hide Content */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Hidden Sports */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-slate-300">Sports</h3>
              <p className="text-sm text-slate-400 mb-4">Tap to hide sports you're not interested in</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {sports.map((sport) => {
                  const isHidden = isSportHidden(sport.id);
                  return (
                    <motion.button
                      key={sport.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleHideSport(sport.id)}
                      className={`relative overflow-hidden rounded-2xl border-2 transition-all ${
                        isHidden
                          ? 'border-red-500 bg-red-500/10 opacity-60'
                          : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                      }`}
                    >
                      {/* Sport Image Background */}
                      <div className="relative h-32 w-full">
                        <img 
                          src={sport.imageUrl} 
                          alt={sport.name}
                          className={`absolute inset-0 w-full h-full object-cover ${isHidden ? 'grayscale' : ''}`}
                        />
                        <div className={`absolute inset-0 ${isHidden ? 'bg-gradient-to-t from-red-900/80 via-red-900/50 to-red-900/30' : 'bg-gradient-to-t from-black/90 via-black/60 to-black/30'}`}></div>
                        
                        {/* Sport Name Overlay */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="text-base font-bold text-white drop-shadow-lg">{sport.name}</div>
                          {isHidden && (
                            <div className="text-xs text-red-400 font-semibold mt-1">Hidden</div>
                          )}
                        </div>
                        
                        {/* Hidden Icon */}
                        {isHidden && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                            <EyeOff className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Hidden Teams */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-slate-300">Teams</h3>
              <p className="text-sm text-slate-400 mb-4">Tap to hide teams you don't want to see</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {teams.map((team) => {
                  const isHidden = isTeamHidden(team.id);
                  return (
                    <motion.button
                      key={team.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleHideTeam(team.id)}
                      className={`relative overflow-hidden rounded-xl border-2 transition-all ${
                        isHidden
                          ? 'border-red-500 bg-red-500/10 opacity-60'
                          : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                      }`}
                    >
                      {/* Team Image Background */}
                      <div className="relative h-28 w-full">
                        <img 
                          src={team.imageUrl} 
                          alt={team.name}
                          className={`absolute inset-0 w-full h-full object-cover ${isHidden ? 'grayscale' : ''}`}
                        />
                        <div className={`absolute inset-0 ${isHidden ? 'bg-gradient-to-t from-red-900/70 via-red-900/40 to-red-900/20' : 'bg-gradient-to-t from-black/80 via-black/40 to-transparent'}`}></div>
                        
                        {/* Team Name Overlay */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="text-base font-bold text-white drop-shadow-lg">{team.name}</div>
                          <div className="text-xs text-slate-300 capitalize mt-0.5">
                            {team.sport}
                            {isHidden && <span className="ml-2 text-red-300">• Hidden</span>}
                          </div>
                        </div>
                        
                        {/* Hidden Icon */}
                        {isHidden && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                            <EyeOff className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className="flex-1 h-14 text-lg"
              >
                Back
              </Button>
              <Button
                onClick={handleContinue}
                className="flex-1 h-14 text-lg bg-[#1DB954] hover:bg-[#1DB954]/90"
              >
                Start Reading
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}