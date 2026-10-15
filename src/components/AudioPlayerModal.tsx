import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Volume2, X, ChevronDown, ListOrdered } from 'lucide-react';
import { PODCAST_EPISODE, PodcastEpisode } from '../data/newsData';

interface AudioPlayerProps {
  episode?: PodcastEpisode;
  isOpen: boolean;
  onClose: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const AudioPlayerModal: React.FC<AudioPlayerProps> = ({
  episode = PODCAST_EPISODE,
  isOpen,
  onClose,
  isPlaying,
  onTogglePlay
}) => {
  const [currentTime, setCurrentTime] = useState(145); // simulated 2:25 into show
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [activeTab, setActiveTab] = useState<'chapters' | 'transcript'>('chapters');

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= episode.durationSeconds) {
            onTogglePlay();
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, episode.durationSeconds, onTogglePlay]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = Math.floor(secs % 60);
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const handleSkip = (seconds: number) => {
    setCurrentTime((prev) => Math.min(episode.durationSeconds, Math.max(0, prev + seconds)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white border border-nyt max-w-lg w-full rounded-sm shadow-2xl overflow-hidden font-sans">
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 border-b border-nyt bg-neutral-50">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-nyt-black animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-nyt-black">
              {episode.show} · Daily Podcast
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-200 rounded text-neutral-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Episode Info */}
        <div className="p-6 space-y-4">
          <div className="text-center space-y-2">
            <h3 className="font-serif font-bold text-2xl text-nyt-black leading-snug">
              {episode.title}
            </h3>
            <p className="text-xs text-nyt-grayMid">
              Hosted by <strong className="text-black font-semibold">{episode.host}</strong> · {episode.date}
            </p>
          </div>

          <p className="font-serif text-xs text-neutral-600 line-clamp-3 text-center px-2">
            {episode.summary}
          </p>

          {/* Scrubber timeline */}
          <div className="space-y-1.5 pt-4">
            <input
              type="range"
              min={0}
              max={episode.durationSeconds}
              value={currentTime}
              onChange={(e) => setCurrentTime(Number(e.target.value))}
              className="w-full accent-black cursor-pointer h-1.5 bg-neutral-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] font-mono text-neutral-500">
              <span>{formatTime(currentTime)}</span>
              <span>{episode.duration}</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-center space-x-6 pt-2">
            <button
              onClick={() => handleSkip(-15)}
              className="flex items-center gap-1 text-xs text-neutral-700 hover:text-black cursor-pointer"
              title="Rewind 15 seconds"
            >
              <RotateCcw className="w-4 h-4" />
              <span>15s</span>
            </button>

            <button
              onClick={onTogglePlay}
              className="w-14 h-14 rounded-full bg-black text-white hover:bg-neutral-800 flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
            </button>

            <button
              onClick={() => handleSkip(15)}
              className="flex items-center gap-1 text-xs text-neutral-700 hover:text-black cursor-pointer"
              title="Fast forward 15 seconds"
            >
              <span>15s</span>
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Speed Toggle */}
          <div className="flex justify-center items-center gap-2 pt-2 border-t border-nyt">
            <span className="text-[11px] text-nyt-grayMid font-medium">Speed:</span>
            {[0.75, 1.0, 1.25, 1.5].map((speed) => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={`text-[11px] px-2 py-0.5 rounded cursor-pointer ${
                  playbackSpeed === speed ? 'bg-black text-white font-bold' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Chapter Markers */}
          <div className="border border-nyt rounded-sm p-3 bg-neutral-50 space-y-2 mt-4 text-xs">
            <span className="font-bold uppercase tracking-wider text-neutral-800 text-[10px] block">
              Episode Chapters
            </span>
            <div className="space-y-1">
              {episode.keyTimestamps.map((ts, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const [m, s] = ts.time.split(':').map(Number);
                    setCurrentTime(m * 60 + (s || 0));
                  }}
                  className="flex items-center justify-between p-1 rounded hover:bg-white cursor-pointer transition-colors"
                >
                  <span className="text-neutral-800 font-medium">{ts.label}</span>
                  <span className="font-mono text-neutral-500 text-[11px]">{ts.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
