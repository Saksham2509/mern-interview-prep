import React from 'react'

const SkeletonLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg space-y-8 animate-pulse">
        {/* Avatar and Title */}
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          </div>
        </div>

        {/* Main Content Lines */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10/12" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-9/12" />
        </div>

        {/* Card Section */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6 space-y-3">
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
        </div>

        {/* Button Skeleton */}
        <div className="flex justify-end">
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoader