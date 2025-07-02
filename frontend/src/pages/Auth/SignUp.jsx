import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/apiPaths";

const SignUp = ({ setCurrentPage }) => {
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        formData
      );
      localStorage.setItem("token", response.data.token);
      setUser(response.data);
      setCurrentPage(null);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[400px]">
      <h2 className="text-xl font-semibold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="border border-gray-300 rounded px-4 py-2"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border border-gray-300 rounded px-4 py-2"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="border border-gray-300 rounded px-4 py-2"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>
        <p
          className="text-sm text-center text-gray-700 cursor-pointer"
          onClick={() => setCurrentPage("login")}
        >
          Already have an account? Login
        </p>
        {error && (
          <p className="text-red-600 text-center mt-2">{error}</p>
        )}
      </form>
    </div>
  );
};

export default SignUp;
