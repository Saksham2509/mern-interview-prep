import React from "react";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-[#FFFCEF]">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-5">
        <h2 className="text-xl font-bold mb-10">Interview Prep AI</h2>
        <nav className="flex flex-col gap-4">
          <a href="/dashboard" className="hover:text-amber-400">
            Dashboard
          </a>
          {/* Add more links here if needed */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Placeholder for summary cards and session list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-gray-700">Summary Card 1</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-gray-700">Summary Card 2</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-gray-700">Summary Card 3</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
