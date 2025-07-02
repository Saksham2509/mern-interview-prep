import React, { useState, useContext } from "react";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = ({ setCurrentPage }) => {
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      // Save token in local storage
      localStorage.setItem("token", res.data.token);

      // Save user in context
      setUser(res.data);

      // Optionally close modal or navigate
      // For example:
      window.location.href = "/dashboard";

    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border border-gray-300 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border border-gray-300 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-sm mt-3">
        Don't have an account?{" "}
        <span
          onClick={() => setCurrentPage("signup")}
          className="text-blue-500 cursor-pointer"
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
