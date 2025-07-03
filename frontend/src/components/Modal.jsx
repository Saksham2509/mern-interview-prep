import React from "react";

const Modal = ({ children, isOpen, onClose, title, hideHeader = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-0 bg-gradient-to-br from-blue-200/60 via-cyan-200/60 to-blue-400/60 backdrop-blur-[3px] animate-fadeIn">
      <div className="relative w-full max-w-xl md:max-w-2xl transform transition-all duration-300 ease-in-out scale-100 animate-modalPop">
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-visible border border-blue-100">
          {/* Modal Header */}
          {!hideHeader && (
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-blue-700 tracking-tight">
                {title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-red-500 transition-colors duration-200 rounded-full p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Close modal"
                style={{ fontSize: 32, lineHeight: 1 }}
              >
                <svg
                  className="w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Modal Body */}
          <div className="p-0 md:p-0 overflow-visible bg-white flex items-center justify-center min-h-[420px] md:min-h-[520px]">
            <div className="w-full max-w-lg md:max-w-xl flex flex-col items-center justify-center">
              {children}
            </div>
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
