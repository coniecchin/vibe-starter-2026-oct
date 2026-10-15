import React, { useState, useEffect } from 'react';
import { Bookmark, Share2, ArrowUp, Search } from 'lucide-react';

interface StickyReaderBarProps {
  onOpenSearch: () => void;
  onOpenSubscribe: () => void;
  onOpenBookmarks: () => void;
  bookmarkedCount: number;
  isSubscribed: boolean;
  currentHeadline?: string;
  onScrollToTop: () => void;
}

export const StickyReaderBar: React.FC<StickyReaderBarProps> = ({
  onOpenSearch,
  onOpenSubscribe,
  onOpenBookmarks,
  bookmarkedCount,
  isSubscribed,
  currentHeadline = "Trump’s New Press Secretary: Not Quite Attorney at Law",
  onScrollToTop
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear once user scrolls past top masthead (~220px)
      if (window.scrollY > 220) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-nyt shadow-xs transition-all duration-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center justify-between text-xs">
        {/* Left: Mini NYT Logo */}
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={onScrollToTop}
            className="font-serif font-extrabold text-base tracking-tight hover:opacity-75 transition-opacity cursor-pointer flex items-center gap-1.5"
            title="Back to Top"
          >
            <span>The New York Times</span>
          </button>
          <span className="text-neutral-300 hidden md:inline">|</span>
          <span className="text-neutral-500 font-semibold uppercase text-[10px] tracking-wider hidden md:inline">
            Today's Briefing
          </span>
        </div>

        {/* Center: Truncated Current Top Story */}
        <div className="hidden lg:block truncate max-w-md xl:max-w-xl text-center px-4">
          <span
            onClick={onScrollToTop}
            className="font-serif font-semibold text-neutral-800 hover:underline cursor-pointer truncate block text-sm"
          >
            {currentHeadline}
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={onOpenSearch}
            className="p-1.5 hover:bg-neutral-100 rounded text-neutral-700 cursor-pointer"
            title="Search"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenBookmarks}
            className="relative p-1.5 hover:bg-neutral-100 rounded text-neutral-700 cursor-pointer"
            title="Saved Articles"
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            {bookmarkedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-black text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                {bookmarkedCount}
              </span>
            )}
          </button>

          {!isSubscribed && (
            <button
              onClick={onOpenSubscribe}
              className="bg-nyt-blue hover:bg-nyt-blueDark text-white text-[11px] font-bold px-2.5 py-1 rounded-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Subscribe
            </button>
          )}

          <button
            onClick={onScrollToTop}
            className="p-1.5 hover:bg-neutral-100 rounded text-neutral-500 cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
