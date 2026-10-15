import React from 'react';
import { Play, Pause, X, Maximize2, Headphones } from 'lucide-react';
import { PodcastEpisode } from '../data/newsData';

interface DockedAudioBarProps {
  episode: PodcastEpisode;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onOpenModal: () => void;
  onClose: () => void;
}

export const DockedAudioBar: React.FC<DockedAudioBarProps> = ({
  episode,
  isPlaying,
  onTogglePlay,
  onOpenModal,
  onClose
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-nyt shadow-2xl px-4 py-2.5 font-sans">
      <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Episode info */}
        <div className="flex items-center gap-3 overflow-hidden cursor-pointer" onClick={onOpenModal}>
          <div className="w-10 h-10 bg-black text-white rounded flex items-center justify-center shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div className="truncate">
            <span className="text-[10px] font-bold uppercase tracking-wider text-nyt-grayMid block truncate">
              {episode.show} · {episode.host}
            </span>
            <span className="font-serif font-bold text-sm text-nyt-black truncate block hover:underline">
              {episode.title}
            </span>
          </div>
        </div>

        {/* Center: Play/Pause button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onTogglePlay}
            className="w-10 h-10 rounded-full bg-black text-white hover:bg-neutral-800 flex items-center justify-center shadow-sm cursor-pointer transition-transform active:scale-95"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>
        </div>

        {/* Right: Expand and Close */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenModal}
            className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 cursor-pointer text-xs font-semibold hidden sm:flex items-center gap-1"
            title="Expand player"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Expand</span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-100 rounded text-neutral-500 cursor-pointer"
            title="Close player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
