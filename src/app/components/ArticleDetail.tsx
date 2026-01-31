import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Clock,
  TrendingUp,
  Sparkles,
  BarChart3,
  Users,
  ShoppingBag,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { articles, products, players, teams } from '@/app/data/mockData';
import { useUser } from '@/app/contexts/UserContext';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/app/components/ui/button';
import { toast } from 'sonner';
import { HighlightedContent } from '@/app/components/HighlightedContent';
import { ShareModal } from '@/app/components/ShareModal';

// Helper function to determine the correct route for a tag
function getTagRoute(tag: string): string {
  // Normalize the tag for comparison
  const normalizedTag = tag.toLowerCase();
  
  // Check if tag matches a player name
  const player = players.find(p => p.name.toLowerCase() === normalizedTag);
  if (player) {
    return `/player/${player.id}`;
  }
  
  // Check if tag matches a team name
  const team = teams.find(t => t.name.toLowerCase() === normalizedTag);
  if (team) {
    return `/team/${team.id}`;
  }
  
  // Default to tag detail page
  return `/tag/${encodeURIComponent(tag)}`;
}

export function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isArticleSaved, toggleSaveArticle } = useUser();
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'stats' | 'players' | 'comparison'>('summary');
  const [showProducts, setShowProducts] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  
  // Swipe handling
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const article = articles.find(a => a.id === id);
  
  // Find current article index and adjacent articles
  const currentIndex = articles.findIndex(a => a.id === id);
  const previousArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && nextArticle) {
        // Swiped left -> next article
        setSwipeDirection('left');
        setTimeout(() => {
          navigate(`/article/${nextArticle.id}`);
          setSwipeDirection(null);
        }, 150);
      } else if (diff < 0 && previousArticle) {
        // Swiped right -> previous article
        setSwipeDirection('right');
        setTimeout(() => {
          navigate(`/article/${previousArticle.id}`);
          setSwipeDirection(null);
        }, 150);
      }
    }
  };

  const handlePreviousClick = () => {
    if (previousArticle) {
      navigate(`/article/${previousArticle.id}`);
    }
  };

  const handleNextClick = () => {
    if (nextArticle) {
      navigate(`/article/${nextArticle.id}`);
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Article not found</h2>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const saved = isArticleSaved(article.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {
        // User cancelled share or share failed
        toast.error('Delen geannuleerd');
      });
    } else {
      // Fallback: try clipboard, but handle errors gracefully
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.location.href)
          .then(() => {
            toast.success('Link gekopieerd naar clipboard!');
          })
          .catch(() => {
            // Clipboard API blocked - show link in toast instead
            toast.info('Link: ' + window.location.href, {
              duration: 10000,
            });
          });
      } else {
        // No clipboard access - show link in toast
        toast.info('Link: ' + window.location.href, {
          duration: 10000,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setShowShareModal(true)}>
              <Share2 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleSaveArticle(article.id)}
            >
              {saved ? (
                <BookmarkCheck className="w-5 h-5 text-[#1DB954]" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <motion.div 
        className="max-w-4xl mx-auto px-4 py-6" 
        onTouchStart={handleTouchStart} 
        onTouchMove={handleTouchMove} 
        onTouchEnd={handleTouchEnd}
        animate={{
          x: swipeDirection === 'left' ? -20 : swipeDirection === 'right' ? 20 : 0,
          opacity: swipeDirection ? 0.7 : 1
        }}
        transition={{ duration: 0.15 }}
      >
        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="aspect-[16/9] rounded-2xl overflow-hidden mb-6 shadow-lg"
        >
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="px-3 py-1 bg-[#1DB954] text-white text-sm rounded-full font-medium">
            {article.source}
          </span>
          {article.trending && (
            <span className="px-3 py-1 bg-[#1DB954]/10 text-[#1DB954] text-sm rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Trending
            </span>
          )}
          <span className="text-sm text-slate-500">
            By {article.author}
          </span>
          <span className="text-sm text-slate-500">
            {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
          </span>
          <span className="flex items-center gap-1 text-sm text-slate-500">
            <Clock className="w-4 h-4" />
            {article.readTime} min read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {article.title}
        </h1>

        {/* Excerpt */}
        <p className="text-xl text-slate-600 mb-6 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => navigate(getTagRoute(tag))}
              className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-lg hover:bg-[#1DB954]/10 hover:text-[#1DB954] hover:border-[#1DB954] border border-transparent transition-all cursor-pointer active:scale-95"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* AI Insights Panel */}
        {showAIPanel && article.aiInsights && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-bold text-slate-900">AI-Generated Insights</h2>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto">
              {article.aiInsights.summary && (
                <TabButton
                  active={activeTab === 'summary'}
                  onClick={() => setActiveTab('summary')}
                >
                  Summary
                </TabButton>
              )}
              {article.aiInsights.keyStats && (
                <TabButton
                  active={activeTab === 'stats'}
                  onClick={() => setActiveTab('stats')}
                  icon={<BarChart3 className="w-4 h-4" />}
                >
                  Stats
                </TabButton>
              )}
              {article.aiInsights.playerInfo && (
                <TabButton
                  active={activeTab === 'players'}
                  onClick={() => setActiveTab('players')}
                  icon={<Users className="w-4 h-4" />}
                >
                  Players
                </TabButton>
              )}
              {article.aiInsights.comparison && (
                <TabButton
                  active={activeTab === 'comparison'}
                  onClick={() => setActiveTab('comparison')}
                >
                  Compare
                </TabButton>
              )}
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl p-4">
              {activeTab === 'summary' && article.aiInsights.summary && (
                <p className="text-slate-700">{article.aiInsights.summary}</p>
              )}

              {activeTab === 'stats' && article.aiInsights.keyStats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {article.aiInsights.keyStats.map((stat, i) => (
                    <div key={i} className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{stat.value}</div>
                      <div className="text-sm text-slate-600 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'players' && article.aiInsights.playerInfo && (
                <div className="space-y-3">
                  {article.aiInsights.playerInfo.map((player, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">{player.name}</div>
                        <div className="text-sm text-slate-600">{player.team}</div>
                      </div>
                      <div className="text-sm font-medium text-purple-600">{player.stats}</div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'comparison' && article.aiInsights.comparison && (
                <div>
                  <div className="flex justify-between mb-4 font-medium text-slate-900">
                    <span>{article.aiInsights.comparison.team1}</span>
                    <span>{article.aiInsights.comparison.team2}</span>
                  </div>
                  <div className="space-y-3">
                    {article.aiInsights.comparison.stats.map((stat, i) => (
                      <div key={i}>
                        <div className="text-sm text-slate-600 mb-1 text-center">{stat.label}</div>
                        <div className="flex justify-between items-center gap-4">
                          <span className="font-medium text-purple-600">{stat.value1}</span>
                          <div className="flex-1 h-2 bg-slate-200 rounded-full" />
                          <span className="font-medium text-blue-600">{stat.value2}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Article Content - Now with highlighted players, teams, and terminology */}
        <HighlightedContent content={article.content} sport={article.sport} />

        {/* Commerce Section */}
        <div className="bg-gradient-to-br from-[#1DB954]/10 to-[#1DB954]/5 rounded-2xl p-6 border border-[#1DB954]/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1DB954]" />
              <h3 className="text-lg font-bold text-slate-900">Related Products</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowProducts(!showProducts)}
            >
              {showProducts ? 'Hide' : 'Show'}
            </Button>
          </div>

          {showProducts && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-slate-100 rounded-lg mb-3 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-medium text-slate-900 mb-1 text-sm">{product.name}</h4>
                  <p className="text-xs text-slate-600 mb-2">{product.brand}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1DB954]">${product.price}</span>
                    <Button size="sm" className="bg-[#1DB954] hover:bg-[#1DB954]/90">
                      Buy Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePreviousClick}
            disabled={!previousArticle}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextClick}
            disabled={!nextArticle}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          isOpen={showShareModal}
          title={article.title}
          text={article.excerpt}
          url={window.location.href}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
}

function TabButton({ 
  active, 
  onClick, 
  icon, 
  children 
}: { 
  active: boolean; 
  onClick: () => void; 
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
        active
          ? 'bg-purple-600 text-white shadow-sm'
          : 'bg-white text-slate-700 hover:bg-slate-50'
      }`}
    >
      {icon}
      {children}
    </button>
  );
}