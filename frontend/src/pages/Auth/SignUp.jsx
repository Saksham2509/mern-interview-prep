// src/pages/SignUp.jsx

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/input";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/apiPaths";
 // Optional: only if you allow image upload

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName) {
      setError("Please enter full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      let profileImageUrl = "";

      if (profilePic) {
        const res = await uploadImage(profilePic); // Optional step
        profileImageUrl = res.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Signup failed:", err);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg md:max-w-xl flex flex-col items-center justify-center">
      <div className="w-full px-8 py-7 flex flex-col justify-center">
        <h3 className="text-2xl font-extrabold text-cyan-700 mb-1 drop-shadow-sm text-center">Create an Account</h3>
        <p className="text-xs text-slate-700 mb-6 text-center">Join us today by entering your details below.</p>
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 gap-2 mt-3">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="email"
            />
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 characters"
              type="password"
            />
          </div>
          {error && <p className="text-red-500 text-xs py-2">{error}</p>}
          <button
            type="submit"
            className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-500 text-white font-bold py-2.5 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition text-base disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "SIGN UP"}
          </button>
          <p className="text-[13px] text-slate-800 mt-3 text-center">
            Already have an account?{' '}
            <button
              className="font-semibold text-blue-700 underline hover:text-cyan-700 transition"
              type="button"
              onClick={() => setCurrentPage("login")}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
