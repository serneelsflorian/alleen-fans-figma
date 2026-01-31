import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Settings, 
  Bell, 
  User, 
  Sparkles, 
  Flame,
  Check,
  ChevronRight,
  Info,
  EyeOff,
  Eye,
  Home,
  Compass,
  Filter,
  Camera,
  Grid3x3,
  Smartphone
} from 'lucide-react';
import { useUser } from '@/app/contexts/UserContext';
import { sports, teams } from '@/app/data/mockData';
import { Button } from '@/app/components/ui/button';
import { Switch } from '@/app/components/ui/switch';
import { Input } from '@/app/components/ui/input';

export function Profile() {
  const navigate = useNavigate();
  const { 
    preferences, 
    updateSports, 
    updateTeams, 
    toggleHideSport, 
    toggleHideTeam,
    isSportHidden,
    isTeamHidden,
    updateFeedStyle
  } = useUser();
  const [notifications, setNotifications] = useState(true);
  const [aiEnhancements, setAiEnhancements] = useState(true);
  const [ageInput, setAgeInput] = useState<string>(preferences.age?.toString() || '');

  const toggleSport = (sportId: string) => {
    const newSports = preferences.selectedSports.includes(sportId)
      ? preferences.selectedSports.filter(id => id !== sportId)
      : [...preferences.selectedSports, sportId];
    updateSports(newSports);
  };

  const toggleTeam = (teamId: string) => {
    const newTeams = preferences.selectedTeams.includes(teamId)
      ? preferences.selectedTeams.filter(id => id !== teamId)
      : [...preferences.selectedTeams, teamId];
    updateTeams(newTeams);
  };

  const availableTeams = teams.filter(team => 
    preferences.selectedSports.includes(team.sport)
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-bold text-slate-900">Settings & Preferences</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 mb-6 shadow-sm"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#1DB954] to-[#1DB954]/80 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Sports Fan</h2>
              <p className="text-slate-600">Personalized feed active</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-slate-900">{preferences.selectedSports.length}</div>
              <div className="text-sm text-slate-600">Sports</div>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-slate-900">{preferences.selectedTeams.length}</div>
              <div className="text-sm text-slate-600">Teams</div>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-slate-900">{preferences.savedArticles.length}</div>
              <div className="text-sm text-slate-600">Saved</div>
            </div>
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 mb-6 shadow-sm"
        >
          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
            <Settings className="w-5 h-5" />
            App Settings
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-slate-600" />
                <div>
                  <div className="font-medium text-slate-900">Push Notifications</div>
                  <div className="text-sm text-slate-500">Get alerts for breaking news</div>
                </div>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            {/* Feed Style Toggle */}
            <div className="py-3 border-b border-slate-100">
              <div className="flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-[#1DB954] mt-1" />
                <div className="flex-1">
                  <div className="font-medium text-slate-900 mb-1">Feed Layout</div>
                  <div className="text-sm text-slate-500 mb-3">
                    Choose your preferred feed experience
                  </div>
                  
                  {/* Toggle Button Group */}
                  <div className="inline-flex rounded-lg border-2 border-slate-200 overflow-hidden">
                    <button
                      onClick={() => updateFeedStyle('grid')}
                      className={`px-4 py-2.5 flex items-center gap-2 transition-all font-medium text-sm ${
                        preferences.feedStyle === 'grid'
                          ? 'bg-[#1DB954] text-white'
                          : 'bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Grid3x3 className="w-4 h-4" />
                      Classic Grid
                    </button>
                    <button
                      onClick={() => updateFeedStyle('tiktok')}
                      className={`px-4 py-2.5 flex items-center gap-2 transition-all font-medium text-sm border-l-2 border-slate-200 ${
                        preferences.feedStyle === 'tiktok'
                          ? 'bg-gradient-to-r from-[#1DB954] to-[#1ED760] text-white'
                          : 'bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      Modern UI
                    </button>
                  </div>

                  {/* Description */}
                  <div className="mt-3 text-sm text-slate-600">
                    {preferences.feedStyle === 'grid' ? (
                      <span>✓ Classic grid view with multiple articles</span>
                    ) : (
                      <span className="text-[#1DB954]">✓ TikTok-style vertical fullscreen feed</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Flame className="w-5 h-5 text-[#1DB954]" />
                <div>
                  <div className="font-medium text-slate-900">Personalization Level</div>
                  <div className="text-sm text-slate-500">How much we tailor your feed</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </motion.div>

        {/* Sports Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 mb-6 shadow-sm"
        >
          <h3 className="text-lg font-bold text-slate-900 mb-4">Your Sports</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sports.map((sport) => (
              <button
                key={sport.id}
                onClick={() => toggleSport(sport.id)}
                className={`relative overflow-hidden rounded-xl border-2 transition-all ${
                  preferences.selectedSports.includes(sport.id)
                    ? 'border-[#1DB954] bg-[#1DB954]/10'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {/* Sport Image Background */}
                <div className="relative h-24 w-full">
                  <img 
                    src={sport.imageUrl} 
                    alt={sport.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Sport Name Overlay */}
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="text-sm font-bold text-white drop-shadow-lg">{sport.name}</div>
                  </div>
                  
                  {/* Selection Checkmark */}
                  {preferences.selectedSports.includes(sport.id) && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-[#1DB954] rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Team Preferences */}
        {availableTeams.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 mb-6 shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-4">Your Teams</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableTeams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => toggleTeam(team.id)}
                  className={`relative overflow-hidden rounded-xl border-2 transition-all ${
                    preferences.selectedTeams.includes(team.id)
                      ? 'border-[#1DB954] bg-[#1DB954]/10'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Team Image Background */}
                  <div className="relative h-32 w-full">
                    <img 
                      src={team.imageUrl} 
                      alt={team.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
                    {/* Team Name Overlay */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="text-base font-bold text-white drop-shadow-lg">{team.name}</div>
                      <div className="text-xs text-slate-300 capitalize mt-0.5">{team.sport}</div>
                    </div>
                    
                    {/* Selection Checkmark */}
                    {preferences.selectedTeams.includes(team.id) && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-[#1DB954] rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Hidden Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <EyeOff className="w-5 h-5 text-slate-600" />
            <h3 className="text-lg font-bold text-slate-900">Hidden Content</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Hide specific sports or teams from appearing in your feed. Tap to hide or unhide.
          </p>

          {/* Hidden Sports */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Sports</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sports.map((sport) => {
                const isHidden = isSportHidden(sport.id);
                return (
                  <button
                    key={sport.id}
                    onClick={() => toggleHideSport(sport.id)}
                    className={`relative overflow-hidden rounded-xl border-2 transition-all ${
                      isHidden
                        ? 'border-red-300 bg-red-50 opacity-60'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    {/* Sport Image Background */}
                    <div className="relative h-24 w-full">
                      <img 
                        src={sport.imageUrl} 
                        alt={sport.name}
                        className={`absolute inset-0 w-full h-full object-cover ${isHidden ? 'grayscale' : ''}`}
                      />
                      <div className={`absolute inset-0 ${isHidden ? 'bg-gradient-to-t from-red-900/70 via-red-900/40 to-red-900/20' : 'bg-gradient-to-t from-black/80 via-black/40 to-transparent'}`}></div>
                      
                      {/* Sport Name Overlay */}
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="text-sm font-bold text-white drop-shadow-lg">{sport.name}</div>
                        {isHidden && (
                          <div className="text-xs text-red-300 font-semibold mt-0.5">Hidden</div>
                        )}
                      </div>
                      
                      {/* Hidden Icon */}
                      {isHidden && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                          <EyeOff className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hidden Teams */}
          {availableTeams.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Teams</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableTeams.map((team) => {
                  const isHidden = isTeamHidden(team.id);
                  return (
                    <button
                      key={team.id}
                      onClick={() => toggleHideTeam(team.id)}
                      className={`relative overflow-hidden rounded-xl border-2 transition-all ${
                        isHidden
                          ? 'border-red-300 bg-red-50 opacity-60'
                          : 'border-slate-200 bg-white hover:border-slate-300'
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
                          <div className="absolute top-3 right-3 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                            <EyeOff className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {preferences.hiddenSports.length === 0 && preferences.hiddenTeams.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <Eye className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="text-sm">No hidden content yet</p>
              <p className="text-xs mt-1">Tap any sport or team above to hide it from your feed</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 safe-area-bottom">
        <div className="relative flex items-center justify-around h-16 px-2">
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-center justify-center gap-1 text-slate-600 hover:text-[#1DB954] transition-colors active:scale-95 flex-1"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>
          
          <button
            onClick={() => navigate('/explore')}
            className="flex flex-col items-center justify-center gap-1 text-slate-600 hover:text-purple-600 transition-colors active:scale-95 flex-1"
          >
            <Compass className="w-6 h-6" />
            <span className="text-xs font-medium">Explore</span>
          </button>
          
          {/* Elevated Scan Button */}
          <div className="flex-1 flex justify-center">
            <button
              onClick={() => navigate('/image-recognition')}
              className="relative -top-6 w-14 h-14 bg-gradient-to-br from-[#1DB954] to-[#15A047] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              <Camera className="w-7 h-7 text-white" />
            </button>
          </div>
          
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-center justify-center gap-1 text-slate-600 hover:text-[#1DB954] transition-colors active:scale-95 flex-1"
          >
            <Filter className="w-6 h-6" />
            <span className="text-xs font-medium">Filters</span>
          </button>
          
          <button
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center justify-center gap-1 text-[#1DB954] flex-1"
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}