import React, { useContext } from "react";
import { UserContext } from "../context/userContext";

const Hero = ({ onLoginClick, onSignupClick, onLogin, onSignup, onGetStarted }) => {
  const { user } = useContext(UserContext);
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-background overflow-hidden px-4">
      {/* Animated background shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-2xl animate-pulse-slower" />
      </div>
      <div className="relative z-10 bg-surface/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 flex flex-col items-center max-w-2xl w-full border border-border">
        <div className="mb-6">
          <svg
            className="w-20 h-20 text-primary"
            fill="none"
            viewBox="0 0 64 64"
            stroke="currentColor"
          >
            <rect x="8" y="16" width="48" height="32" rx="10" fill="#e0f2fe" />
            <path
              d="M16 28h32M16 36h22"
              stroke="#38bdf8"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="48" cy="36" r="3.5" fill="#38bdf8" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-3 text-textPrimary tracking-tight">
          Crack Your Next Tech Interview 💼
        </h1>
        <p className="text-base md:text-lg text-center max-w-xl text-textSecondary mb-2 font-medium">
          <span className="inline-block px-3 py-1 bg-secondary/20 text-primary rounded-full text-xs font-semibold mb-2">
            AI Interview Assistant
          </span>
        </p>
        <p className="text-lg md:text-xl text-center max-w-xl text-textSecondary mb-8">
          Personalized Interview Questions. AI-Powered Answers. Pin What Matters.
          All in One Place.
        </p>
        <div className="flex flex-col md:flex-row gap-3 w-full justify-center">
          <button
            onClick={onGetStarted || onLoginClick}
            className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-2xl text-lg font-semibold shadow-lg transition-all duration-200 w-full md:w-auto flex items-center gap-2 group"
          >
            <span>Get Started</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
          {!user && (
            <>
              <button
                onClick={onLoginClick}
                className="px-8 py-3 bg-surface border border-primary text-primary rounded-2xl text-lg font-semibold shadow hover:bg-primary/5 transition-all duration-200 w-full md:w-auto flex items-center gap-2 group"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
                Login
              </button>
              <button
                onClick={onSignupClick}
                className="px-8 py-3 bg-surface border border-secondary text-secondary rounded-2xl text-lg font-semibold shadow hover:bg-secondary/5 transition-all duration-200 w-full md:w-auto flex items-center gap-2 group"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
      <style>{`
        @keyframes pulse-slow { 0%,100%{opacity:.7} 50%{opacity:1} }
        .animate-pulse-slow { animation: pulse-slow 4s infinite; }
        @keyframes pulse-slower { 0%,100%{opacity:.5} 50%{opacity:.9} }
        .animate-pulse-slower { animation: pulse-slower 7s infinite; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 1s; }
      `}</style>
    </section>
  );
};

export default Hero;
