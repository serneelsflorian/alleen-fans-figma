import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Clock, TrendingUp, Bookmark, BookmarkCheck } from 'lucide-react';
import { Article, teams } from '@/app/data/mockData';
import { useUser } from '@/app/contexts/UserContext';
import { formatDistanceToNow } from 'date-fns';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { isArticleSaved, toggleSaveArticle } = useUser();
  const saved = isArticleSaved(article.id);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveArticle(article.id);
  };

  // Get team data for this article
  const articleTeams = article.teams
    .map(teamId => teams.find(t => t.id === teamId))
    .filter(Boolean);

  return (
    <Link to={`/article/${article.id}`}>
      <motion.article
        whileHover={{ y: -2 }}
        className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-200"
      >
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-200">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {article.trending && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-[#1DB954] text-white text-xs rounded-full flex items-center gap-1 shadow-lg">
              <TrendingUp className="w-3 h-3" />
              Trending
            </div>
          )}
          <button
            onClick={handleSaveClick}
            className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
          >
            {saved ? (
              <BookmarkCheck className="w-4 h-4 text-[#1DB954]" />
            ) : (
              <Bookmark className="w-4 h-4 text-slate-700" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Meta */}
          <div className="flex items-center gap-2 mb-2 text-xs text-slate-500">
            <span className="font-medium text-[#1DB954]">{article.source}</span>
            <span>•</span>
            <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime} min
            </div>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-[#1DB954] transition-colors">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-slate-600 line-clamp-2 mb-3">
            {article.excerpt}
          </p>

          {/* Team Badges and Tags */}
          <div className="flex flex-wrap gap-2">
            {/* Team Badges with team colors */}
            {articleTeams.map(team => (
              <span
                key={team.id}
                className="px-2 py-1 text-white text-xs rounded-md font-medium"
                style={{ backgroundColor: team.color }}
              >
                {team.name}
              </span>
            ))}
            {/* Tags */}
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}