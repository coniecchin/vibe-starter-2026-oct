import React from 'react';
import { ArrowLeft, MessageSquare, ThumbsUp } from 'lucide-react';
import { OPINION_PIECES, OpinionPiece } from '../data/newsData';

interface OpinionScreenProps {
  onBack: () => void;
  onSelectOpinion: (opinion: OpinionPiece) => void;
}

export const OpinionScreen: React.FC<OpinionScreenProps> = ({ onBack, onSelectOpinion }) => {
  return (
    <div className="max-w-[1100px] mx-auto px-4 py-8 font-sans">
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-nyt">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-nyt-black hover:text-nyt-blue transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Front Page</span>
        </button>
        <span className="text-xs font-bold uppercase tracking-widest text-nyt-black">Opinion Desk</span>
      </div>

      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <h1 className="text-4xl sm:text-5xl font-serif font-extrabold tracking-tight">The Opinion Pages</h1>
        <p className="font-serif text-base text-neutral-600">
          Independent commentary, philosophical inquiry, and debate from Times columnists and guest essayists.
        </p>
      </div>

      {/* Grid of Columnists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-nyt border-y border-nyt py-8">
        {OPINION_PIECES.map((piece, idx) => (
          <div
            key={piece.id}
            onClick={() => onSelectOpinion(piece)}
            className={`space-y-4 cursor-pointer group ${idx > 0 ? 'md:pl-8 pt-6 md:pt-0' : ''}`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-neutral-200 border border-nyt flex items-center justify-center font-serif text-base font-bold text-nyt-grayDark group-hover:bg-neutral-300 transition-colors">
                {piece.initials}
              </div>
              <div>
                <h3 className="text-sm font-bold text-nyt-black uppercase tracking-wider">{piece.author}</h3>
                <p className="text-xs text-nyt-grayMid">{piece.role}</p>
              </div>
            </div>

            <h2 className="headline-opinion text-2xl group-hover:text-nyt-blue transition-colors leading-snug">
              {piece.title}
            </h2>

            <p className="summary-text text-sm text-nyt-grayDark">
              {piece.summary}
            </p>

            <div className="flex items-center justify-between text-xs text-nyt-grayMid pt-2">
              <span>{piece.readTime}</span>
              <span className="flex items-center gap-1 font-sans">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{piece.commentsCount} comments</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Letters to the Editor */}
      <section className="mt-12 p-6 bg-neutral-50 border border-nyt rounded-sm space-y-4">
        <div className="flex items-center justify-between border-b border-nyt pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-black">Letters to the Editor</h3>
          <span className="text-xs text-nyt-grayMid">Selected Dispatches</span>
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-sm">On the Question of Work and Burnout</h4>
            <p className="font-serif text-xs text-neutral-600">
              “Pamela Paul captures the psychic weight of modern hyper-communication. As a public school educator, the erosion of distinct boundaries between work and restorative solitude has become acute...”
            </p>
            <span className="text-[10px] text-nyt-grayMid block">— Miriam Klein, Oak Park, Ill.</span>
          </div>
        </div>
      </section>
    </div>
  );
};
