import React, { useContext } from "react";
import { UserContext } from "../context/userContext";

const Hero = ({ onLoginClick, onSignupClick, onLogin, onSignup, onGetStarted }) => {
  const { user } = useContext(UserContext);
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-200 overflow-hidden px-4">
      {/* Animated background shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-gradient-to-br from-cyan-300/40 to-blue-400/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-tr from-blue-300/30 to-cyan-200/40 rounded-full blur-2xl animate-pulse-slower" />
      </div>
      <div className="relative z-10 bg-white/70 backdrop-blur-xl dark:bg-gray-900/80 rounded-3xl shadow-2xl p-10 flex flex-col items-center max-w-2xl w-full border border-blue-100">
        <div className="mb-6">
          <svg
            className="w-20 h-20 text-cyan-500 drop-shadow-xl"
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
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-3 bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
          Crack Your Next Tech Interview 💼
        </h1>
        <p className="text-base md:text-lg text-center max-w-xl text-gray-600 dark:text-gray-200 mb-2 font-medium">
          <span className="inline-block px-3 py-1 bg-cyan-100/60 text-cyan-700 rounded-full text-xs font-semibold mb-2 animate-fadeIn">
            AI Interview Assistant
          </span>
        </p>
        <p className="text-lg md:text-xl text-center max-w-xl text-gray-700 dark:text-gray-200 mb-8">
          Personalized Interview Questions. AI-Powered Answers. Pin What Matters.
          All in One Place.
        </p>
        <div className="flex flex-col md:flex-row gap-3 w-full justify-center">
          <button
            onClick={onGetStarted || onLoginClick}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-2xl text-lg font-semibold shadow-lg transition-all duration-200 w-full md:w-auto flex items-center gap-2 group"
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
                className="px-8 py-3 bg-white border border-blue-500 text-blue-600 rounded-2xl text-lg font-semibold shadow hover:bg-blue-50 transition-all duration-200 w-full md:w-auto flex items-center gap-2 group"
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
                className="px-8 py-3 bg-white border border-cyan-500 text-cyan-600 rounded-2xl text-lg font-semibold shadow hover:bg-cyan-50 transition-all duration-200 w-full md:w-auto flex items-center gap-2 group"
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
