import { useState } from 'react';
import { useNavigate } from 'react-router';
import { players, teams, sportTerminology } from '@/app/data/mockData';
import { motion, AnimatePresence } from 'motion/react';
import { X, Info } from 'lucide-react';

interface HighlightedContentProps {
  content: string;
  sport: string;
}

export function HighlightedContent({ content, sport }: HighlightedContentProps) {
  const navigate = useNavigate();
  const [selectedTerm, setSelectedTerm] = useState<typeof sportTerminology[0] | null>(null);

  // Filter entities by sport
  const sportPlayers = players.filter(p => p.sport === sport.toLowerCase());
  const sportTeams = teams.filter(t => t.sport === sport.toLowerCase());
  const sportTerms = sportTerminology.filter(t => t.sport === sport.toLowerCase());

  // Create a map of entities to detect
  const entityMap: Array<{
    text: string;
    type: 'player' | 'team' | 'term';
    id: string;
    data: any;
  }> = [
    ...sportPlayers.map(p => ({
      text: p.name,
      type: 'player' as const,
      id: p.id,
      data: p
    })),
    ...sportTeams.map(t => ({
      text: t.name,
      type: 'team' as const,
      id: t.id,
      data: t
    })),
    ...sportTerms.map(t => ({
      text: t.term,
      type: 'term' as const,
      id: t.id,
      data: t
    }))
  ];

  // Sort by length (longest first) to prevent partial matches
  entityMap.sort((a, b) => b.text.length - a.text.length);

  const handleEntityClick = (entity: typeof entityMap[0]) => {
    if (entity.type === 'player') {
      navigate(`/player/${entity.id}`);
    } else if (entity.type === 'team') {
      navigate(`/team/${entity.id}`);
    } else if (entity.type === 'term') {
      setSelectedTerm(entity.data);
    }
  };

  // Parse content and highlight entities
  const parseContent = (text: string) => {
    const parts: Array<{ text: string; entity?: typeof entityMap[0] }> = [];
    let remaining = text;
    let index = 0;

    while (remaining.length > 0) {
      let found = false;

      // Try to find an entity at the current position
      for (const entity of entityMap) {
        const entityText = entity.text;
        const lowerRemaining = remaining.toLowerCase();
        const lowerEntity = entityText.toLowerCase();

        if (lowerRemaining.startsWith(lowerEntity)) {
          // Check if it's a word boundary (not part of another word)
          const charBefore = index > 0 ? text[index - 1] : ' ';
          const charAfter = remaining[entityText.length] || ' ';
          const isWordBoundary = /\W/.test(charBefore) && /\W/.test(charAfter);

          if (isWordBoundary) {
            parts.push({
              text: remaining.substring(0, entityText.length),
              entity
            });
            remaining = remaining.substring(entityText.length);
            index += entityText.length;
            found = true;
            break;
          }
        }
      }

      if (!found) {
        // No entity found, add the next character as plain text
        const lastPart = parts[parts.length - 1];
        if (lastPart && !lastPart.entity) {
          lastPart.text += remaining[0];
        } else {
          parts.push({ text: remaining[0] });
        }
        remaining = remaining.substring(1);
        index++;
      }
    }

    return parts;
  };

  const getHighlightColor = (type: 'player' | 'team' | 'term') => {
    switch (type) {
      case 'player':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'team':
        return 'bg-[#1DB954]/10 text-[#1DB954] hover:bg-[#1DB954]/20';
      case 'term':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
    }
  };

  // Split content by paragraphs
  const paragraphs = content.split('\n\n');

  return (
    <>
      <div className="prose prose-lg max-w-none mb-8">
        {paragraphs.map((paragraph, i) => {
          const parts = parseContent(paragraph);
          
          return (
            <p key={i} className="text-slate-700 leading-relaxed mb-4">
              {parts.map((part, j) => {
                if (part.entity) {
                  return (
                    <button
                      key={j}
                      onClick={() => handleEntityClick(part.entity!)}
                      className={`${getHighlightColor(part.entity.type)} px-1 rounded font-medium transition-colors cursor-pointer inline`}
                    >
                      {part.text}
                    </button>
                  );
                }
                return <span key={j}>{part.text}</span>;
              })}
            </p>
          );
        })}
      </div>

      {/* Terminology Modal */}
      <AnimatePresence>
        {selectedTerm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTerm(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Info className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{selectedTerm.term}</h3>
                </div>
                <button
                  onClick={() => setSelectedTerm(null)}
                  className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 uppercase mb-1">Definitie</h4>
                  <p className="text-slate-700">{selectedTerm.definition}</p>
                </div>

                {selectedTerm.example && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase mb-1">Voorbeeld</h4>
                    <p className="text-slate-600 italic">"{selectedTerm.example}"</p>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-200">
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full font-medium">
                    {selectedTerm.sport}
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
