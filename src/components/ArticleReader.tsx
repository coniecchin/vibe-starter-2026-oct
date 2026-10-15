import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Bookmark, Share2, Volume2, VolumeX, MessageSquare, 
  ThumbsUp, Type, Sun, Moon, Clock, Calendar, Check
} from 'lucide-react';
import { Article, OpinionPiece } from '../data/newsData';
import { PressSecretaryImage } from './EditorialImages';

interface ArticleReaderProps {
  article: Article | OpinionPiece;
  onBack: () => void;
  onOpenArticle: (article: Article | OpinionPiece) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  allArticles: Article[];
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  article,
  onBack,
  onOpenArticle,
  isBookmarked,
  onToggleBookmark,
  allArticles
}) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [readingTheme, setReadingTheme] = useState<'paper' | 'sepia' | 'dark'>('paper');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Comments state
  const [comments, setComments] = useState<Array<{ id: string; author: string; location: string; time: string; text: string; upvotes: number; userUpvoted?: boolean }>>([
    {
      id: 'c1',
      author: 'David R.',
      location: 'Washington, D.C.',
      time: '2 hours ago',
      text: 'The standard of background vetting has historically protected both the administration and the public. These findings raise legitimate constitutional questions.',
      upvotes: 42
    },
    {
      id: 'c2',
      author: 'Elena Vance',
      location: 'Boston, MA',
      time: '1 hour ago',
      text: 'Remarkable reporting from Haberman and team. The detail regarding DOJ communications reveals the real internal divide between institutionalists and transition aides.',
      upvotes: 29
    }
  ]);
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');

  // Scroll listener for reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Text to Speech
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported by your browser.');
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const fullText = `${article.title}. ${article.summary}. ${article.content.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const item = {
      id: `c-${Date.now()}`,
      author: newCommentAuthor.trim() || 'Reader',
      location: 'Subscriber',
      time: 'Just now',
      text: newCommentText.trim(),
      upvotes: 1,
      userUpvoted: true
    };
    setComments([item, ...comments]);
    setNewCommentText('');
  };

  const handleUpvote = (id: string) => {
    setComments(comments.map(c => {
      if (c.id === id) {
        return {
          ...c,
          upvotes: c.userUpvoted ? c.upvotes - 1 : c.upvotes + 1,
          userUpvoted: !c.userUpvoted
        };
      }
      return c;
    }));
  };

  // Theme container classes
  const themeClasses = {
    paper: 'bg-white text-nyt-black',
    sepia: 'bg-[#fbf7ee] text-[#2c2620]',
    dark: 'bg-[#181818] text-[#e0e0e0]'
  }[readingTheme];

  const fontSizeClass = {
    normal: 'text-[17px] leading-[1.75]',
    large: 'text-[19px] leading-[1.8]',
    xlarge: 'text-[22px] leading-[1.85]'
  }[fontSize];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${themeClasses}`}>
      {/* Sticky Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50">
        <div
          className="h-full bg-nyt-black transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Reader Utility Header */}
      <header className={`sticky top-0 z-40 border-b border-nyt backdrop-blur-sm ${
        readingTheme === 'dark' ? 'bg-[#181818]/90 border-neutral-800' : readingTheme === 'sepia' ? 'bg-[#fbf7ee]/90 border-[#e8dec9]' : 'bg-white/90'
      }`}>
        <div className="max-w-[1100px] mx-auto px-4 py-2.5 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:opacity-70 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Today's Front Page</span>
          </button>

          <span className="font-serif font-bold text-lg hidden sm:inline select-none">
            The New York Times
          </span>

          {/* Reader controls */}
          <div className="flex items-center space-x-3 text-xs">
            {/* Audio Read button */}
            <button
              onClick={toggleSpeech}
              title={isSpeaking ? "Pause audio reading" : "Listen to article"}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                isSpeaking 
                  ? 'bg-nyt-blue text-white border-nyt-blue' 
                  : 'border-nyt hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span className="hidden md:inline font-medium">{isSpeaking ? 'Playing Voice' : 'Listen (4m)'}</span>
            </button>

            {/* Font size toggle */}
            <div className="hidden sm:flex items-center border border-nyt rounded overflow-hidden">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 text-[11px] font-bold cursor-pointer ${fontSize === 'normal' ? 'bg-neutral-200 dark:bg-neutral-700' : ''}`}
                title="Default text size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 text-xs font-bold cursor-pointer ${fontSize === 'large' ? 'bg-neutral-200 dark:bg-neutral-700' : ''}`}
                title="Large text size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 text-sm font-bold cursor-pointer ${fontSize === 'xlarge' ? 'bg-neutral-200 dark:bg-neutral-700' : ''}`}
                title="Extra large text size"
              >
                A++
              </button>
            </div>

            {/* Theme picker */}
            <div className="flex items-center border border-nyt rounded overflow-hidden">
              <button
                onClick={() => setReadingTheme('paper')}
                className={`px-2 py-1 text-[11px] font-medium cursor-pointer ${readingTheme === 'paper' ? 'bg-neutral-200' : ''}`}
                title="Paper white mode"
              >
                White
              </button>
              <button
                onClick={() => setReadingTheme('sepia')}
                className={`px-2 py-1 text-[11px] font-medium cursor-pointer ${readingTheme === 'sepia' ? 'bg-[#e8dec9] text-[#2c2620]' : ''}`}
                title="Sepia warm mode"
              >
                Sepia
              </button>
              <button
                onClick={() => setReadingTheme('dark')}
                className={`px-2 py-1 text-[11px] font-medium cursor-pointer ${readingTheme === 'dark' ? 'bg-neutral-700 text-white' : ''}`}
                title="Dark mode"
              >
                Dark
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-1.5 rounded border border-nyt hover:opacity-75 transition-colors cursor-pointer ${
                isBookmarked ? 'bg-neutral-900 text-white' : ''
              }`}
              title={isBookmarked ? "Remove bookmark" : "Save for later"}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded border border-nyt hover:opacity-75 transition-colors cursor-pointer relative"
              title="Share article link"
            >
              {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Article Container */}
      <main className="max-w-[760px] mx-auto px-4 py-10 sm:py-14">
        {/* Kicker & Section */}
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-nyt-grayMid mb-3">
          <span>{('section' in article ? article.section : 'OPINION')}</span>
          <span>·</span>
          <span>{'kicker' in article ? article.kicker : ('role' in article ? article.role : 'NEWS ANALYSIS')}</span>
        </div>

        {/* Grand Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold tracking-tight leading-[1.12] mb-4 text-balance">
          {article.title}
        </h1>

        {/* Deck / Summary */}
        <p className="font-serif text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-snug mb-6">
          {article.summary}
        </p>

        {/* Byline and metadata */}
        <div className="flex flex-wrap items-center justify-between text-xs border-y border-nyt py-3 mb-8 gap-3">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-neutral-900 dark:text-neutral-100">
              {'byline' in article ? article.byline : `By ${article.author}`}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-nyt-grayMid">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{article.date}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{article.readTime}</span>
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              <span>{comments.length} Comments</span>
            </span>
          </div>
        </div>

        {/* Featured Editorial Photo / Figure */}
        {'imageUrl' in article && article.imageUrl && (
          <figure className="mb-10 space-y-2">
            <div className="w-full bg-[#f2f2f2] dark:bg-neutral-800 border border-nyt overflow-hidden">
              {article.id === 'trump-press-secretary' ? (
                <div className="w-full max-h-[480px] overflow-hidden">
                  <PressSecretaryImage className="w-full h-full" />
                </div>
              ) : (
                <img
                  src={article.imageUrl}
                  alt={article.imageCaption || article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[480px] object-top"
                />
              )}
            </div>
            <figcaption className="flex flex-col sm:flex-row justify-between sm:items-baseline text-[11px] text-nyt-grayMid border-b border-nyt pb-2 gap-1 font-sans">
              <span>{article.imageCaption}</span>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider">{article.imageCredit}</span>
            </figcaption>
          </figure>
        )}

        {/* Key Takeaways (if present) */}
        {'keyPoints' in article && article.keyPoints && (
          <div className="my-8 p-5 bg-neutral-50 dark:bg-neutral-900 border border-nyt rounded-sm space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-nyt-black dark:text-white block">
              Key Takeaways
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {article.keyPoints.map((pt, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-neutral-900 dark:text-neutral-100">{pt.title}</h4>
                  <p className="font-serif text-xs text-neutral-600 dark:text-neutral-400">{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Body Narrative with Drop Cap */}
        <div className={`space-y-6 font-serif ${fontSizeClass}`}>
          {article.content.map((paragraph, idx) => (
            <p
              key={idx}
              className={
                idx === 0
                  ? "first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none text-neutral-900 dark:text-neutral-100"
                  : "text-neutral-800 dark:text-neutral-200"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Pull Quote Editorial Element */}
        <div className="my-10 py-6 border-y border-neutral-300 dark:border-neutral-700 text-center px-4">
          <blockquote className="font-serif italic text-xl sm:text-2xl text-neutral-800 dark:text-neutral-200 leading-snug">
            “In an administration moving at breakneck speed, the boundary between standard communications and formal counsel becomes the battleground of executive credibility.”
          </blockquote>
          <cite className="block text-xs uppercase tracking-wider text-nyt-grayMid mt-3 font-sans font-semibold">
            The New York Times Investigative Desk
          </cite>
        </div>

        {/* Reader Comments Section */}
        <section className="mt-16 pt-8 border-t-2 border-black dark:border-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-2xl">Reader Comments</h3>
              <span className="text-xs bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 rounded font-mono font-bold">
                {comments.length}
              </span>
            </div>
            <span className="text-xs text-nyt-grayMid">Moderated Discussion</span>
          </div>

          {/* Add a Comment Form */}
          <form onSubmit={handleAddComment} className="mb-8 p-4 bg-neutral-50 dark:bg-neutral-900 border border-nyt rounded-sm space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your Name or Pen Name"
                value={newCommentAuthor}
                onChange={(e) => setNewCommentAuthor(e.target.value)}
                className="text-xs p-2.5 border border-nyt rounded bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white outline-none focus:border-black"
              />
            </div>
            <textarea
              rows={3}
              placeholder="What are your thoughts on this story? The Times welcomes civil, articulate discourse."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="w-full text-xs p-2.5 border border-nyt rounded bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white outline-none focus:border-black resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-nyt-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Submit Comment
              </button>
            </div>
          </form>

          {/* Comment list */}
          <div className="space-y-4 divide-y divide-nyt">
            {comments.map((comment) => (
              <div key={comment.id} className="pt-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-neutral-900 dark:text-white">{comment.author}</span>
                    <span className="text-nyt-grayMid ml-2">{comment.location} · {comment.time}</span>
                  </div>
                  <button
                    onClick={() => handleUpvote(comment.id)}
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded border border-nyt transition-colors cursor-pointer ${
                      comment.userUpvoted ? 'bg-blue-50 text-nyt-blue border-blue-200 font-bold' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{comment.upvotes}</span>
                  </button>
                </div>
                <p className="font-serif text-sm text-neutral-700 dark:text-neutral-300">
                  {comment.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Stories Grid */}
        <section className="mt-16 pt-8 border-t border-nyt">
          <h3 className="text-xs font-bold uppercase tracking-widest text-nyt-black dark:text-white mb-6">
            More in This Section
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {allArticles
              .filter((a) => a.id !== article.id)
              .slice(0, 4)
              .map((item) => (
                <article
                  key={item.id}
                  onClick={() => onOpenArticle(item)}
                  className="space-y-2 group cursor-pointer border-t border-neutral-200 dark:border-neutral-800 pt-3"
                >
                  <span className="text-[10px] font-bold uppercase text-nyt-grayMid tracking-wider">
                    {item.section}
                  </span>
                  <h4 className="font-serif font-bold text-base group-hover:text-nyt-blue transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="font-serif text-xs text-nyt-grayDark line-clamp-2">
                    {item.summary}
                  </p>
                  <span className="text-[10px] text-nyt-grayMid block">{item.readTime}</span>
                </article>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};
