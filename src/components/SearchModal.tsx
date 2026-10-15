import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Article, OpinionPiece } from '../data/newsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  opinionPieces: OpinionPiece[];
  onSelectArticle: (article: Article | OpinionPiece) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  opinionPieces,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredArticles = articles.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.summary.toLowerCase().includes(query.toLowerCase()) ||
    a.byline.toLowerCase().includes(query.toLowerCase())
  );

  const filteredOpinions = opinionPieces.filter((o) =>
    o.title.toLowerCase().includes(query.toLowerCase()) ||
    o.author.toLowerCase().includes(query.toLowerCase()) ||
    o.summary.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs pt-16 sm:pt-24 px-4 font-sans">
      <div className="bg-white border border-nyt max-w-2xl w-full rounded-sm shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-nyt flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search articles, opinion, correspondents, topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base font-serif outline-none placeholder:font-sans placeholder:text-neutral-400"
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-100 rounded text-neutral-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {query.trim() === '' ? (
            <div className="text-xs text-nyt-grayMid space-y-3 py-4">
              <span className="font-bold uppercase tracking-wider text-black block">Suggested Topics</span>
              <div className="flex flex-wrap gap-2">
                {['Trump Administration', 'White House Briefings', 'Trade Tariffs', 'European Union', 'AI Technology', 'Financial Crime'].map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setQuery(topic)}
                    className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 rounded text-neutral-800 cursor-pointer"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {filteredArticles.length === 0 && filteredOpinions.length === 0 ? (
                <div className="py-8 text-center text-sm text-neutral-500 font-serif">
                  No articles found matching “{query}”. Try another search term.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredArticles.map((article) => (
                    <div
                      key={article.id}
                      onClick={() => {
                        onSelectArticle(article);
                        onClose();
                      }}
                      className="p-3 hover:bg-neutral-50 rounded border border-transparent hover:border-nyt transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-nyt-grayMid mb-1">
                        <span>{article.section}</span>
                        <span>·</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h4 className="font-serif font-bold text-base group-hover:text-nyt-blue text-nyt-black leading-snug">
                        {article.title}
                      </h4>
                      <p className="font-serif text-xs text-nyt-grayDark line-clamp-1 mt-1">
                        {article.summary}
                      </p>
                    </div>
                  ))}

                  {filteredOpinions.map((opinion) => (
                    <div
                      key={opinion.id}
                      onClick={() => {
                        onSelectArticle(opinion);
                        onClose();
                      }}
                      className="p-3 hover:bg-neutral-50 rounded border border-transparent hover:border-nyt transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-nyt-grayMid mb-1">
                        <span>OPINION</span>
                        <span>·</span>
                        <span>{opinion.author}</span>
                      </div>
                      <h4 className="font-serif font-bold text-base group-hover:text-nyt-blue text-nyt-black leading-snug">
                        {opinion.title}
                      </h4>
                      <p className="font-serif text-xs text-nyt-grayDark line-clamp-1 mt-1">
                        {opinion.summary}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
