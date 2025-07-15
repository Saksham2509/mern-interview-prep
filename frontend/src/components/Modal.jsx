import React from "react";

const Modal = ({ children, isOpen, onClose, title, hideHeader = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-textPrimary/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-[500px] transform transition-all duration-300 ease-in-out scale-100 animate-modalPop">
        <div className="relative bg-surface rounded-xl shadow-2xl overflow-hidden border border-border">
          {/* Modal Header */}
          {!hideHeader && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background/50">
              <h3 className="text-xl font-semibold text-textPrimary">
                {title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-textSecondary hover:text-error transition-colors duration-200 rounded-full p-2 hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Modal Body */}
          <div className="px-6 py-6">
            {children}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.3s; }
        @keyframes modalPop { 0% { transform: scale(0.95) translateY(30px); opacity: 0; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
        .animate-modalPop { animation: modalPop 0.35s cubic-bezier(.4,2,.6,1) both; }
      `}</style>
    </div>
  );
};

export default Modal;
