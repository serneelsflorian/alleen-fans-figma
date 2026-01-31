import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, MessageCircle, Share2, Bookmark, MoreVertical, Home, Compass, User, Camera, Filter } from 'lucide-react';
import { articles, sports } from '@/app/data/mockData';
import { useUser } from '@/app/contexts/UserContext';
import { useNavigate } from 'react-router';
import { formatDistanceToNow } from 'date-fns';

interface TikTokFeedProps {
  filteredArticles: typeof articles;
}

export function TikTokFeed({ filteredArticles }: TikTokFeedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedArticles, setLikedArticles] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const { toggleSaveArticle, isArticleSaved } = useUser();
  const navigate = useNavigate();

  const currentArticle = filteredArticles[currentIndex];
  
  // Get sport icon from sports data
  const sportData = currentArticle ? sports.find(s => s.id === currentArticle.sport) : null;
  const sportIcon = sportData?.icon || '⚽';

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (e.deltaY > 50 && currentIndex < filteredArticles.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (e.deltaY < -50 && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleScroll);
      }
    };
  }, [currentIndex, filteredArticles.length]);

  const handleLike = (id: string) => {
    setLikedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (!currentArticle) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <p>No articles available</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-black relative">
      <div ref={containerRef} className="h-screen w-full snap-y snap-mandatory overflow-y-scroll">
        <motion.div
          key={currentArticle.id}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="h-screen w-full relative snap-start"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={currentArticle.imageUrl}
              alt={currentArticle.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
          </div>

          {/* Top Logo */}
          <div className="absolute top-0 left-0 right-0 z-10">
            <div className="flex items-center justify-center p-4">
              <div className="text-white font-bold text-lg drop-shadow-lg">
                AlleenFans
              </div>
            </div>
          </div>

          {/* Content Overlay - Clickable to open article details */}
          <div 
            onClick={() => navigate(`/article/${currentArticle.id}`)}
            className="absolute inset-0 flex flex-col justify-end p-6 pb-24 cursor-pointer active:opacity-95 transition-opacity"
          >
            {/* Article Info */}
            <div className="space-y-3 pointer-events-none">
              {/* Sport Badge */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold">
                  {sportIcon} {currentArticle.sport}
                </span>
                {currentArticle.trending && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#1DB954] to-[#1ED760] rounded-full text-white text-xs font-bold">
                    🔥 Trending
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                {currentArticle.title}
              </h1>

              {/* Excerpt */}
              <p className="text-white/90 text-base line-clamp-2">
                {currentArticle.excerpt}
              </p>

              {/* Author & Time */}
              <div className="flex items-center gap-3 text-white/80 text-sm">
                <span className="font-semibold">{currentArticle.author}</span>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(currentArticle.publishedAt), { addSuffix: true })}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {currentArticle.teams.map((team) => (
                  <span
                    key={team}
                    className="px-2 py-1 bg-white/10 backdrop-blur-md rounded-md text-white text-xs"
                  >
                    #{team}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Action Bar (TikTok-style) */}
          <div className="absolute right-4 bottom-32 flex flex-col gap-6">
            {/* Like Button */}
            <button
              onClick={() => handleLike(currentArticle.id)}
              className="flex flex-col items-center gap-1 group"
            >
              <motion.div
                whileTap={{ scale: 0.8 }}
                className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md ${
                  likedArticles.has(currentArticle.id)
                    ? 'bg-gradient-to-br from-red-500 to-pink-500'
                    : 'bg-white/20 group-hover:bg-white/30'
                } transition-all`}
              >
                <Heart
                  className={`w-6 h-6 ${
                    likedArticles.has(currentArticle.id) ? 'fill-white text-white' : 'text-white'
                  }`}
                />
              </motion.div>
              <span className="text-white text-xs font-semibold">
                {likedArticles.has(currentArticle.id) ? '1.2k' : '1.1k'}
              </span>
            </button>

            {/* Comment Button */}
            <button className="flex flex-col items-center gap-1 group">
              <motion.div
                whileTap={{ scale: 0.8 }}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-all"
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-white text-xs font-semibold">342</span>
            </button>

            {/* Bookmark Button */}
            <button
              onClick={() => toggleSaveArticle(currentArticle.id)}
              className="flex flex-col items-center gap-1 group"
            >
              <motion.div
                whileTap={{ scale: 0.8 }}
                className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md ${
                  isArticleSaved(currentArticle.id)
                    ? 'bg-gradient-to-br from-[#1DB954] to-[#1ED760]'
                    : 'bg-white/20 group-hover:bg-white/30'
                } transition-all`}
              >
                <Bookmark
                  className={`w-6 h-6 ${
                    isArticleSaved(currentArticle.id) ? 'fill-white text-white' : 'text-white'
                  }`}
                />
              </motion.div>
              <span className="text-white text-xs font-semibold">Save</span>
            </button>

            {/* Share Button */}
            <button className="flex flex-col items-center gap-1 group">
              <motion.div
                whileTap={{ scale: 0.8 }}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-all"
              >
                <Share2 className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-white text-xs font-semibold">Share</span>
            </button>

            {/* More Options */}
            <button className="flex flex-col items-center gap-1 group">
              <motion.div
                whileTap={{ scale: 0.8 }}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-all"
              >
                <MoreVertical className="w-6 h-6 text-white" />
              </motion.div>
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-white text-sm font-semibold">
            {currentIndex + 1} / {filteredArticles.length}
          </div>

          {/* Swipe Indicators */}
          {currentIndex < filteredArticles.length - 1 && (
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 text-white/60"
            >
              <span className="text-xs">Swipe up</span>
              <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-end justify-center p-1">
                <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Mobile Bottom Navigation Bar - Always Visible */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-t border-white/10">
        <div className="relative flex items-center justify-around h-16 px-2">
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-center justify-center gap-1 text-white/60 hover:text-white transition-colors active:scale-95 flex-1"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>
          
          <button
            onClick={() => navigate('/explore')}
            className="flex flex-col items-center justify-center gap-1 text-white/60 hover:text-white transition-colors active:scale-95 flex-1"
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
            className="flex flex-col items-center justify-center gap-1 text-white/60 hover:text-white transition-colors active:scale-95 flex-1"
          >
            <Filter className="w-6 h-6" />
            <span className="text-xs font-medium">Filters</span>
          </button>
          
          <button
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center justify-center gap-1 text-white/60 hover:text-white transition-colors active:scale-95 flex-1"
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}