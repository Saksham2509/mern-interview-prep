// src/components/layouts/DashboardLayout.jsx

import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) return null; // You can replace this with a loader or redirect later

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar at top */}
      <nav>
        <Navbar />
      </nav>

      {/* Main content area */}
      <main className="flex-grow px-4 py-6 sm:px-6 md:px-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
