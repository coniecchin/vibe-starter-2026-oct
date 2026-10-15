import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';

interface BreakingNewsBannerProps {
  onSelectStory: () => void;
}

export const BreakingNewsBanner: React.FC<BreakingNewsBannerProps> = ({ onSelectStory }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="bg-[#fcf8f8] border-b border-[#f2dada] py-1.5 px-4 text-xs font-sans">
      <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-3">
        <div 
          onClick={onSelectStory}
          className="flex items-center gap-2 cursor-pointer group truncate"
        >
          <span className="flex items-center gap-1 font-bold text-nyt-liveRed tracking-wider uppercase text-[11px] shrink-0">
            <span className="w-2 h-2 rounded-full bg-nyt-liveRed animate-ping"></span>
            <span>Breaking</span>
          </span>
          <span className="text-neutral-300">|</span>
          <span className="text-neutral-500 text-[11px] shrink-0">4m ago</span>
          <span className="font-serif font-semibold text-neutral-900 group-hover:text-nyt-blue truncate underline-offset-2 group-hover:underline">
            Federal Reserve signals pause on benchmark rate decisions following jobs data revision
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black shrink-0 hidden sm:inline" />
        </div>

        <button
          onClick={() => setIsDismissed(true)}
          className="p-0.5 text-neutral-400 hover:text-neutral-700 rounded cursor-pointer shrink-0"
          title="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
