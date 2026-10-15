import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  userEmail: string;
  onLogin: (email: string) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  isLoggedIn,
  userEmail,
  onLogin,
  onLogout
}) => {
  const [emailInput, setEmailInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    onLogin(emailInput);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 font-sans">
      <div className="bg-white border border-nyt max-w-sm w-full rounded-sm shadow-2xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-nyt pb-3">
          <span className="font-serif font-bold text-lg">The New York Times</span>
          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-100 rounded text-neutral-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isLoggedIn ? (
          <div className="space-y-4 text-center">
            <div className="w-10 h-10 bg-neutral-100 border border-nyt rounded-full flex items-center justify-center font-bold font-serif mx-auto">
              {userEmail.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs text-nyt-grayMid">Signed in as</p>
              <p className="font-bold text-sm text-nyt-black">{userEmail}</p>
            </div>
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-2 border border-rose-300 text-rose-700 hover:bg-rose-50 rounded text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Log Out
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center">
              <h3 className="font-serif font-bold text-2xl">Log In</h3>
              <p className="text-xs text-nyt-grayMid mt-1">Access your saved stories and subscriptions</p>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-nyt-grayDark">Email Address</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full text-xs p-2.5 border border-nyt rounded outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-black hover:bg-neutral-800 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Continue with Email
            </button>

            <p className="text-[10px] text-center text-neutral-400">
              By continuing, you agree to the updated Terms of Service and Privacy Policy.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
