import React from 'react';
import { ArrowLeft, Play, Pause, Headphones, Radio, Clock } from 'lucide-react';
import { PODCAST_EPISODE, PodcastEpisode } from '../data/newsData';

interface AudioScreenProps {
  onBack: () => void;
  onPlayEpisode: (episode: PodcastEpisode) => void;
  isPlaying: boolean;
  activeEpisodeId?: string;
}

export const AudioScreen: React.FC<AudioScreenProps> = ({
  onBack,
  onPlayEpisode,
  isPlaying,
  activeEpisodeId
}) => {
  const episodes: PodcastEpisode[] = [
    PODCAST_EPISODE,
    {
      id: 'hard-fork-ai-forensics',
      title: 'Hard Fork: The Algorithmic Detectives Hunting Offshore Billions',
      show: 'Hard Fork',
      host: 'Kevin Roose and Casey Newton',
      duration: '42 min',
      durationSeconds: 2520,
      date: 'Tuesday, October 14, 2025',
      summary: 'How federal investigators and private forensic labs are using generative models to uncover shell company networks in minutes.',
      keyTimestamps: [
        { time: '00:00', label: 'Intro' },
        { time: '15:20', label: 'The FinCEN Leaks vs AI' },
        { time: '35:00', label: 'Hat Hat Hat' }
      ]
    },
    {
      id: 'the-interview-ezra',
      title: 'The Interview: Why Building Infrastructure Became America’s Hardest Task',
      show: 'The Ezra Klein Show',
      host: 'Ezra Klein',
      duration: '56 min',
      durationSeconds: 3360,
      date: 'Monday, October 13, 2025',
      summary: 'A deep, systemic dive into environmental permitting laws, NEPA litigation, and why clean energy requires a new progressive abundance agenda.',
      keyTimestamps: [
        { time: '00:00', label: 'Permitting Reform 101' },
        { time: '20:15', label: 'The NEPA Paradox' },
        { time: '48:30', label: 'Book Recommendations' }
      ]
    }
  ];

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-8 font-sans">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-nyt">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-nyt-black hover:text-nyt-blue transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Front Page</span>
        </button>
        <div className="flex items-center gap-2">
          <Headphones className="w-4 h-4 text-black" />
          <span className="text-xs font-bold uppercase tracking-widest text-nyt-black">NYT Audio</span>
        </div>
      </div>

      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <h1 className="text-4xl sm:text-5xl font-serif font-extrabold tracking-tight">Audio & Podcasts</h1>
        <p className="font-serif text-base text-neutral-600">
          Listen to investigative storytelling, daily briefings, and conversations with the people shaping the world.
        </p>
      </div>

      {/* Featured Episode Hero */}
      <div className="border border-nyt p-6 sm:p-8 bg-neutral-900 text-white rounded-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
            <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>Featured Audio Broadcast</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold leading-tight">
            {PODCAST_EPISODE.title}
          </h2>
          <p className="font-serif text-xs text-neutral-300 leading-relaxed">
            {PODCAST_EPISODE.summary}
          </p>
          <div className="text-xs text-neutral-400">
            Hosted by {PODCAST_EPISODE.host} · {PODCAST_EPISODE.duration}
          </div>
        </div>

        <button
          onClick={() => onPlayEpisode(PODCAST_EPISODE)}
          className="w-16 h-16 rounded-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center shrink-0 shadow-lg cursor-pointer transition-transform hover:scale-105"
        >
          {isPlaying && activeEpisodeId === PODCAST_EPISODE.id ? (
            <Pause className="w-7 h-7 fill-current" />
          ) : (
            <Play className="w-7 h-7 fill-current ml-1" />
          )}
        </button>
      </div>

      {/* Episode Feed */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-black border-b border-nyt pb-2">
          Recent Episodes
        </h3>
        <div className="divide-y divide-nyt">
          {episodes.map((ep) => {
            const isThisPlaying = isPlaying && activeEpisodeId === ep.id;
            return (
              <div
                key={ep.id}
                className="py-4 flex items-start justify-between gap-4 group hover:bg-neutral-50 px-2 rounded transition-colors"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-nyt-grayMid">
                    {ep.show} · {ep.date}
                  </span>
                  <h4 className="font-serif font-bold text-lg group-hover:text-nyt-blue leading-snug">
                    {ep.title}
                  </h4>
                  <p className="font-serif text-xs text-neutral-600 line-clamp-2">
                    {ep.summary}
                  </p>
                  <span className="text-[11px] text-neutral-400 block pt-1">{ep.duration}</span>
                </div>

                <button
                  onClick={() => onPlayEpisode(ep)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-nyt transition-colors cursor-pointer ${
                    isThisPlaying ? 'bg-black text-white' : 'bg-neutral-100 hover:bg-black hover:text-white'
                  }`}
                >
                  {isThisPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
