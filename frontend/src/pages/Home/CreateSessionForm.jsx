import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/input";
import SpinnerLoader from "../../components/loader/SpinnerLoader";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/apiPaths";

const CreateSessionForm = () => {
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
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">
        Start a New Interview Journey
      </h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">
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
          className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading && <SpinnerLoader />}
          Create Session
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
