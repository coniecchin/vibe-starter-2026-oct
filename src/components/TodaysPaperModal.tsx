import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, FileText, Download } from 'lucide-react';
import { MAIN_STORY, SIDE_ARTICLES, SPLIT_ARTICLES, Article, OpinionPiece } from '../data/newsData';

interface TodaysPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const TodaysPaperModal: React.FC<TodaysPaperModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle
}) => {
  const [activeSection, setActiveSection] = useState<'A' | 'B' | 'Opinion'>('A');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 font-sans">
      <div className="bg-[#fbf9f5] border border-stone-300 max-w-4xl w-full rounded-sm shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-300 bg-white">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500 block">Print Edition Facsimile</span>
            <h2 className="font-serif font-bold text-2xl text-stone-900">Today’s Paper · Oct 15, 2025</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-stone-100 rounded text-stone-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-stone-100 border-b border-stone-300 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveSection('A')}
            className={`px-3 py-1.5 rounded cursor-pointer ${activeSection === 'A' ? 'bg-white shadow-xs text-black' : 'text-stone-600 hover:text-black'}`}
          >
            Section A: Front Page & National
          </button>
          <button
            onClick={() => setActiveSection('B')}
            className={`px-3 py-1.5 rounded cursor-pointer ${activeSection === 'B' ? 'bg-white shadow-xs text-black' : 'text-stone-600 hover:text-black'}`}
          >
            Section B: Business & Tech
          </button>
          <button
            onClick={() => setActiveSection('Opinion')}
            className={`px-3 py-1.5 rounded cursor-pointer ${activeSection === 'Opinion' ? 'bg-white shadow-xs text-black' : 'text-stone-600 hover:text-black'}`}
          >
            Section A18: The Opinion Pages
          </button>
        </div>

        {/* Paper Pages Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeSection === 'A' && (
            <div className="space-y-6">
              <div className="border border-stone-300 p-4 bg-white rounded-xs space-y-3">
                <span className="text-[11px] font-mono text-stone-500 font-bold uppercase">PAGE A1 · FRONT PAGE</span>
                <div
                  onClick={() => {
                    onSelectArticle(MAIN_STORY);
                    onClose();
                  }}
                  className="cursor-pointer group"
                >
                  <h3 className="font-serif font-bold text-2xl group-hover:text-nyt-blue">
                    {MAIN_STORY.title}
                  </h3>
                  <p className="font-serif text-sm text-stone-700 mt-1">{MAIN_STORY.summary}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SIDE_ARTICLES.map((article, idx) => (
                  <div
                    key={article.id}
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="border border-stone-300 p-4 bg-white rounded-xs space-y-1.5 cursor-pointer group"
                  >
                    <span className="text-[10px] font-mono text-stone-400">PAGE A{idx + 3}</span>
                    <h4 className="font-serif font-bold text-lg group-hover:text-nyt-blue">{article.title}</h4>
                    <p className="font-serif text-xs text-stone-600 line-clamp-2">{article.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'B' && (
            <div className="space-y-4">
              <span className="text-[11px] font-mono text-stone-500 font-bold uppercase">SECTION B · BUSINESS DAY</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SPLIT_ARTICLES.map((article, idx) => (
                  <div
                    key={article.id}
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="border border-stone-300 p-4 bg-white rounded-xs space-y-2 cursor-pointer group"
                  >
                    <span className="text-[10px] font-mono text-stone-400">PAGE B{idx + 1}</span>
                    <h4 className="font-serif font-bold text-lg group-hover:text-nyt-blue">{article.title}</h4>
                    <p className="font-serif text-xs text-stone-600">{article.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'Opinion' && (
            <div className="border border-stone-300 p-6 bg-white space-y-4">
              <span className="text-[11px] font-mono text-stone-500 font-bold uppercase">PAGE A18 · EDITORIAL DESK</span>
              <h3 className="font-serif font-bold text-2xl">The Opinion Columns</h3>
              <p className="font-serif text-sm text-stone-700 leading-relaxed">
                Featuring columns by Pamela Paul on modern work cadence, and Ezra Klein on procedural state gridlock in clean energy deployment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
