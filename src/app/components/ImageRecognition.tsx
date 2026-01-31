import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Upload, 
  X, 
  Loader2, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Trophy,
  Users,
  MapPin,
  Calendar
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface RecognitionResult {
  sport: string;
  sportIcon: string;
  teams: string[];
  teamLogos: string[];
  competition: string;
  venue?: string;
  isLive: boolean;
  matchId?: string;
  confidence: number;
  timestamp: string;
}

export function ImageRecognition() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const mockRecognitionResults: RecognitionResult[] = [
    {
      sport: 'Soccer',
      sportIcon: '⚽',
      teams: ['FC Barcelona', 'Real Madrid'],
      teamLogos: ['🔵🔴', '⚪'],
      competition: 'La Liga',
      venue: 'Camp Nou, Barcelona',
      isLive: true,
      matchId: 'live-1',
      confidence: 96,
      timestamp: 'Live Now'
    },
    {
      sport: 'Basketball',
      sportIcon: '🏀',
      teams: ['Lakers', 'Warriors'],
      teamLogos: ['💜💛', '💙💛'],
      competition: 'NBA - Western Conference',
      venue: 'Crypto.com Arena, Los Angeles',
      isLive: true,
      matchId: 'live-2',
      confidence: 94,
      timestamp: 'Live - 3rd Quarter'
    },
    {
      sport: 'Football',
      sportIcon: '🏈',
      teams: ['Kansas City Chiefs', 'Buffalo Bills'],
      teamLogos: ['🔴', '🔵🔴'],
      competition: 'NFL Playoffs',
      venue: 'Arrowhead Stadium',
      isLive: false,
      confidence: 89,
      timestamp: 'Yesterday, 8:00 PM'
    },
    {
      sport: 'Soccer',
      sportIcon: '⚽',
      teams: ['Manchester United', 'Liverpool'],
      teamLogos: ['🔴', '🔴'],
      competition: 'Premier League',
      venue: 'Old Trafford, Manchester',
      isLive: true,
      matchId: 'live-3',
      confidence: 98,
      timestamp: 'Live - 2nd Half'
    },
    {
      sport: 'Tennis',
      sportIcon: '🎾',
      teams: ['Rafael Nadal', 'Novak Djokovic'],
      teamLogos: ['🇪🇸', '🇷🇸'],
      competition: 'Australian Open - Men\'s Final',
      venue: 'Rod Laver Arena, Melbourne',
      isLive: false,
      confidence: 92,
      timestamp: '2 days ago'
    }
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setResult(null);

    // Simulate AI analysis delay
    setTimeout(() => {
      // Randomly select a recognition result
      const randomResult = mockRecognitionResults[Math.floor(Math.random() * mockRecognitionResults.length)];
      setResult(randomResult);
      setIsAnalyzing(false);
    }, 2500);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
    setIsAnalyzing(false);
  };

  const handleViewLiveMatch = () => {
    if (result?.matchId) {
      navigate(`/live-match/${result.matchId}`);
    }
  };

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
            <X className="w-5 h-5" />
          </Button>
          <h1 className="font-bold text-white">AI Sports Recognition</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!selectedImage ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Hero Section */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#1DB954] to-pink-600 rounded-full flex items-center justify-center"
                >
                  <Sparkles className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-3">
                  Snap & Discover
                </h2>
                <p className="text-lg text-slate-300 max-w-md mx-auto">
                  Take a photo of any game, player, or stadium and instantly get match info and live stats
                </p>
              </div>

              {/* Upload Options */}
              <div className="grid gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => cameraInputRef.current?.click()}
                  className="bg-gradient-to-r from-[#1DB954] to-[#1DB954]/80 text-white p-6 rounded-2xl shadow-lg flex items-center gap-4"
                >
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <Camera className="w-7 h-7" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-lg mb-1">Take Photo</div>
                    <div className="text-[#1DB954]/20 text-sm">Use your camera to capture a match</div>
                  </div>
                  <ArrowRight className="w-6 h-6" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg flex items-center gap-4 border border-slate-700"
                >
                  <div className="w-14 h-14 bg-slate-700 rounded-full flex items-center justify-center">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-lg mb-1">Upload Image</div>
                    <div className="text-slate-400 text-sm">Choose from your photo library</div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-slate-500" />
                </motion.button>
              </div>

              {/* Features */}
              <div className="mt-12 space-y-4">
                <h3 className="text-white font-semibold mb-4">What we can recognize:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: '⚽', label: 'Teams & Players' },
                    { icon: '🏟️', label: 'Stadiums' },
                    { icon: '📺', label: 'TV Screens' },
                    { icon: '👕', label: 'Jerseys' }
                  ].map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center gap-3"
                    >
                      <span className="text-3xl">{item.icon}</span>
                      <span className="text-white font-medium text-sm">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileSelect}
                className="hidden"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              {/* Image Preview */}
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src={selectedImage} 
                  alt="Captured" 
                  className="w-full h-64 object-cover"
                />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-3" />
                      <p className="text-white font-semibold">Analyzing image...</p>
                      <p className="text-slate-300 text-sm mt-1">Using AI to identify match details</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Results */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Success Header */}
                  <div className="flex items-center gap-3 text-green-400">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-semibold">Match Identified - {result.confidence}% confident</span>
                  </div>

                  {/* Match Info Card */}
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 shadow-xl">
                    {/* Sport Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#1DB954]/20 text-[#1DB954] px-3 py-1 rounded-full text-sm font-medium mb-4">
                      <span className="text-lg">{result.sportIcon}</span>
                      {result.sport}
                    </div>

                    {/* Teams */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{result.teamLogos[0]}</span>
                          <span className="text-xl font-bold text-white">{result.teams[0]}</span>
                        </div>
                        {result.isLive && (
                          <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded animate-pulse">
                            LIVE
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{result.teamLogos[1]}</span>
                        <span className="text-xl font-bold text-white">{result.teams[1]}</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3 text-slate-300">
                        <Trophy className="w-5 h-5 text-slate-500" />
                        <span>{result.competition}</span>
                      </div>
                      {result.venue && (
                        <div className="flex items-center gap-3 text-slate-300">
                          <MapPin className="w-5 h-5 text-slate-500" />
                          <span>{result.venue}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-slate-300">
                        <Calendar className="w-5 h-5 text-slate-500" />
                        <span>{result.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {result.isLive && (
                      <Button
                        onClick={handleViewLiveMatch}
                        className="w-full bg-gradient-to-r from-[#1DB954] to-[#1DB954]/80 hover:from-[#1DB954]/90 hover:to-[#1DB954]/70 text-white py-6 text-lg font-semibold rounded-xl shadow-lg"
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                        View Live Match Stats
                      </Button>
                    )}
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="w-full py-6 text-lg rounded-xl border-slate-600 text-white hover:bg-slate-800"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Scan Another Image
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}