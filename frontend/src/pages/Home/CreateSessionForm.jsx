import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/input";
import SpinnerLoader from "../../components/loader/SpinnerLoader";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/apiPaths";

const CreateSessionForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      console.log("Submitting form with data:", formData);
      console.log("Calling AI endpoint...");

      // Convert comma-separated string into array
      const topicsArray = topicsToFocus.split(",").map((t) => t.trim());

      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus: topicsArray,
          numberOfQuestions: 10,
        }
      );

      const generatedQuestions = aiResponse.data.questions;
      console.log("Generated questions:", generatedQuestions);

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        role,
        experience,
        topicsToFocus: topicsArray,
        description: formData.description,
        questions: generatedQuestions,
      });

      const sessionId = response?.data?.session?._id;
      console.log("Session created:", sessionId);

      if (sessionId) {
        navigate(`/interview-prep/${sessionId}`);
      } else {
        throw new Error("Invalid session response");
      }
    } catch (err) {
      console.error("Session creation failed:", err);
      setError(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg md:max-w-xl flex flex-col items-center justify-center">
      <button
        type="button"
        onClick={onSuccess}
        className="absolute top-4 right-4 z-10 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded-full p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-400"
        aria-label="Close modal"
        style={{ fontSize: 28, lineHeight: 1 }}
      >
        <svg
          className="w-7 h-7"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="w-full px-8 py-7 flex flex-col justify-center">
        <h3 className="text-2xl font-extrabold text-black mb-1 text-center">
          Start a New Interview Journey
        </h3>
        <p className="text-xs text-slate-700 mb-3 text-center">
          Fill out a few quick details and unlock your personalized set of
          interview questions!
        </p>
        <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
          <Input
            label="Target Role"
            value={formData.role}
            onChange={(e) => handleChange("role", e.target.value)}
            placeholder="(e.g., Frontend Developer)"
            type="text"
          />
          <Input
            label="Years of Experience"
            value={formData.experience}
            onChange={(e) => handleChange("experience", e.target.value)}
            placeholder="(e.g., 1, 3, 5+)"
            type="number"
          />
          <Input
            label="Topics to Focus On"
            value={formData.topicsToFocus}
            onChange={(e) => handleChange("topicsToFocus", e.target.value)}
            placeholder="(e.g., React, Node.js)"
            type="text"
          />
          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="(Optional)"
            type="text"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button
            type="submit"
            className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-2.5 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition text-base disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading && <SpinnerLoader />}
            Create Session
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSessionForm;
