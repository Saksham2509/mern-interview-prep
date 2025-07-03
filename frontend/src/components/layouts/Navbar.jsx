// src/components/layouts/Navbar.jsx

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Navbar = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200/80 shadow-sm">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Brand Logo */}
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 text-xl font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span>InterviewPrep AI</span>
          </Link>

          {/* Logout Button if logged in */}
          {user && (
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg font-medium shadow hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
