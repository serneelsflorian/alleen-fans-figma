import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Shuffle, MapPin, Clock, Radio, ChevronRight, Sparkles, ArrowLeft, Home, User, Filter, Compass, Camera } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';

// Extended global sports events
const globalLiveEvents = [
  {
    id: 'gev1',
    sport: 'Soccer',
    sportIcon: '⚽',
    eventName: 'Premier League: Manchester United vs Liverpool',
    location: 'Manchester, England',
    time: 'LIVE NOW',
    currentScore: '2-1',
    thumbnail: 'https://images.unsplash.com/photo-1568495019994-e9f1045bf0ac?w=400',
    status: '78\' 2nd Half',
    viewers: '2.3M'
  },
  {
    id: 'gev2',
    sport: 'Basketball',
    sportIcon: '🏀',
    eventName: 'NBA: Celtics vs Heat',
    location: 'Boston, MA',
    time: 'LIVE NOW',
    currentScore: '89-85',
    thumbnail: 'https://images.unsplash.com/photo-1762025930827-9f1dda45aff8?w=400',
    status: '3rd Quarter',
    viewers: '1.8M'
  },
  {
    id: 'gev3',
    sport: 'Cricket',
    sportIcon: '🏏',
    eventName: 'India vs Australia - Test Match',
    location: 'Mumbai, India',
    time: 'LIVE NOW',
    currentScore: 'IND 285/4',
    thumbnail: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400',
    status: 'Day 2, Session 3',
    viewers: '5.7M'
  },
  {
    id: 'gev4',
    sport: 'Tennis',
    sportIcon: '🎾',
    eventName: 'ATP Finals: Djokovic vs Alcaraz',
    location: 'Turin, Italy',
    time: 'LIVE NOW',
    currentScore: '6-4, 3-2',
    thumbnail: 'https://images.unsplash.com/photo-1512227847796-ddde7e3979c9?w=400',
    status: '2nd Set',
    viewers: '980K'
  },
  {
    id: 'gev5',
    sport: 'Rugby',
    sportIcon: '🏉',
    eventName: 'Six Nations: England vs France',
    location: 'London, England',
    time: 'LIVE NOW',
    currentScore: '17-14',
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400',
    status: '62\' 2nd Half',
    viewers: '1.2M'
  },
  {
    id: 'gev6',
    sport: 'Volleyball',
    sportIcon: '🏐',
    eventName: 'Olympic Qualifier: Brazil vs Poland',
    location: 'Rio de Janeiro, Brazil',
    time: 'LIVE NOW',
    currentScore: '2-1',
    thumbnail: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400',
    status: '4th Set',
    viewers: '650K'
  },
  {
    id: 'gev7',
    sport: 'Ice Hockey',
    sportIcon: '🏒',
    eventName: 'NHL: Maple Leafs vs Canadiens',
    location: 'Toronto, Canada',
    time: 'LIVE NOW',
    currentScore: '3-2',
    thumbnail: 'https://images.unsplash.com/photo-1546563367-4893bfd46f6d?w=400',
    status: '2nd Period',
    viewers: '890K'
  },
  {
    id: 'gev8',
    sport: 'Esports',
    sportIcon: '🎮',
    eventName: 'League of Legends World Championship',
    location: 'Seoul, South Korea',
    time: 'LIVE NOW',
    currentScore: 'T1 vs G2',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
    status: 'Game 3 of 5',
    viewers: '3.4M'
  },
  {
    id: 'gev9',
    sport: 'Baseball',
    sportIcon: '⚾',
    eventName: 'NPB: Tokyo Giants vs Osaka Tigers',
    location: 'Tokyo, Japan',
    time: 'LIVE NOW',
    currentScore: '4-2',
    thumbnail: 'https://images.unsplash.com/photo-1650124077853-b6fcb0231cc7?w=400',
    status: '7th Inning',
    viewers: '1.1M'
  },
  {
    id: 'gev10',
    sport: 'MMA',
    sportIcon: '🥊',
    eventName: 'UFC Fight Night: Main Event',
    location: 'Las Vegas, NV',
    time: 'LIVE NOW',
    currentScore: 'Rd 3',
    thumbnail: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400',
    status: 'Round 3',
    viewers: '2.1M'
  },
];

// Sports roulette data - discover new sports
const discoverableSports = [
  {
    id: 'sp1',
    name: 'Sepak Takraw',
    icon: '🤸',
    description: 'A Southeast Asian sport combining soccer and volleyball, played with a rattan ball using only feet, knees, and head.',
    funFact: 'Players perform gravity-defying bicycle kicks over a 5-foot net!',
    origin: 'Malaysia/Thailand',
    popularIn: '🇹🇭 🇲🇾 🇮🇩',
    thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
    highlightVideo: 'Amazing athletic display'
  },
  {
    id: 'sp2',
    name: 'Hurling',
    icon: '🏑',
    description: 'An ancient Irish sport played with wooden sticks and a small ball at incredible speeds - one of the fastest field sports in the world.',
    funFact: 'The ball can travel up to 110 mph!',
    origin: 'Ireland',
    popularIn: '🇮🇪',
    thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
    highlightVideo: 'Fast-paced action'
  },
  {
    id: 'sp3',
    name: 'Kabaddi',
    icon: '🤼',
    description: 'A contact team sport where raiders must tag opponents while holding their breath and chanting "kabaddi."',
    funFact: 'No equipment needed - pure strength and strategy!',
    origin: 'India',
    popularIn: '🇮🇳 🇵🇰 🇧🇩',
    thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400',
    highlightVideo: 'Intense team battles'
  },
  {
    id: 'sp4',
    name: 'Handball',
    icon: '🤾',
    description: 'A fast-paced indoor sport combining basketball and soccer elements, where players throw a ball into a goal.',
    funFact: 'One of the most popular sports in Europe with over 19 million players!',
    origin: 'Germany/Denmark',
    popularIn: '🇩🇪 🇫🇷 🇪🇸 🇩🇰',
    thumbnail: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400',
    highlightVideo: 'High-energy gameplay'
  },
  {
    id: 'sp5',
    name: 'Jai Alai',
    icon: '🎯',
    description: 'The fastest ball sport in the world, players use curved baskets to hurl a ball at speeds over 180 mph against a wall.',
    funFact: 'Nicknamed "The Beautiful Game" for its grace and speed!',
    origin: 'Basque Country',
    popularIn: '🇪🇸 🇺🇸 🇵🇭',
    thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
    highlightVideo: 'Lightning-fast action'
  },
  {
    id: 'sp6',
    name: 'Aussie Rules Football',
    icon: '🏉',
    description: 'A uniquely Australian sport played on a cricket oval, combining elements of rugby, soccer, and basketball.',
    funFact: 'The AFL Grand Final attracts over 100,000 spectators annually!',
    origin: 'Australia',
    popularIn: '🇦🇺',
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400',
    highlightVideo: 'Spectacular marks and goals'
  },
  {
    id: 'sp7',
    name: 'Competitive Climbing',
    icon: '🧗',
    description: 'Athletes race up walls or solve complex boulder problems, combining strength, strategy, and mental focus.',
    funFact: 'Made its Olympic debut at Tokyo 2020!',
    origin: 'International',
    popularIn: '🇯🇵 🇺🇸 🇫🇷 🇩🇪',
    thumbnail: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400',
    highlightVideo: 'Incredible feats of strength'
  },
  {
    id: 'sp8',
    name: 'Capoeira',
    icon: '🎭',
    description: 'A Brazilian martial art that combines elements of dance, acrobatics, and music in a mesmerizing display.',
    funFact: 'Disguised as a dance by enslaved Africans to practice self-defense!',
    origin: 'Brazil',
    popularIn: '🇧🇷 🌍',
    thumbnail: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400',
    highlightVideo: 'Graceful combat dance'
  },
  {
    id: 'sp9',
    name: 'Curling',
    icon: '🥌',
    description: 'Often called "chess on ice," teams slide stones toward a target while teammates sweep the ice to control the stone\'s path.',
    funFact: 'The stones weigh 44 pounds and are made from rare Scottish granite!',
    origin: 'Scotland',
    popularIn: '🇨🇦 🇸🇪 🇳🇴 🇩🇪',
    thumbnail: 'https://images.unsplash.com/photo-1588773920070-a68c2f3a4c6c?w=400',
    highlightVideo: 'Strategic precision sport'
  },
  {
    id: 'sp10',
    name: 'Roller Derby',
    icon: '⛸️',
    description: 'A high-contact roller skating sport where teams race around a track, with blockers trying to stop the opposing jammer.',
    funFact: 'Predominantly women-led with players adopting creative alter-egos!',
    origin: 'United States',
    popularIn: '🇺🇸 🇬🇧 🇦🇺',
    thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400',
    highlightVideo: 'Action-packed racing'
  },
];

export function Explore() {
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSport, setSelectedSport] = useState<typeof discoverableSports[0] | null>(null);
  const [showSportDetail, setShowSportDetail] = useState(false);

  const spinRoulette = () => {
    setIsSpinning(true);
    setShowSportDetail(false);
    
    // Simulate roulette spin
    setTimeout(() => {
      const randomSport = discoverableSports[Math.floor(Math.random() * discoverableSports.length)];
      setSelectedSport(randomSport);
      setIsSpinning(false);
      setShowSportDetail(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-gradient-to-r from-[#0085C7] to-[#009F3D] text-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors active:scale-95"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <Globe className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Explore</h1>
              <p className="text-sm text-white/80">Discover sports from around the world</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        {/* Sports Roulette Section */}
        <div className="bg-gradient-to-br from-[#0085C7] via-[#F4C300] via-[#000000] via-[#009F3D] to-[#EE334E] rounded-3xl p-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-100 rounded-[calc(1.5rem-4px)] p-6 text-slate-900 shadow-xl overflow-hidden relative"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle, #475569 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />
            </div>

            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-[#F4C300]" />
                <h2 className="text-xl font-bold text-slate-900">Sports Roulette</h2>
              </div>
              <p className="text-slate-700 mb-6">
                Feeling adventurous? Spin the roulette to discover a random sport you might not know!
              </p>

              {/* Roulette Display */}
              <AnimatePresence mode="wait">
                {!isSpinning && !showSportDetail && (
                  <motion.div
                    key="initial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="text-6xl mb-4"
                    >
                      🌍
                    </motion.div>
                    <p className="text-lg font-medium mb-6 text-slate-900">Ready to discover something new?</p>
                  </motion.div>
                )}

                {isSpinning && (
                  <motion.div
                    key="spinning"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                      className="text-6xl mb-4"
                    >
                      <Shuffle className="w-16 h-16 mx-auto text-[#0085C7]" />
                    </motion.div>
                    <p className="text-lg font-medium text-slate-900">Spinning the roulette...</p>
                  </motion.div>
                )}

                {showSportDetail && selectedSport && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    className="bg-slate-200/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-300"
                  >
                    <div className="text-center mb-4">
                      <div className="text-6xl mb-3">{selectedSport.icon}</div>
                      <h3 className="text-2xl font-bold mb-2 text-slate-900">{selectedSport.name}</h3>
                      <div className="flex items-center justify-center gap-2 text-sm text-slate-600 mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedSport.origin}</span>
                        <span className="mx-2">•</span>
                        <span>Popular in {selectedSport.popularIn}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4 text-left">
                      <div>
                        <h4 className="font-semibold mb-1 text-slate-900">What is it?</h4>
                        <p className="text-slate-700 text-sm">{selectedSport.description}</p>
                      </div>
                      
                      <div className="bg-slate-300/30 rounded-xl p-4">
                        <h4 className="font-semibold mb-1 flex items-center gap-2 text-slate-900">
                          <Sparkles className="w-4 h-4 text-[#F4C300]" />
                          Fun Fact
                        </h4>
                        <p className="text-slate-700 text-sm">{selectedSport.funFact}</p>
                      </div>

                      <Button
                        onClick={() => setShowSportDetail(false)}
                        className="w-full bg-gradient-to-r from-[#0085C7] to-[#009F3D] text-white hover:from-[#0075B7] hover:to-[#008F3D]"
                      >
                        Spin Again
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!showSportDetail && !isSpinning && (
                <Button
                  onClick={spinRoulette}
                  className="w-full bg-white text-[#0085C7] hover:bg-white/90 font-bold py-6 text-lg border-2 border-[#0085C7]"
                >
                  <Shuffle className="w-5 h-5 mr-2" />
                  Spin the Roulette
                </Button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Live Sports Feed */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-bold text-slate-900">Live Sports Feed</h2>
            </div>
            <div className="text-sm text-slate-500">
              {globalLiveEvents.length} events worldwide
            </div>
          </div>
          <p className="text-slate-600 mb-6">
            Real-time events happening right now across the globe
          </p>

          <div className="space-y-4">
            {globalLiveEvents.map((event, index) => (
              <motion.button
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {/* Navigate to event detail */}}
                className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-slate-200 hover:border-[#1DB954] group"
              >
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-slate-100">
                    <img 
                      src={event.thumbnail} 
                      alt={event.eventName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <motion.div
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-white rounded-full"
                      />
                      LIVE
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 text-left">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{event.sportIcon}</span>
                        <div>
                          <div className="font-semibold text-slate-900 line-clamp-1">
                            {event.eventName}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#1DB954] transition-colors flex-shrink-0" />
                    </div>

                    {/* Score & Status */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="bg-slate-100 px-3 py-1 rounded-lg">
                        <div className="text-sm font-bold text-slate-900">{event.currentScore}</div>
                      </div>
                      <div className="text-xs text-slate-500">{event.status}</div>
                      <div className="ml-auto text-xs text-slate-400 flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {event.viewers} watching
                      </div>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bottom spacing for nav */}
        <div className="h-8" />
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
            className="flex flex-col items-center justify-center gap-1 text-[#1DB954] flex-1"
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
            className="flex flex-col items-center justify-center gap-1 text-slate-600 hover:text-[#1DB954] transition-colors active:scale-95 flex-1"
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}