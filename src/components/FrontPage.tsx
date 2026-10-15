import React from 'react';
import { Bookmark, Search, Headphones } from 'lucide-react';
import { 
  MAIN_STORY, 
  SIDE_ARTICLES, 
  SPLIT_ARTICLES, 
  OPINION_PIECES, 
  COOKING_SPOTLIGHT, 
  PODCAST_EPISODE,
  MARKET_DATA, 
  TRENDING_TOPICS, 
  EDITIONS, 
  SECTIONS,
  Article,
  OpinionPiece
} from '../data/newsData';

interface FrontPageProps {
  onOpenArticle: (article: Article | OpinionPiece) => void;
  onOpenSection: (section: string) => void;
  onOpenGame: (gameId: 'wordle' | 'mini' | 'connections' | 'spelling-bee') => void;
  onOpenCooking: () => void;
  onOpenAudio: () => void;
  onOpenSearch: () => void;
  onOpenTodaysPaper: () => void;
  onOpenSubscribe: () => void;
  onOpenAuth: () => void;
  onOpenBookmarks: () => void;
  bookmarkedCount: number;
  activeEdition: string;
  onSelectEdition: (edition: string) => void;
  isSubscribed: boolean;
  isLoggedIn: boolean;
  userEmail: string;
}

export const FrontPage: React.FC<FrontPageProps> = ({
  onOpenArticle,
  onOpenSection,
  onOpenGame,
  onOpenCooking,
  onOpenAudio,
  onOpenSearch,
  onOpenTodaysPaper,
  onOpenSubscribe,
  onOpenAuth,
  onOpenBookmarks,
  bookmarkedCount,
  activeEdition,
  onSelectEdition,
  isSubscribed,
  isLoggedIn,
  userEmail
}) => {
  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* BEGIN: MainHeader */}
      <header className="pt-2">
        {/* Utility Bar: Search, Edition, Date, Subscriptions */}
        <div className="flex items-center justify-between text-xs py-1 border-b border-nyt">
          {/* Left: Search & Sections */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-1.5 hover:opacity-75 transition-opacity cursor-pointer"
              title="Search"
            >
              <svg className="w-3.5 h-3.5 text-nyt-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
              <span className="font-bold uppercase tracking-wider text-[11px] hidden sm:inline">Search</span>
            </button>
            <div className="hidden md:flex items-center space-x-2 text-nyt-grayDark">
              <span className="font-medium">Wednesday, October 15, 2025</span>
              <span className="text-nyt-border">|</span>
              <button onClick={onOpenTodaysPaper} className="hover:underline cursor-pointer font-medium">
                Today’s Paper
              </button>
            </div>
          </div>

          {/* Center: Editions Switcher */}
          <div className="hidden lg:flex items-center space-x-3 text-[11px] font-semibold text-nyt-grayDark tracking-wide">
            {EDITIONS.map((ed) => (
              <button
                key={ed}
                onClick={() => onSelectEdition(ed)}
                className={`transition-colors cursor-pointer ${
                  activeEdition === ed
                    ? 'text-black font-bold border-b border-black'
                    : 'hover:text-black'
                }`}
              >
                {ed}
              </button>
            ))}
          </div>

          {/* Right: CTA, Bookmarks & User Auth */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenBookmarks}
              className="relative p-1.5 text-nyt-black hover:opacity-75 transition-opacity cursor-pointer mr-1"
              title="Saved Articles"
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              {bookmarkedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-nyt-black text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                  {bookmarkedCount}
                </span>
              )}
            </button>

            {isSubscribed ? (
              <span className="bg-neutral-100 text-neutral-800 text-[11px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider border border-neutral-300">
                Subscriber
              </span>
            ) : (
              <button
                onClick={onOpenSubscribe}
                className="bg-nyt-blue hover:bg-nyt-blueDark text-white text-[11px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                Subscribe for $1/week
              </button>
            )}

            <button
              onClick={onOpenAuth}
              className="border border-nyt-black hover:bg-neutral-50 text-nyt-black text-[11px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider transition-colors cursor-pointer"
            >
              {isLoggedIn ? 'Account' : 'Log In'}
            </button>
          </div>
        </div>

        {/* Masthead Logo */}
        <div className="py-5 text-center border-b border-nyt">
          <h1
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-serif tracking-tight font-extrabold select-none hover:opacity-95 transition-opacity cursor-pointer"
          >
            The New York Times
          </h1>
        </div>

        {/* Primary Horizontal Navigation Bar */}
        <nav aria-label="Section Navigation" className="border-b border-double-nyt py-2.5 overflow-x-auto scrollbar-none">
          <ul className="flex items-center justify-between min-w-[760px] text-[12px] font-semibold text-nyt-black tracking-normal px-2">
            {SECTIONS.map((sec) => (
              <li key={sec}>
                <button
                  onClick={() => onOpenSection(sec)}
                  className="hover:underline decoration-1 underline-offset-4 cursor-pointer whitespace-nowrap"
                >
                  {sec}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Subheader / Market & Trending Sub-bar */}
        <div className="flex items-center justify-between text-[11px] py-1.5 border-b border-nyt text-nyt-grayDark">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-nyt-black uppercase tracking-wider">Markets:</span>
            {MARKET_DATA.map((item, idx) => (
              <React.Fragment key={item.symbol}>
                {idx > 0 && <span className="text-neutral-300">·</span>}
                <span>
                  {item.symbol}{' '}
                  <strong className={`${item.isPositive ? 'text-emerald-700' : 'text-rose-700'} font-semibold`}>
                    {item.isPositive ? item.change : item.value}
                  </strong>
                </span>
              </React.Fragment>
            ))}
          </div>
          <div className="hidden sm:flex items-center space-x-3 text-nyt-grayMid">
            <span>Trending:</span>
            {TRENDING_TOPICS.slice(0, 3).map((topic, idx) => (
              <React.Fragment key={topic}>
                {idx > 0 && <span className="text-neutral-300">·</span>}
                <button onClick={onOpenSearch} className="hover:underline hover:text-black cursor-pointer">
                  {topic}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </header>
      {/* END: MainHeader */}

      {/* BEGIN: MainEditorialContent */}
      <main className="mt-4 pb-12">
        {/* 3-Column Newspaper Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-nyt">
          {/* ==================== LEFT COLUMN: Breaking News & Secondary Leads (3 Cols) ==================== */}
          <div className="lg:col-span-3 lg:pr-6 pb-6 lg:pb-0 space-y-6">
            {/* Article 1: Lead Side Story */}
            <article 
              onClick={() => onOpenArticle(SIDE_ARTICLES[0])}
              className="space-y-2 group cursor-pointer"
            >
              <span className="text-[11px] font-bold text-nyt-liveRed tracking-widest uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-nyt-liveRed animate-pulse"></span>
                Live Updates
              </span>
              <h2 className="headline-secondary text-[21px] group-hover:text-nyt-grayMid transition-colors">
                {SIDE_ARTICLES[0].title}
              </h2>
              <p className="summary-text text-sm text-nyt-grayDark">
                {SIDE_ARTICLES[0].summary}
              </p>
              <div className="text-[11px] text-nyt-grayMid pt-1 flex items-center justify-between">
                <span>{SIDE_ARTICLES[0].readTime}</span>
                <span>{SIDE_ARTICLES[0].timeAgo}</span>
              </div>
            </article>

            <hr className="border-nyt" />

            {/* Article 2: Political Analysis */}
            <article 
              onClick={() => onOpenArticle(SIDE_ARTICLES[1])}
              className="space-y-2 group cursor-pointer"
            >
              <span className="text-[11px] font-bold text-nyt-grayDark tracking-wider uppercase">Political Memo</span>
              <h3 className="headline-secondary text-[18px] group-hover:text-nyt-grayMid transition-colors">
                {SIDE_ARTICLES[1].title}
              </h3>
              <p className="summary-text text-xs text-nyt-grayDark">
                {SIDE_ARTICLES[1].summary}
              </p>
              <div className="text-[11px] text-nyt-grayMid pt-1">
                By <span className="font-medium text-nyt-black">Maggie Haberman</span>
              </div>
            </article>

            <hr className="border-nyt" />

            {/* Article 3: Diplomatic Wire */}
            <article 
              onClick={() => onOpenArticle(SIDE_ARTICLES[2])}
              className="space-y-2 group cursor-pointer"
            >
              <h3 className="headline-secondary text-[17px] group-hover:text-nyt-grayMid transition-colors">
                {SIDE_ARTICLES[2].title}
              </h3>
              <p className="summary-text text-xs text-nyt-grayDark">
                {SIDE_ARTICLES[2].summary}
              </p>
              <span className="text-[11px] text-nyt-grayMid block">{SIDE_ARTICLES[2].readTime}</span>
            </article>

            <hr className="border-nyt" />

            {/* Small Promo Module: The Daily Podcast */}
            <div 
              onClick={onOpenAudio}
              className="bg-[#f7f7f7] p-4 border border-nyt space-y-2 cursor-pointer hover:border-black transition-colors" 
              data-purpose="audio-promo"
            >
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-nyt-black"></span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-nyt-black">{PODCAST_EPISODE.show}</span>
              </div>
              <h4 className="headline-secondary text-[15px]">{PODCAST_EPISODE.title}</h4>
              <div className="flex items-center justify-between pt-1 text-xs">
                <button className="flex items-center space-x-1.5 text-xs font-semibold text-nyt-black hover:opacity-75 cursor-pointer">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path>
                  </svg>
                  <span>Listen · {PODCAST_EPISODE.duration}</span>
                </button>
              </div>
            </div>
          </div>

          {/* ==================== CENTER COLUMN: Major Top Story & Visual Anchor (6 Cols) ==================== */}
          <div className="lg:col-span-6 lg:px-6 pt-6 lg:pt-0 pb-6 lg:pb-0 space-y-6">
            {/* Center Top Headline Header */}
            <div 
              onClick={() => onOpenArticle(MAIN_STORY)}
              className="text-center space-y-2 max-w-2xl mx-auto cursor-pointer"
            >
              <span className="text-[11px] font-bold uppercase tracking-widest text-nyt-grayDark">Special Report</span>
              <h2 className="headline-lead text-3xl sm:text-4xl lg:text-[42px] hover:text-nyt-grayDark transition-colors">
                {MAIN_STORY.title}
              </h2>
              <p className="text-[16px] sm:text-[18px] summary-text text-nyt-grayDark pt-1">
                {MAIN_STORY.summary}
              </p>
            </div>

            {/* Featured Center Editorial Image Container */}
            <figure className="space-y-2">
              <div 
                onClick={() => onOpenArticle(MAIN_STORY)}
                className="w-full bg-[#f2f2f2] border border-nyt overflow-hidden cursor-pointer"
              >
                <img 
                  alt={MAIN_STORY.imageCaption} 
                  className="w-full h-auto object-cover max-h-[460px] object-top hover:scale-[1.01] transition-transform duration-300" 
                  src={MAIN_STORY.imageUrl}
                  referrerPolicy="no-referrer"
                />
              </div>
              <figcaption className="flex justify-between items-baseline text-[11px] text-nyt-grayMid border-b border-nyt pb-2">
                <span>{MAIN_STORY.imageCaption}</span>
                <span className="shrink-0 ml-4 font-mono">{MAIN_STORY.imageCredit}</span>
              </figcaption>
            </figure>

            {/* Key Takeaways / Narrative List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {MAIN_STORY.keyPoints?.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <h4 className="headline-secondary text-[16px]">{item.title}</h4>
                  <p className="summary-text text-xs text-nyt-grayDark">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <hr className="border-nyt" />

            {/* Secondary Horizontal Split Feature */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
              {SPLIT_ARTICLES.map((article) => (
                <article 
                  key={article.id}
                  onClick={() => onOpenArticle(article)}
                  className="space-y-2 group cursor-pointer"
                >
                  <h3 className="headline-secondary text-[18px] group-hover:text-nyt-grayMid transition-colors">
                    {article.title}
                  </h3>
                  <p className="summary-text text-xs text-nyt-grayDark">
                    {article.summary}
                  </p>
                  <span className="text-[11px] text-nyt-grayMid block">{article.readTime}</span>
                </article>
              ))}
            </div>
          </div>

          {/* ==================== RIGHT COLUMN: Opinion & NYT Modules (3 Cols) ==================== */}
          <div className="lg:col-span-3 lg:pl-6 pt-6 lg:pt-0 space-y-6">
            {/* Section Label: Opinion */}
            <div className="border-b border-nyt pb-1 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-nyt-black">Opinion</h3>
              <button 
                onClick={() => onOpenSection('Opinion')}
                className="text-[11px] text-nyt-grayMid hover:underline cursor-pointer"
              >
                Explore Opinion →
              </button>
            </div>

            {/* Opinion Columnists */}
            {OPINION_PIECES.map((piece, idx) => (
              <React.Fragment key={piece.id}>
                {idx > 0 && <hr className="border-nyt" />}
                <article 
                  onClick={() => onOpenArticle(piece)}
                  className="space-y-2 group cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-200 border border-nyt flex items-center justify-center font-serif text-sm font-bold text-nyt-grayDark">
                      {piece.initials}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-nyt-black uppercase tracking-wider">{piece.author}</p>
                      <p className="text-[11px] text-nyt-grayMid">{piece.role}</p>
                    </div>
                  </div>
                  <h4 className="headline-opinion text-[17px] group-hover:text-nyt-grayMid transition-colors">
                    {piece.title}
                  </h4>
                  <p className="summary-text text-xs text-nyt-grayDark">
                    {piece.summary}
                  </p>
                </article>
              </React.Fragment>
            ))}

            <hr className="border-nyt" />

            {/* NYT Games Showcase Box */}
            <div className="border border-nyt p-3.5 bg-neutral-50 rounded-sm space-y-3" data-purpose="nyt-games-widget">
              <div className="flex items-center justify-between border-b border-nyt pb-2">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 bg-black rounded-xs"></span>
                  <span className="text-xs font-bold uppercase tracking-wider">NYT Games</span>
                </div>
                <span className="text-[10px] text-nyt-grayMid uppercase font-semibold">Play Daily</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Wordle */}
                <div
                  onClick={() => onOpenGame('wordle')}
                  className="p-2 bg-white border border-nyt rounded hover:border-black transition-colors flex items-center space-x-2 cursor-pointer"
                >
                  <span className="w-4 h-4 bg-emerald-600 rounded-sm inline-block shrink-0"></span>
                  <div>
                    <div className="font-bold">Wordle</div>
                    <div className="text-[10px] text-nyt-grayMid">Guess the 5-letter word</div>
                  </div>
                </div>
                {/* The Mini Crossword */}
                <div
                  onClick={() => onOpenGame('mini')}
                  className="p-2 bg-white border border-nyt rounded hover:border-black transition-colors flex items-center space-x-2 cursor-pointer"
                >
                  <span className="w-4 h-4 bg-blue-600 rounded-sm inline-block shrink-0"></span>
                  <div>
                    <div className="font-bold">The Mini</div>
                    <div className="text-[10px] text-nyt-grayMid">Bite-sized crossword</div>
                  </div>
                </div>
                {/* Connections */}
                <div
                  onClick={() => onOpenGame('connections')}
                  className="p-2 bg-white border border-nyt rounded hover:border-black transition-colors flex items-center space-x-2 cursor-pointer"
                >
                  <span className="w-4 h-4 bg-purple-600 rounded-sm inline-block shrink-0"></span>
                  <div>
                    <div className="font-bold">Connections</div>
                    <div className="text-[10px] text-nyt-grayMid">Group words by idea</div>
                  </div>
                </div>
                {/* Spelling Bee */}
                <div
                  onClick={() => onOpenGame('spelling-bee')}
                  className="p-2 bg-white border border-nyt rounded hover:border-black transition-colors flex items-center space-x-2 cursor-pointer"
                >
                  <span className="w-4 h-4 bg-amber-400 rounded-sm inline-block shrink-0"></span>
                  <div>
                    <div className="font-bold">Spelling Bee</div>
                    <div className="text-[10px] text-nyt-grayMid">Find 4+ letter words</div>
                  </div>
                </div>
              </div>
            </div>

            {/* NYT Cooking Spotlight Mini Module */}
            <div 
              onClick={onOpenCooking}
              className="border-t border-nyt pt-4 space-y-2 cursor-pointer hover:opacity-90 transition-opacity" 
              data-purpose="nyt-cooking-spotlight"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-nyt-grayDark">Cooking Spotlight</span>
              <h4 className="headline-secondary text-[16px] hover:underline">
                {COOKING_SPOTLIGHT.title}
              </h4>
              <p className="summary-text text-xs text-nyt-grayDark">
                {COOKING_SPOTLIGHT.summary}
              </p>
              <div className="text-[11px] text-nyt-grayMid flex items-center space-x-3 pt-0.5">
                <span>⏱ {COOKING_SPOTLIGHT.cookTime}</span>
                <span>⭐ {COOKING_SPOTLIGHT.rating} ({COOKING_SPOTLIGHT.reviewsCount.toLocaleString()})</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* END: MainEditorialContent */}

      {/* BEGIN: Footer */}
      <footer className="border-t-2 border-black pt-6 pb-12 mt-8 text-xs text-nyt-grayDark" data-purpose="site-footer">
        {/* Footer Masthead & Brand Anchor */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-nyt gap-4">
          <h2 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl font-serif font-extrabold tracking-tight cursor-pointer"
          >
            The New York Times
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-semibold">
            {['News', 'Opinion', 'Arts', 'Living', 'More'].map((item) => (
              <button 
                key={item} 
                onClick={() => onOpenSection(item === 'Living' ? 'Lifestyle' : item)}
                className="hover:underline cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        {/* Legal and Navigation Links */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-nyt-grayMid gap-4">
          <p>© 2025 The New York Times Company</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {['NYTCo', 'Contact Us', 'Accessibility', 'Work with us', 'Advertise', 'T Brand Studio', 'Your Ad Choices', 'Privacy Policy', 'Terms of Service', 'Terms of Sale', 'Site Map'].map((link) => (
              <a key={link} className="hover:underline cursor-pointer" href="#" onClick={(e) => e.preventDefault()}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
      {/* END: Footer */}
    </div>
  );
};
