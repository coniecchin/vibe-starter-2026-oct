import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { Article, OpinionPiece } from '../data/newsData';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedIds: string[];
  allArticles: Article[];
  opinionPieces: OpinionPiece[];
  onSelectArticle: (article: Article | OpinionPiece) => void;
  onRemoveBookmark: (id: string) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedIds,
  allArticles,
  opinionPieces,
  onSelectArticle,
  onRemoveBookmark
}) => {
  if (!isOpen) return null;

  const savedItems = [
    ...allArticles.filter((a) => bookmarkedIds.includes(a.id)),
    ...opinionPieces.filter((o) => bookmarkedIds.includes(o.id))
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs font-sans">
      <div className="bg-white border-l border-nyt w-full max-w-md h-full flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="p-4 border-b border-nyt flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 fill-current text-nyt-black" />
            <h3 className="font-serif font-bold text-lg">Saved Articles</h3>
            <span className="text-xs bg-neutral-200 px-2 py-0.5 rounded font-mono font-bold">
              {savedItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-200 rounded text-neutral-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of saved articles */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-nyt">
          {savedItems.length === 0 ? (
            <div className="py-16 text-center space-y-3 text-neutral-500">
              <Bookmark className="w-8 h-8 mx-auto text-neutral-300 stroke-[1.5]" />
              <p className="font-serif text-sm">No saved articles yet.</p>
              <p className="text-xs text-neutral-400">
                Click the bookmark icon on any story to save it to your reading list.
              </p>
            </div>
          ) : (
            savedItems.map((item) => (
              <div key={item.id} className="py-4 space-y-2 group">
                <div className="flex items-start justify-between gap-2">
                  <h4
                    onClick={() => {
                      onSelectArticle(item);
                      onClose();
                    }}
                    className="font-serif font-bold text-base hover:text-nyt-blue cursor-pointer leading-snug"
                  >
                    {item.title}
                  </h4>
                  <button
                    onClick={() => onRemoveBookmark(item.id)}
                    className="text-neutral-400 hover:text-rose-600 p-1 cursor-pointer"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="font-serif text-xs text-neutral-600 line-clamp-2">
                  {item.summary}
                </p>
                <div className="flex items-center justify-between text-[10px] text-nyt-grayMid">
                  <span>{item.readTime}</span>
                  <button
                    onClick={() => {
                      onSelectArticle(item);
                      onClose();
                    }}
                    className="flex items-center gap-1 font-semibold text-black hover:underline cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
