// src/pages/Login.jsx

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
 // assuming custom input
import { validateEmail } from "../../utils/helper";
import Input from "../../components/inputs/input";


import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";


const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg md:max-w-xl flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-cyan-100 to-blue-300 rounded-2xl shadow-2xl border border-blue-200 relative">
      {/* Remove extra close button, rely on Modal's header close */}
      <div className="w-full px-6 py-6 flex flex-col justify-center bg-gradient-to-br from-white/90 via-blue-50/90 to-cyan-100/90 rounded-2xl mt-2">
        <h3 className="text-2xl font-extrabold text-blue-700 mb-1 drop-shadow-sm text-center">Welcome Back</h3>
        <p className="text-xs text-slate-700 mb-6 text-center">Please enter your details to log in</p>
        <form onSubmit={handleLogin}>
          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button
            type="submit"
            className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-2.5 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition text-base disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
          <p className="text-[13px] text-slate-800 mt-3 text-center">
            Don’t have an account?{' '}
            <button
              type="button"
              className="font-semibold text-cyan-700 underline hover:text-blue-700 transition"
              onClick={() => setCurrentPage("signup")}
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
