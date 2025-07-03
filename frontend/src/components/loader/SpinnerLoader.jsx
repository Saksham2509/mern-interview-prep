import React from 'react'

const SpinnerLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-[30vh]" role="status">
      <svg
        aria-hidden="true"
        className="w-12 h-12 animate-spin text-gray-200 dark:text-gray-700"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-30"
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="6"
        />
        <path
          d="M45 25c0-11.046-8.954-20-20-20"
          stroke="url(#spinner-gradient)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="spinner-gradient" x1="25" y1="5" x2="25" y2="45" gradientUnits="userSpaceOnUse">
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default SpinnerLoader