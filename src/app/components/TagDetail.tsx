import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, TrendingUp, Hash, Calendar } from 'lucide-react';
import { articles } from '@/app/data/mockData';
import { Button } from '@/app/components/ui/button';
import { ArticleCard } from '@/app/components/ArticleCard';

export function TagDetail() {
  const { tag } = useParams();
  const navigate = useNavigate();

  // Decode the tag from URL
  const decodedTag = decodeURIComponent(tag || '');

  // Find all articles with this tag
  const taggedArticles = articles.filter(article =>
    article.tags.some(t => t.toLowerCase() === decodedTag.toLowerCase())
  );

  if (taggedArticles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Geen artikelen gevonden voor deze tag</h2>
          <Button onClick={() => navigate(-1)}>Ga terug</Button>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalArticles = taggedArticles.length;
  const trendingCount = taggedArticles.filter(a => a.trending).length;
  const sports = [...new Set(taggedArticles.map(a => a.sport))];
  const sources = [...new Set(taggedArticles.map(a => a.source))];

  // Sort by date (newest first)
  const sortedArticles = [...taggedArticles].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

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
          className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl p-8 text-white shadow-2xl mb-8 overflow-hidden relative"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-4 border-white/30">
                <Hash className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">{decodedTag}</h1>
                <p className="text-purple-100 text-lg mt-1">{totalArticles} artikelen</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <div className="text-3xl font-bold mb-1">{totalArticles}</div>
                <div className="text-sm text-white/80">Artikelen</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <div className="text-3xl font-bold mb-1">{trendingCount}</div>
                <div className="text-sm text-white/80">Trending</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <div className="text-3xl font-bold mb-1">{sports.length}</div>
                <div className="text-sm text-white/80">Sporten</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Sports */}
        {sports.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-md mb-8 border border-slate-200"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h2 className="text-2xl font-bold text-slate-900">Gerelateerde Sporten</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {sports.map((sport) => (
                <span
                  key={sport}
                  className="px-4 py-2 bg-gradient-to-br from-purple-100 to-purple-50 text-purple-800 text-sm rounded-full font-medium border border-purple-200 capitalize"
                >
                  {sport}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Sources */}
        {sources.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-md mb-8 border border-slate-200"
          >
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-[#1DB954]" />
              <h2 className="text-2xl font-bold text-slate-900">Bronnen</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {sources.map((source) => (
                <span
                  key={source}
                  className="px-4 py-2 bg-gradient-to-br from-[#1DB954]/10 to-[#1ED760]/10 text-[#1DB954] text-sm rounded-full font-medium border border-[#1DB954]/20"
                >
                  {source}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Hash className="w-5 h-5 text-purple-600" />
            <h2 className="text-2xl font-bold text-slate-900">Alle Artikelen</h2>
          </div>

          <div className="space-y-4">
            {sortedArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* No Articles Message */}
        {sortedArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Hash className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Geen artikelen gevonden</h3>
            <p className="text-slate-600">Er zijn momenteel geen artikelen met deze tag.</p>
          </div>
        )}
      </div>
    </div>
  );
}
