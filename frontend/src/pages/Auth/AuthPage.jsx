import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LuBrainCircuit } from "react-icons/lu";

// Your existing imports
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/apiPaths";
import { validateEmail } from "../../utils/helper";

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error on new input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // --- Validation ---
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }
    if (!isLoginView && !formData.name) {
      setError("Please enter your full name.");
      return;
    }
    if (!isLoginView && formData.password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
    }
    // --- End Validation ---

    setLoading(true);
    try {
      if (isLoginView) {
        // --- Login Logic ---
        const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
          email: formData.email,
          password: formData.password,
        });
        const { token, user } = response.data;
        if (token) {
          localStorage.setItem("token", token);
          updateUser({ token, user }); // Update context
          toast.success("Welcome back!");
          navigate("/dashboard");
        }
      } else {
        // --- Sign Up Logic ---
        await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        toast.success("Account created successfully! Please log in.");
        setIsLoginView(true); // Switch to login view
        setFormData({ ...formData, name: "", password: "" }); // Clear form for login
      }
    } catch (err) {
      const message = err.response?.data?.message || "An error occurred.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Decorative Panel */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gray-50 p-12 border-r">
        <div className="text-center">
          <LuBrainCircuit className="mx-auto h-16 w-16 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Ace Your Next Interview
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Personalized AI-powered prep to help you land your dream job.
          </p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {isLoginView ? "Welcome Back" : "Create an Account"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLoginView
                ? "Please enter your details to sign in."
                : "Let's get you started."}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {!isLoginView && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isLoginView ? "current-password" : "new-password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-xs text-center pt-1">{error}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : (isLoginView ? "Sign In" : "Create Account")}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            {isLoginView
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              onClick={() => {
                setIsLoginView(!isLoginView);
                setError(""); // Clear errors when switching views
              }}
              className="ml-1 font-medium text-blue-600 hover:text-blue-500"
            >
              {isLoginView ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;