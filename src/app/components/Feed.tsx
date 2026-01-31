import image_fbdf56833bb64e7593c2b9b94b0788c8e9eb6872 from 'figma:asset/fbdf56833bb64e7593c2b9b94b0788c8e9eb6872.png';
import { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { Flame, Filter, Search, Settings, Info, Camera, X, Check, FileText, Video, Mic, Home, User, Compass, Radio } from 'lucide-react';
import { articles, sports, teams, players, competitions, liveMatches } from '@/app/data/mockData';
import { ArticleCard } from '@/app/components/ArticleCard';
import { TikTokFeed } from '@/app/components/TikTokFeed';
import { useUser } from '@/app/contexts/UserContext';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { LiveNow } from '@/app/components/LiveNow';
import logoImage from 'figma:asset/595b10bf85c348efb344481f89b83545e64a81bb.png';

// Extended list of all sports including niche ones
const allSports = [
  // Popular sports (from mockData)
  ...sports,
  // Niche/additional sports
  { id: 'cricket', name: 'Cricket', icon: '🏏', imageUrl: 'https://images.unsplash.com/photo-1730739628091-133de587ad14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#38B2AC' },
  { id: 'rugby', name: 'Rugby', icon: '🏉', imageUrl: 'https://images.unsplash.com/photo-1643656090647-ba85185222b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#805AD5' },
  { id: 'volleyball', name: 'Volleyball', icon: '🏐', imageUrl: 'https://images.unsplash.com/photo-1765109326731-1da87c9571c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#ED8936' },
  { id: 'badminton', name: 'Badminton', icon: '🏸', imageUrl: 'https://images.unsplash.com/photo-1613918702390-48771f69c133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#48BB78' },
  { id: 'table-tennis', name: 'Table Tennis', icon: '🏓', imageUrl: 'https://images.unsplash.com/photo-1738141061812-09b52265981a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#4299E1' },
  { id: 'swimming', name: 'Swimming', icon: '🏊', imageUrl: 'https://images.unsplash.com/photo-1572594505398-97a384b34ec8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#38B2AC' },
  { id: 'cycling', name: 'Cycling', icon: '🚴', imageUrl: 'https://images.unsplash.com/photo-1654091615752-7a6c4ab49856?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#9F7AEA' },
  { id: 'skiing', name: 'Skiing', icon: '⛷️', imageUrl: 'https://images.unsplash.com/photo-1738442255534-bec9cd474e81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#4299E1' },
  { id: 'skateboarding', name: 'Skateboarding', icon: '🛹', imageUrl: 'https://images.unsplash.com/photo-1487621017290-f6348b1e550c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#ED8936' },
  { id: 'surfing', name: 'Surfing', icon: '🏄', imageUrl: 'https://images.unsplash.com/photo-1567619883415-aac1655bc12b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#38B2AC' },
  { id: 'wrestling', name: 'Wrestling', icon: '🤼', imageUrl: 'https://images.unsplash.com/photo-1764908912244-38a309979536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#F56565' },
  { id: 'archery', name: 'Archery', icon: '🏹', imageUrl: 'https://images.unsplash.com/photo-1664847405740-6bdb64061f6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#9F7AEA' },
  { id: 'fencing', name: 'Fencing', icon: '🤺', imageUrl: 'https://images.unsplash.com/photo-1681126733055-1d37c13b8d07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#805AD5' },
  { id: 'esports', name: 'Esports', icon: '🎮', imageUrl: 'https://images.unsplash.com/photo-1767455471543-055dbc6c6700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#9F7AEA' },
  { id: 'motorsports', name: 'Motorsports', icon: '🏎️', imageUrl: 'https://images.unsplash.com/photo-1610019080778-471083eb5965?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400', color: '#F56565' },
];

// Popular sports IDs (first 8 from main sports array)
const popularSportIds = sports.map(s => s.id);

// Content types with icons
const contentTypes = [
  { id: 'text', name: 'Text', icon: FileText, description: 'Articles & news' },
  { id: 'video', name: 'Video', icon: Video, description: 'Highlights & clips' },
  { id: 'interview', name: 'Interview', icon: Mic, description: 'Player & expert talks' },
];

export function Feed() {
  const { preferences } = useUser();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterScreen, setShowFilterScreen] = useState(false);
  const [sportSearchQuery, setSportSearchQuery] = useState('');
  const [tempFilters, setTempFilters] = useState({
    sports: [] as string[],
    contentTypes: [] as string[],
    liveOnly: false,
  });

  const toggleSportFilter = (sportId: string) => {
    setTempFilters(prev => ({
      ...prev,
      sports: prev.sports.includes(sportId)
        ? prev.sports.filter(id => id !== sportId)
        : [...prev.sports, sportId]
    }));
  };

  const toggleContentTypeFilter = (type: string) => {
    setTempFilters(prev => ({
      ...prev,
      contentTypes: prev.contentTypes.includes(type)
        ? prev.contentTypes.filter(t => t !== type)
        : [...prev.contentTypes, type]
    }));
  };

  const applyFilters = () => {
    // Apply filters logic here
    setShowFilterScreen(false);
  };

  const clearFilters = () => {
    setTempFilters({
      sports: [],
      contentTypes: [],
      liveOnly: false,
    });
  };

  const filteredArticles = useMemo(() => {
    let filtered = [...articles];

    // Filter out hidden sports and teams
    filtered = filtered.filter(a => 
      !preferences.hiddenSports.includes(a.sport) &&
      !a.teams.some(team => preferences.hiddenTeams.includes(team))
    );

    // Check for tag filter from URL
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      filtered = filtered.filter(a => 
        a.tags.some(tag => tag.toLowerCase() === tagParam.toLowerCase())
      );
    } else {
      // Only apply other filters if no tag filter is active
      // Filter by sport
      if (selectedFilter !== 'all') {
        if (selectedFilter === 'trending') {
          filtered = filtered.filter(a => a.trending);
        } else if (selectedFilter === 'saved') {
          filtered = filtered.filter(a => preferences.savedArticles.includes(a.id));
        } else if (selectedFilter === 'for-you') {
          filtered = filtered.filter(a => 
            preferences.selectedSports.includes(a.sport) ||
            a.teams.some(team => preferences.selectedTeams.includes(team))
          );
        } else {
          filtered = filtered.filter(a => a.sport === selectedFilter);
        }
      }
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [selectedFilter, searchQuery, preferences, searchParams]);

  // Filter live matches based on user preferences
  const filteredLiveMatches = useMemo(() => {
    return liveMatches.filter(match => {
      // Show matches from user's selected sports
      const isSportSelected = preferences.selectedSports.includes(match.sport);
      
      // Show matches involving user's selected teams
      const isTeamSelected = preferences.selectedTeams.includes(match.team1.id) || 
                            preferences.selectedTeams.includes(match.team2.id);
      
      // Show if sport or team matches user preferences, or if they have no preferences yet
      return isSportSelected || isTeamSelected || 
             (preferences.selectedSports.length === 0 && preferences.selectedTeams.length === 0);
    });
  }, [preferences]);

  // Check if user wants TikTok-style feed
  const useTikTokFeed = preferences.feedStyle === 'tiktok';

  // If user wants TikTok feed, show TikTok feed
  if (useTikTokFeed && filteredArticles.length > 0) {
    return <TikTokFeed filteredArticles={filteredArticles} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 flex justify-center">
              <div className="h-12 overflow-hidden flex items-center">
                <img 
                  src={image_fbdf56833bb64e7593c2b9b94b0788c8e9eb6872} 
                  alt="AlleenFans" 
                  className="w-48"
                  style={{ 
                    objectFit: 'cover',
                    objectPosition: 'center',
                    clipPath: 'inset(30% 0 30% 0)',
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-1 absolute right-4">
              <Link to="/user-stories">
                <Button variant="ghost" size="icon" title="User Stories">
                  <Info className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/profile" className="hidden md:block">
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <FilterButton
              active={selectedFilter === 'all'}
              onClick={() => setSelectedFilter('all')}
            >
              All
            </FilterButton>
            <FilterButton
              active={selectedFilter === 'for-you'}
              onClick={() => setSelectedFilter('for-you')}
            >
              <Flame className="w-4 h-4" />
              For You
            </FilterButton>
            <FilterButton
              active={selectedFilter === 'trending'}
              onClick={() => setSelectedFilter('trending')}
            >
              Trending
            </FilterButton>
            <FilterButton
              active={selectedFilter === 'saved'}
              onClick={() => setSelectedFilter('saved')}
            >
              Saved
            </FilterButton>
            <div className="h-6 w-px bg-slate-300 mx-1" />
            {sports.map((sport) => (
              <FilterButton
                key={sport.id}
                active={selectedFilter === sport.id}
                onClick={() => setSelectedFilter(sport.id)}
              >
                {sport.icon} {sport.name}
              </FilterButton>
            ))}
          </div>
        </div>
      </div>

      {/* Live Now Section */}
      <LiveNow matches={filteredLiveMatches} />

      {/* Articles Grid */}
      <div className="max-w-6xl mx-auto px-4 py-6 pb-24 md:pb-6">
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No articles found</h3>
            <p className="text-slate-500">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Floating Camera Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/image-recognition')}
        className="fixed bottom-6 right-6 z-30 w-16 h-16 bg-gradient-to-br from-[#1DB954] to-[#1ED760] rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-[#1DB954]/50 transition-shadow md:flex hidden"
        title="AI Sports Recognition"
      >
        <Camera className="w-7 h-7" />
      </motion.button>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 safe-area-bottom">
        <div className="relative flex items-center justify-around h-16 px-2">
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-center justify-center gap-1 text-[#1DB954] flex-1"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>
          
          <button
            onClick={() => navigate('/explore')}
            className="flex flex-col items-center justify-center gap-1 text-slate-600 hover:text-[#1DB954] transition-colors active:scale-95 flex-1"
          >
            <Compass className="w-6 h-6" />
            <span className="text-xs font-medium">Explore</span>
          </button>
          
          {/* Elevated Scan Button */}
          <div className="flex-1 flex justify-center">
            <button
              onClick={() => navigate('/image-recognition')}
              className="relative -top-6 w-14 h-14 bg-gradient-to-br from-[#1DB954] to-[#1ED760] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              <Camera className="w-7 h-7 text-white" />
            </button>
          </div>
          
          <button
            onClick={() => setShowFilterScreen(true)}
            className="flex flex-col items-center justify-center gap-1 text-slate-600 hover:text-[#1DB954] transition-colors active:scale-95 flex-1"
          >
            <Filter className="w-6 h-6" />
            <span className="text-xs font-medium">Filters</span>
          </button>
          
          <button
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center justify-center gap-1 text-slate-600 hover:text-[#1DB954] transition-colors active:scale-95 flex-1"
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>

      {/* Filter Screen Modal */}
      {showFilterScreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center"
          onClick={() => setShowFilterScreen(false)}
        >
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full md:max-w-2xl md:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Advanced Filters</h2>
                <p className="text-sm text-slate-500">Customize your feed</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilterScreen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
              {/* Sports Filter */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Sports, Teams & Players</h3>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {tempFilters.sports.length > 0 
                        ? `${tempFilters.sports.length} selected`
                        : 'Search for sports, teams, players, or competitions'}
                    </p>
                  </div>
                  {tempFilters.sports.length > 0 && (
                    <button
                      onClick={() => setTempFilters(prev => ({ ...prev, sports: [] }))}
                      className="text-sm text-[#1DB954] hover:text-[#1DB954]/80 font-medium"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Search Input */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search sports, teams, players, competitions..."
                    value={sportSearchQuery}
                    onChange={(e) => setSportSearchQuery(e.target.value)}
                    className="pl-9 h-10 text-sm"
                  />
                  {sportSearchQuery && (
                    <button
                      onClick={() => setSportSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                    </button>
                  )}
                </div>

                {/* Popular Sports Label - Only show when not searching */}
                {!sportSearchQuery && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Popular Sports
                    </div>
                    <div className="flex-1 h-px bg-slate-200"></div>
                  </div>
                )}

                {/* Sports Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {allSports
                    .filter(sport => {
                      // If searching, show all matching sports
                      if (sportSearchQuery) {
                        return sport.name.toLowerCase().includes(sportSearchQuery.toLowerCase());
                      }
                      // If not searching, show only popular sports
                      return popularSportIds.includes(sport.id);
                    })
                    .map((sport) => {
                      const isSelected = tempFilters.sports.includes(sport.id);
                      const isPopular = popularSportIds.includes(sport.id);
                      return (
                        <motion.button
                          key={sport.id}
                          onClick={() => toggleSportFilter(sport.id)}
                          whileTap={{ scale: 0.97 }}
                          className={`relative overflow-hidden rounded-2xl border-2 transition-all ${
                            isSelected
                              ? 'border-[#1DB954] bg-gradient-to-br from-[#1DB954]/10 to-[#1DB954]/5 shadow-sm'
                              : 'border-slate-200 bg-white hover:border-[#1DB954]/50 hover:bg-[#1DB954]/5'
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
                              {isSelected && (
                                <div className="text-xs text-[#1DB954] font-semibold mt-0.5 drop-shadow">Selected</div>
                              )}
                            </div>
                            
                            {/* Selection Checkmark */}
                            {isSelected && (
                              <div className="absolute top-2 right-2 w-6 h-6 bg-[#1DB954] rounded-full flex items-center justify-center shadow-lg">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                </div>

                {/* Show more sports hint when not searching */}
                {!sportSearchQuery && allSports.length > popularSportIds.length && (
                  <div className="text-center py-3 px-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm text-slate-600">
                      <Search className="w-4 h-4 inline-block mr-1 mb-0.5" />
                      Search to find <span className="font-semibold">{allSports.length - popularSportIds.length} more sports</span> including Cricket, Rugby, Esports & more
                    </p>
                  </div>
                )}

                {/* No results when searching */}
                {sportSearchQuery && allSports.filter(sport => 
                  sport.name.toLowerCase().includes(sportSearchQuery.toLowerCase())
                ).length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-sm text-slate-500">No sports found matching "{sportSearchQuery}"</p>
                  </div>
                )}
              </div>

              {/* Content Type Filter */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Content Type</h3>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {tempFilters.contentTypes.length > 0 
                        ? `${tempFilters.contentTypes.length} selected`
                        : 'Choose content format'}
                    </p>
                  </div>
                  {tempFilters.contentTypes.length > 0 && (
                    <button
                      onClick={() => setTempFilters(prev => ({ ...prev, contentTypes: [] }))}
                      className="text-sm text-[#1DB954] hover:text-[#1DB954]/80 font-medium"
                    >
                      Clear
                    </button>
                  )}
                </div>
                
                <div className="space-y-3">
                  {contentTypes.map((type) => {
                    const isSelected = tempFilters.contentTypes.includes(type.id);
                    const Icon = type.icon;
                    return (
                      <motion.button
                        key={type.id}
                        onClick={() => toggleContentTypeFilter(type.id)}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                          isSelected
                            ? 'border-[#1DB954] bg-gradient-to-r from-[#1DB954]/10 to-[#1DB954]/5 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-[#1DB954]/50 hover:bg-[#1DB954]/5'
                        }`}
                      >
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-[#1DB954]' : 'bg-slate-100'
                        }`}>
                          <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-slate-600'}`} />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-slate-900">{type.name}</div>
                          <div className="text-sm text-slate-600">{type.description}</div>
                        </div>
                        {isSelected && (
                          <div className="flex-shrink-0 w-6 h-6 bg-[#1DB954] rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Live Now Filter */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Live Now</h3>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {tempFilters.liveOnly ? 'Showing live content only' : 'Show only live events'}
                    </p>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => setTempFilters(prev => ({ ...prev, liveOnly: !prev.liveOnly }))}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                    tempFilters.liveOnly
                      ? 'border-red-500 bg-gradient-to-r from-red-50 to-red-50/50 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-red-300 hover:bg-red-50/30'
                  }`}
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                    tempFilters.liveOnly ? 'bg-red-500' : 'bg-slate-100'
                  }`}>
                    <Radio className={`w-6 h-6 ${tempFilters.liveOnly ? 'text-white' : 'text-slate-600'}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-slate-900">Live Content Only</div>
                    <div className="text-sm text-slate-600">Show only matches & events happening now</div>
                  </div>
                  {tempFilters.liveOnly && (
                    <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.button>
              </div>

              {/* Active Filters Summary */}
              {(tempFilters.sports.length > 0 || tempFilters.contentTypes.length > 0 || tempFilters.liveOnly) && (
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-slate-900">Active Filters</h4>
                    <button
                      onClick={clearFilters}
                      className="text-xs text-slate-600 hover:text-slate-900 font-medium"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tempFilters.sports.map(sportId => {
                      const sport = allSports.find(s => s.id === sportId);
                      return sport ? (
                        <div
                          key={sportId}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1DB954]/10 text-[#1DB954] rounded-full text-sm"
                        >
                          <span>{sport.icon}</span>
                          <span className="font-medium">{sport.name}</span>
                        </div>
                      ) : null;
                    })}
                    {tempFilters.contentTypes.map(typeId => {
                      const type = contentTypes.find(t => t.id === typeId);
                      return type ? (
                        <div
                          key={typeId}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                          <type.icon className="w-3.5 h-3.5" />
                          <span className="font-medium">{type.name}</span>
                        </div>
                      ) : null;
                    })}
                    {tempFilters.liveOnly && (
                      <div
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm"
                      >
                        <Radio className="w-3.5 h-3.5" />
                        <span className="font-medium">Live Content Only</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="flex-1"
              >
                Clear All
              </Button>
              <Button
                onClick={applyFilters}
                className="flex-1 bg-[#1DB954] hover:bg-[#1DB954]/90"
              >
                Apply Filters
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

function FilterButton({ 
  active, 
  onClick, 
  children 
}: { 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
        active
          ? 'bg-gradient-to-r from-[#1DB954] to-[#1ED760] text-white shadow-sm'
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
      }`}
    >
      {children}
    </button>
  );
}