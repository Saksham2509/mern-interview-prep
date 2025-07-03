// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";

// import LandingPage from "./pages/LandingPage";
// import Dashboard from "./pages/Dashboard";
// import InterviewPrep from "./pages/Home/InterviewPrep/InterviewPrep";
// import UserProvider from "./context/userContext";

// const App = () => {
//   return (
//     <UserProvider>
//       <div>
//         <Router>
//           <Routes>
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route
//               path="/interview-prep/:sessionId"
//               element={<InterviewPrep />}
//             />
//           </Routes>
//         </Router>

//         <Toaster
//           toastOptions={{
//             className: "",
//             style: {
//               fontSize: "13px",
//             },
//           }}
//         />
//       </div>
//     </UserProvider>
//   );
// };

// export default App;
// src/App.jsx

// src/App.jsx

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import InterviewPrep from "./pages/Home/InterviewPrep/InterviewPrep";
import Login from "./pages/Auth/login";
import Signup from "./pages/Auth/SignUp";

import PrivateRoute from "./components/Auth/PrivateRoute";
import PublicRoute from "./components/Auth/PublicRoute";
import UserProvider from "./context/userContext";
import Modal from "./components/Modal";

const App = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'

  // Handlers to open modal from Hero
  const openLogin = () => {
    setAuthMode("login");
    setAuthModalOpen(true);
  };
  const openSignup = () => {
    setAuthMode("signup");
    setAuthModalOpen(true);
  };

  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Landing Page */}
          <Route
            path="/"
            element={
              <LandingPage
                onLoginClick={openLogin}
                onSignupClick={openSignup}
              />
            }
          />

          {/* Public Auth Routes (still accessible directly) */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/interview-prep/:sessionId"
            element={
              <PrivateRoute>
                <InterviewPrep />
              </PrivateRoute>
            }
          />
        </Routes>

        {/* Auth Modal (Login/Signup) */}
        <Modal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          title={authMode === "login" ? "Welcome back!" : "Create your account"}
        >
          <div className="flex flex-col gap-6">
            {authMode === "login" ? (
              <>
                <Login />
                <div className="flex items-center gap-2 my-2">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400">or</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <button
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow hover:from-cyan-600 hover:to-blue-600 transition-all text-base"
                  onClick={() => setAuthMode("signup")}
                >
                  Create a new account
                </button>
              </>
            ) : (
              <>
                <Signup />
                <div className="flex items-center gap-2 my-2">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400">or</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <button
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow hover:from-blue-600 hover:to-cyan-600 transition-all text-base"
                  onClick={() => setAuthMode("login")}
                >
                  Already have an account? Login
                </button>
              </>
            )}
          </div>
        </Modal>

        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </Router>
    </UserProvider>
  );
};

export default App;
