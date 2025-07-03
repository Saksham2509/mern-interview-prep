import React from "react";

const DeleteAlertContent = ({ content, onDelete, onCancel }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-sm text-gray-700 dark:text-gray-200 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <svg
          className="w-7 h-7 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
          />
        </svg>
        <span className="font-semibold text-base">Are you sure?</span>
      </div>
      <p className="mb-6 text-gray-600 dark:text-gray-300">{content}</p>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="px-5 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-sm"
          onClick={onCancel}
          aria-label="Cancel delete"
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-5 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm font-semibold"
          onClick={onDelete}
          aria-label="Confirm delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;
