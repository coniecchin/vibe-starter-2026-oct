import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles } from 'lucide-react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSubscribed: boolean;
  onSubscribe: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({
  isOpen,
  onClose,
  isSubscribed,
  onSubscribe
}) => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onSubscribe();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 font-sans">
      <div className="bg-white border border-nyt max-w-md w-full rounded-sm shadow-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-nyt pb-3">
          <span className="font-serif font-bold text-lg">The New York Times</span>
          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-100 rounded text-neutral-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="font-serif font-bold text-2xl">Welcome to All Access</h3>
            <p className="text-xs text-nyt-grayMid">
              Your subscription is active. Enjoy unlimited journalism, Games, Cooking, and Wirecutter.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-nyt-blue block">
                Special Limited-Time Offer
              </span>
              <h3 className="font-serif font-bold text-3xl text-nyt-black leading-tight">
                All Access Subscription
              </h3>
              <div className="pt-2">
                <span className="text-4xl font-serif font-bold text-black">$1</span>
                <span className="text-xs text-neutral-500 uppercase font-semibold"> / week for your first year</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-neutral-700 py-2 border-y border-nyt">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Unlimited News, Investigations & In-Depth Analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>NYT Games including Wordle, Spelling Bee & Crosswords</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>NYT Cooking with 20,000+ tested recipes</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Full access to The Athletic sports coverage & Wirecutter reviews</span>
              </li>
            </ul>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs p-3 border border-nyt rounded outline-none focus:border-black font-sans"
              />
              <button
                type="submit"
                className="w-full py-3 bg-nyt-blue hover:bg-nyt-blueDark text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-sm cursor-pointer"
              >
                Start Subscription for $1/Week
              </button>
            </form>

            <div className="text-[11px] text-neutral-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Cancel anytime online. No commitment.</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
