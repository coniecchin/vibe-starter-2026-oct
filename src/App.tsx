import React, { useState, useEffect } from 'react';
import { FrontPage } from './components/FrontPage';
import { ArticleReader } from './components/ArticleReader';
import { NYTGames } from './components/NYTGames';
import { CookingScreen } from './components/CookingScreen';
import { OpinionScreen } from './components/OpinionScreen';
import { AudioScreen } from './components/AudioScreen';
import { SearchModal } from './components/SearchModal';
import { TodaysPaperModal } from './components/TodaysPaperModal';
import { SubscribeModal } from './components/SubscribeModal';
import { AuthModal } from './components/AuthModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { AudioPlayerModal } from './components/AudioPlayerModal';
import { DockedAudioBar } from './components/DockedAudioBar';
import { 
  MAIN_STORY, 
  SIDE_ARTICLES, 
  SPLIT_ARTICLES, 
  OPINION_PIECES, 
  PODCAST_EPISODE,
  Article, 
  OpinionPiece,
  PodcastEpisode
} from './data/newsData';

type ScreenType = 'frontpage' | 'article' | 'games' | 'cooking' | 'opinion' | 'audio';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('frontpage');
  const [activeArticle, setActiveArticle] = useState<Article | OpinionPiece>(MAIN_STORY);
  const [activeGame, setActiveGame] = useState<'wordle' | 'mini' | 'connections' | 'spelling-bee'>('wordle');
  const [activeEdition, setActiveEdition] = useState('U.S.');

  // Bookmarks persistence
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nyt_bookmarks');
      return saved ? JSON.parse(saved) : ['trump-press-secretary'];
    } catch {
      return ['trump-press-secretary'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nyt_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      // ignore localstorage errors
    }
  }, [bookmarkedIds]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTodaysPaperOpen, setIsTodaysPaperOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // User state
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Audio Player state
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode>(PODCAST_EPISODE);
  const [showDockedAudio, setShowDockedAudio] = useState(false);

  const allArticlesList: Article[] = [MAIN_STORY, ...SIDE_ARTICLES, ...SPLIT_ARTICLES];

  // Screen handlers
  const handleOpenArticle = (article: Article | OpinionPiece) => {
    setActiveArticle(article);
    setCurrentScreen('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSection = (section: string) => {
    if (section === 'Games') {
      setActiveGame('wordle');
      setCurrentScreen('games');
    } else if (section === 'Cooking') {
      setCurrentScreen('cooking');
    } else if (section === 'Opinion') {
      setCurrentScreen('opinion');
    } else if (section === 'Audio') {
      setCurrentScreen('audio');
    } else {
      // For general sections (U.S., World, Business, Arts, Lifestyle), stay on FrontPage and scroll to top
      setCurrentScreen('frontpage');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGame = (gameId: 'wordle' | 'mini' | 'connections' | 'spelling-bee') => {
    setActiveGame(gameId);
    setCurrentScreen('games');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayEpisode = (episode: PodcastEpisode) => {
    setActiveEpisode(episode);
    setIsPlayingAudio(true);
    setShowDockedAudio(true);
  };

  return (
    <div className="min-h-screen bg-white text-nyt-black font-sans antialiased selection:bg-nyt-blue selection:text-white">
      {/* Primary Screen Views */}
      {currentScreen === 'frontpage' && (
        <FrontPage
          onOpenArticle={handleOpenArticle}
          onOpenSection={handleOpenSection}
          onOpenGame={handleOpenGame}
          onOpenCooking={() => {
            setCurrentScreen('cooking');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenAudio={() => {
            setIsAudioModalOpen(true);
            setShowDockedAudio(true);
            setIsPlayingAudio(true);
          }}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenTodaysPaper={() => setIsTodaysPaperOpen(true)}
          onOpenSubscribe={() => setIsSubscribeOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenBookmarks={() => setIsBookmarksOpen(true)}
          bookmarkedCount={bookmarkedIds.length}
          activeEdition={activeEdition}
          onSelectEdition={setActiveEdition}
          isSubscribed={isSubscribed}
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
        />
      )}

      {currentScreen === 'article' && (
        <ArticleReader
          article={activeArticle}
          onBack={() => {
            setCurrentScreen('frontpage');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenArticle={handleOpenArticle}
          isBookmarked={bookmarkedIds.includes(activeArticle.id)}
          onToggleBookmark={toggleBookmark}
          allArticles={allArticlesList}
        />
      )}

      {currentScreen === 'games' && (
        <NYTGames
          initialGame={activeGame}
          onBack={() => {
            setCurrentScreen('frontpage');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {currentScreen === 'cooking' && (
        <CookingScreen
          onBack={() => {
            setCurrentScreen('frontpage');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {currentScreen === 'opinion' && (
        <OpinionScreen
          onBack={() => {
            setCurrentScreen('frontpage');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectOpinion={(op) => {
            setActiveArticle(op);
            setCurrentScreen('article');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {currentScreen === 'audio' && (
        <AudioScreen
          onBack={() => {
            setCurrentScreen('frontpage');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onPlayEpisode={handlePlayEpisode}
          isPlaying={isPlayingAudio}
          activeEpisodeId={activeEpisode.id}
        />
      )}

      {/* Persistent Docked Audio Bar */}
      {showDockedAudio && (
        <DockedAudioBar
          episode={activeEpisode}
          isPlaying={isPlayingAudio}
          onTogglePlay={() => setIsPlayingAudio(!isPlayingAudio)}
          onOpenModal={() => setIsAudioModalOpen(true)}
          onClose={() => {
            setShowDockedAudio(false);
            setIsPlayingAudio(false);
          }}
        />
      )}

      {/* Audio Player Modal */}
      <AudioPlayerModal
        episode={activeEpisode}
        isOpen={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
        isPlaying={isPlayingAudio}
        onTogglePlay={() => setIsPlayingAudio(!isPlayingAudio)}
      />

      {/* Global Modals & Drawers */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={allArticlesList}
        opinionPieces={OPINION_PIECES}
        onSelectArticle={handleOpenArticle}
      />

      <TodaysPaperModal
        isOpen={isTodaysPaperOpen}
        onClose={() => setIsTodaysPaperOpen(false)}
        onSelectArticle={handleOpenArticle}
      />

      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
        isSubscribed={isSubscribed}
        onSubscribe={() => setIsSubscribed(true)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onLogin={(email) => {
          setIsLoggedIn(true);
          setUserEmail(email);
        }}
        onLogout={() => {
          setIsLoggedIn(false);
          setUserEmail('');
        }}
      />

      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedIds={bookmarkedIds}
        allArticles={allArticlesList}
        opinionPieces={OPINION_PIECES}
        onSelectArticle={handleOpenArticle}
        onRemoveBookmark={toggleBookmark}
      />
    </div>
  );
}
