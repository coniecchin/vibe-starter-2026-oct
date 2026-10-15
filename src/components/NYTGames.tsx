import React, { useState } from 'react';
import { ArrowLeft, Check, RotateCcw, HelpCircle, Trophy } from 'lucide-react';

interface NYTGamesProps {
  onBack: () => void;
  initialGame?: 'wordle' | 'mini' | 'connections' | 'spelling-bee';
}

export const NYTGames: React.FC<NYTGamesProps> = ({ onBack, initialGame = 'wordle' }) => {
  const [activeTab, setActiveTab] = useState<'wordle' | 'mini' | 'connections' | 'spelling-bee'>(initialGame);

  // WORDLE STATE
  const WORD_TARGET = 'CRANE';
  const [guesses, setGuesses] = useState<string[]>(['SLATE']);
  const [currentGuess, setCurrentGuess] = useState('');
  const [wordleMessage, setWordleMessage] = useState<string | null>(null);
  const [wordleWon, setWordleWon] = useState(false);

  const handleKeyClick = (letter: string) => {
    if (wordleWon || guesses.length >= 6) return;
    if (letter === 'ENTER') {
      if (currentGuess.length !== 5) {
        setWordleMessage('Must be 5 letters');
        setTimeout(() => setWordleMessage(null), 2000);
        return;
      }
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      if (currentGuess === WORD_TARGET) {
        setWordleWon(true);
        setWordleMessage('Splendid! You solved today’s Wordle.');
      } else if (newGuesses.length === 6) {
        setWordleMessage(`The word was ${WORD_TARGET}`);
      }
      setCurrentGuess('');
    } else if (letter === 'DEL') {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + letter);
      }
    }
  };

  const getLetterState = (letter: string, index: number, target: string) => {
    if (target[index] === letter) return 'bg-[#6aaa64] text-white border-[#6aaa64]';
    if (target.includes(letter)) return 'bg-[#c9b458] text-white border-[#c9b458]';
    return 'bg-[#787c7e] text-white border-[#787c7e]';
  };

  // MINI CROSSWORD STATE
  const [miniGrid, setMiniGrid] = useState<string[][]>([
    ['N', 'E', 'W', 'S', '#'],
    ['Y', 'O', 'R', 'K', 'T'],
    ['T', 'I', 'M', 'E', 'S'],
    ['P', 'A', 'P', 'E', 'R'],
    ['#', 'L', 'I', 'V', 'E']
  ]);
  const [userMini, setUserMini] = useState<string[][]>([
    ['N', 'E', '', '', '#'],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['#', '', '', '', '']
  ]);
  const [selectedCell, setSelectedCell] = useState<[number, number]>([0, 2]);

  const handleMiniInput = (row: number, col: number, char: string) => {
    if (miniGrid[row][col] === '#') return;
    const next = userMini.map((r) => [...r]);
    next[row][col] = char.toUpperCase().slice(-1);
    setUserMini(next);
  };

  // CONNECTIONS STATE
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [solvedGroups, setSolvedGroups] = useState<string[]>([]);
  const connectionsPool = [
    { text: 'PRESS', cat: 'JOURNALISM' },
    { text: 'BYLINE', cat: 'JOURNALISM' },
    { text: 'KICKER', cat: 'JOURNALISM' },
    { text: 'MASTHEAD', cat: 'JOURNALISM' },
    { text: 'BREAD', cat: 'SLANG FOR MONEY' },
    { text: 'CHEDDAR', cat: 'SLANG FOR MONEY' },
    { text: 'DOUGH', cat: 'SLANG FOR MONEY' },
    { text: 'BACON', cat: 'SLANG FOR MONEY' },
    { text: 'ROAST', cat: 'COOKING VERBS' },
    { text: 'SEAR', cat: 'COOKING VERBS' },
    { text: 'SIMMER', cat: 'COOKING VERBS' },
    { text: 'BROIL', cat: 'COOKING VERBS' },
    { text: 'BISHOP', cat: 'CHESS PIECES' },
    { text: 'KNIGHT', cat: 'CHESS PIECES' },
    { text: 'ROOK', cat: 'CHESS PIECES' },
    { text: 'PAWN', cat: 'CHESS PIECES' }
  ];

  const handleSelectWord = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word));
    } else if (selectedWords.length < 4) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleConnectionsSubmit = () => {
    if (selectedWords.length !== 4) return;
    const items = connectionsPool.filter((item) => selectedWords.includes(item.text));
    const firstCat = items[0].cat;
    const isMatch = items.every((item) => item.cat === firstCat);
    if (isMatch) {
      setSolvedGroups([...solvedGroups, firstCat]);
      setSelectedWords([]);
    } else {
      alert('One away or not quite! Try another combination.');
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-6 font-sans">
      {/* Top back banner */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-nyt">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-nyt-black hover:text-nyt-blue transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Front Page</span>
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-nyt-grayMid">NYT Games Arena</span>
          <span className="w-2.5 h-2.5 bg-nyt-black rounded-xs"></span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-nyt mb-8">
        <button
          onClick={() => setActiveTab('wordle')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer ${
            activeTab === 'wordle' ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
          }`}
        >
          <span className="w-3 h-3 bg-emerald-600 rounded-xs"></span>
          <span>Wordle</span>
        </button>
        <button
          onClick={() => setActiveTab('mini')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer ${
            activeTab === 'mini' ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
          }`}
        >
          <span className="w-3 h-3 bg-blue-600 rounded-xs"></span>
          <span>The Mini Crossword</span>
        </button>
        <button
          onClick={() => setActiveTab('connections')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer ${
            activeTab === 'connections' ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
          }`}
        >
          <span className="w-3 h-3 bg-purple-600 rounded-xs"></span>
          <span>Connections</span>
        </button>
        <button
          onClick={() => setActiveTab('spelling-bee')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer ${
            activeTab === 'spelling-bee' ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
          }`}
        >
          <span className="w-3 h-3 bg-amber-400 rounded-xs"></span>
          <span>Spelling Bee</span>
        </button>
      </div>

      {/* GAME 1: WORDLE */}
      {activeTab === 'wordle' && (
        <div className="max-w-md mx-auto text-center space-y-6">
          <div>
            <h2 className="text-3xl font-serif font-bold tracking-tight">Wordle</h2>
            <p className="text-xs text-nyt-grayMid mt-1">Get 6 chances to guess a 5-letter word.</p>
          </div>

          {wordleMessage && (
            <div className="inline-block px-4 py-1.5 bg-black text-white text-xs font-semibold rounded shadow-md">
              {wordleMessage}
            </div>
          )}

          {/* 6x5 Grid */}
          <div className="grid grid-rows-6 gap-1.5 w-64 mx-auto">
            {Array.from({ length: 6 }).map((_, rowIndex) => {
              const rowWord = guesses[rowIndex] || (rowIndex === guesses.length ? currentGuess.padEnd(5, ' ') : '     ');
              const isEvaluated = rowIndex < guesses.length;

              return (
                <div key={rowIndex} className="grid grid-cols-5 gap-1.5">
                  {Array.from({ length: 5 }).map((__, colIndex) => {
                    const char = rowWord[colIndex]?.trim() || '';
                    let tileClass = 'border-2 border-neutral-300 text-black bg-white';
                    if (isEvaluated && char) {
                      tileClass = getLetterState(char, colIndex, WORD_TARGET);
                    } else if (char) {
                      tileClass = 'border-2 border-neutral-700 text-black bg-white';
                    }

                    return (
                      <div
                        key={colIndex}
                        className={`w-11 h-11 flex items-center justify-center font-bold text-xl uppercase transition-colors select-none ${tileClass}`}
                      >
                        {char}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Virtual Keyboard */}
          <div className="space-y-1.5 max-w-sm mx-auto pt-4">
            {[
              ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
              ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
              ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
            ].map((row, rIdx) => (
              <div key={rIdx} className="flex justify-center gap-1">
                {row.map((key) => (
                  <button
                    key={key}
                    onClick={() => handleKeyClick(key)}
                    className={`h-11 px-2.5 text-xs font-bold rounded bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400 text-nyt-black cursor-pointer select-none transition-colors ${
                      key === 'ENTER' || key === 'DEL' ? 'px-3 text-[11px]' : ''
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-nyt flex items-center justify-between text-xs text-nyt-grayMid">
            <span>Hint: Today's solution starts with 'C'</span>
            <button
              onClick={() => {
                setGuesses([]);
                setCurrentGuess('');
                setWordleWon(false);
                setWordleMessage(null);
              }}
              className="flex items-center gap-1 text-nyt-blue hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Game</span>
            </button>
          </div>
        </div>
      )}

      {/* GAME 2: THE MINI CROSSWORD */}
      {activeTab === 'mini' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold tracking-tight">The Mini Crossword</h2>
            <p className="text-xs text-nyt-grayMid mt-1">Daily 5x5 quick bite puzzle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-4">
            {/* 5x5 Crossword Grid */}
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-5 border-2 border-black bg-black gap-[1px] w-64 h-64">
                {miniGrid.map((row, rIdx) =>
                  row.map((cell, cIdx) => {
                    const isBlack = cell === '#';
                    const isSelected = selectedCell[0] === rIdx && selectedCell[1] === cIdx;
                    return (
                      <div
                        key={`${rIdx}-${cIdx}`}
                        onClick={() => !isBlack && setSelectedCell([rIdx, cIdx])}
                        className={`relative w-full h-full flex items-center justify-center font-bold text-xl cursor-pointer select-none ${
                          isBlack ? 'bg-black cursor-default' : isSelected ? 'bg-blue-100' : 'bg-white'
                        }`}
                      >
                        {!isBlack && (
                          <>
                            <span className="absolute top-0.5 left-1 text-[9px] font-mono font-normal text-neutral-400">
                              {rIdx === 0 ? cIdx + 1 : rIdx === 1 && cIdx === 0 ? '6' : ''}
                            </span>
                            <input
                              type="text"
                              maxLength={1}
                              value={userMini[rIdx][cIdx]}
                              onChange={(e) => handleMiniInput(rIdx, cIdx, e.target.value)}
                              className="w-full h-full text-center font-bold uppercase bg-transparent outline-none cursor-pointer"
                            />
                          </>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    setUserMini(miniGrid);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 border border-nyt rounded cursor-pointer"
                >
                  Reveal Solution
                </button>
                <button
                  onClick={() => {
                    setUserMini([
                      ['', '', '', '', '#'],
                      ['', '', '', '', ''],
                      ['', '', '', '', ''],
                      ['', '', '', '', ''],
                      ['#', '', '', '', '']
                    ]);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 border border-nyt rounded cursor-pointer"
                >
                  Clear Grid
                </button>
              </div>
            </div>

            {/* Clues */}
            <div className="space-y-4 text-xs">
              <div>
                <h3 className="font-bold uppercase tracking-wider text-nyt-black border-b border-nyt pb-1 mb-2">Across</h3>
                <ul className="space-y-1.5 text-neutral-700">
                  <li><strong className="text-black font-semibold">1.</strong> Freshly published reporting (4)</li>
                  <li><strong className="text-black font-semibold">5.</strong> Empire State metropolis icon (5)</li>
                  <li><strong className="text-black font-semibold">6.</strong> Historic newspaper of record (5)</li>
                  <li><strong className="text-black font-semibold">7.</strong> Morning delivery material (5)</li>
                  <li><strong className="text-black font-semibold">8.</strong> Real-time broadcast status (4)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold uppercase tracking-wider text-nyt-black border-b border-nyt pb-1 mb-2">Down</h3>
                <ul className="space-y-1.5 text-neutral-700">
                  <li><strong className="text-black font-semibold">1.</strong> The Big Apple's initials (3)</li>
                  <li><strong className="text-black font-semibold">2.</strong> Inhabitant of European continent (8)</li>
                  <li><strong className="text-black font-semibold">3.</strong> Written dispatch for press (4)</li>
                  <li><strong className="text-black font-semibold">4.</strong> Investigative reporter's secret (5)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GAME 3: CONNECTIONS */}
      {activeTab === 'connections' && (
        <div className="max-w-lg mx-auto text-center space-y-6">
          <div>
            <h2 className="text-3xl font-serif font-bold tracking-tight">Connections</h2>
            <p className="text-xs text-nyt-grayMid mt-1">Group four words that share a common thread.</p>
          </div>

          {/* Solved Groups Banners */}
          {solvedGroups.map((group) => (
            <div key={group} className="p-3 bg-purple-100 border border-purple-300 rounded text-center">
              <span className="font-bold text-xs uppercase text-purple-900 tracking-wider">{group}</span>
              <p className="text-[11px] text-purple-700 mt-0.5">
                {connectionsPool.filter((p) => p.cat === group).map((p) => p.text).join(' · ')}
              </p>
            </div>
          ))}

          {/* 4x4 Grid of Words */}
          <div className="grid grid-cols-4 gap-2">
            {connectionsPool
              .filter((item) => !solvedGroups.includes(item.cat))
              .map((item) => {
                const isSelected = selectedWords.includes(item.text);
                return (
                  <button
                    key={item.text}
                    onClick={() => handleSelectWord(item.text)}
                    className={`h-16 rounded-md font-bold text-xs uppercase p-1 transition-all cursor-pointer flex items-center justify-center text-center ${
                      isSelected
                        ? 'bg-neutral-800 text-white shadow-sm'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
                    }`}
                  >
                    {item.text}
                  </button>
                );
              })}
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setSelectedWords([])}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider border border-nyt-black rounded-full hover:bg-neutral-50 cursor-pointer"
            >
              Deselect All
            </button>
            <button
              onClick={handleConnectionsSubmit}
              disabled={selectedWords.length !== 4}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-colors cursor-pointer ${
                selectedWords.length === 4
                  ? 'bg-black text-white hover:bg-neutral-800'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
            >
              Submit ({selectedWords.length}/4)
            </button>
          </div>
        </div>
      )}

      {/* GAME 4: SPELLING BEE */}
      {activeTab === 'spelling-bee' && (
        <div className="max-w-md mx-auto text-center space-y-6">
          <div>
            <h2 className="text-3xl font-serif font-bold tracking-tight">Spelling Bee</h2>
            <p className="text-xs text-nyt-grayMid mt-1">How many words can you make with 7 letters?</p>
          </div>

          {/* Honeycomb Display */}
          <div className="relative w-56 h-56 mx-auto flex items-center justify-center">
            {/* Center Yellow Hexagon */}
            <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center font-bold text-2xl text-black shadow-sm z-10">
              A
            </div>
            {/* Outer Hexagons */}
            {[
              { letter: 'E', pos: 'top-2 left-20' },
              { letter: 'D', pos: 'top-10 right-4' },
              { letter: 'I', pos: 'bottom-10 right-4' },
              { letter: 'T', pos: 'bottom-2 left-20' },
              { letter: 'O', pos: 'bottom-10 left-4' },
              { letter: 'R', pos: 'top-10 left-4' }
            ].map(({ letter, pos }) => (
              <div
                key={letter}
                className={`absolute ${pos} w-14 h-14 bg-neutral-200 rounded-full flex items-center justify-center font-bold text-xl text-neutral-800 shadow-xs hover:bg-neutral-300 cursor-pointer transition-colors`}
              >
                {letter}
              </div>
            ))}
          </div>

          <div className="p-4 bg-neutral-50 border border-nyt rounded text-xs space-y-2">
            <span className="font-bold text-neutral-900 uppercase tracking-wider">Pangram target:</span>
            <p className="text-neutral-600">Find words of 4+ letters using 'A'. E.g., EDITOR, READ, RATE, TREAD, RADIATE.</p>
          </div>
        </div>
      )}
    </div>
  );
};
