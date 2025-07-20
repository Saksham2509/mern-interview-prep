import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import { API_PATHS } from "../../../utils/apiPaths";

import SpinnerLoader from "../../../components/loader/SpinnerLoader";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import QuestionCard from "../../../components/Cards/QuestionCard";
import toast from "react-hot-toast";

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatingExplanation, setGeneratingExplanation] = useState(null);
  const [addingQuestion, setAddingQuestion] = useState(false);

  const fetchSession = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
      setSessionData(response.data?.session || null);
    } catch (error) {
      console.error("Error fetching session:", error);
      setError("Failed to fetch session data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSession();
    }
  }, [sessionId]);

  const handleTogglePin = async (questionId) => {
    const originalQuestions = [...(sessionData?.questions || [])];
    setSessionData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q._id === questionId ? { ...q, isPinned: !q.isPinned } : q
      ),
    }));
    try {
      await axiosInstance.put(API_PATHS.QUESTION.PIN(questionId));
      toast.success("Pin status updated!");
    } catch (error) {
      setSessionData((prev) => ({ ...prev, questions: originalQuestions }));
      toast.error("Failed to toggle pin");
    }
  };

  const handleGenerateExplanation = async (questionId, questionText) => {
    setGeneratingExplanation(questionId);
    try {
      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, {
        question: questionText,
      });
      const explanationObject = response.data?.explanation;
      if (!explanationObject || !explanationObject.title || !explanationObject.explanation) {
        throw new Error("AI failed to generate a valid explanation.");
      }
      const formattedExplanation = `${explanationObject.title}\n\n${explanationObject.explanation}`;
      await axiosInstance.put(API_PATHS.QUESTION.UPDATE_EXPLANATION(questionId), {
        explanation: formattedExplanation,
      });
      setSessionData((prev) => ({
        ...prev,
        questions: prev.questions.map((q) =>
          q._id === questionId ? { ...q, explanation: formattedExplanation } : q
        ),
      }));
      toast.success("Explanation generated and saved!");
    } catch (error) {
      toast.error(error.message || "An error occurred while generating the explanation.");
    } finally {
      setGeneratingExplanation(null);
    }
  };

  const handleAddQuestion = async () => {
    if (!sessionData || addingQuestion) return;
    setAddingQuestion(true);
    const toastId = toast.loading("Generating a new question...");
    try {
        const aiRes = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
            role: sessionData.role,
            experience: sessionData.experience,
            topicsToFocus: sessionData.topicsToFocus,
            numberOfQuestions: 1,
        });
        const newQuestions = aiRes.data.questions;
        const saveRes = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
            sessionId,
            questions: newQuestions,
        });
        setSessionData((prev) => ({
            ...prev,
            questions: [...prev.questions, ...saveRes.data],
        }));
        toast.success("New question added!", { id: toastId });
    } catch (err) {
        toast.error("Failed to add question.", { id: toastId });
    } finally {
        setAddingQuestion(false);
    }
  };


  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center py-20">
          <SpinnerLoader />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <p className="text-center text-red-500 py-10">{error}</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-6 pb-20 max-w-4xl">
        <div className="relative z-10">
            {/* --- "BACK TO SESSIONS" BUTTON RESTORED --- */}
            <button
                onClick={() => navigate("/dashboard")}
                className="mb-6 inline-flex items-center text-sm text-blue-600 hover:underline font-medium"
            >
                ← Back to Sessions
            </button>

            <h2 className="text-2xl md:text-3xl font-extrabold mb-2 tracking-tight drop-shadow-lg flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 text-white shadow-md text-lg md:text-xl font-bold uppercase tracking-wider">
                <svg className="w-6 h-6 mr-2 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zm0 0c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3zm0 8v-2m0 0c-4.418 0-8-1.79-8-4V7a2 2 0 012-2h16a2 2 0 012 2v6c0 2.21-3.582 4-8 4z" /></svg>
                {sessionData?.role ?? "N/A"}
              </span>
            </h2>
            <div className="flex flex-wrap gap-4 mb-8 text-base md:text-lg font-medium">
              <div className="bg-gradient-to-r from-cyan-100 to-cyan-200 rounded-lg px-4 py-2 shadow border border-cyan-200 flex items-center gap-2 min-w-[160px]">
                <span className="font-semibold text-cyan-700">Topics:</span>
                <span className="text-cyan-900 truncate max-w-[200px]">{sessionData?.topicsToFocus?.length ? sessionData.topicsToFocus.join(", ") : "N/A"}</span>
              </div>
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg px-4 py-2 shadow border border-blue-200 flex items-center gap-2 min-w-[160px]">
                <span className="font-semibold text-blue-700">Experience:</span>
                <span className="text-blue-900">{sessionData?.experience ?? "N/A"} {sessionData?.experience && !isNaN(Number(sessionData.experience)) ? (Number(sessionData.experience) === 1 ? "year" : "years") : ""}</span>
              </div>
            </div>
        </div>

        <div className="flex flex-col gap-6">
            {sessionData?.questions?.map((item, index) => (
            <QuestionCard
                key={item._id || index}
                question={item.question}
                answer={item.answer}
                note={item.note}
                explanation={item.explanation}
                isPinned={item.isPinned}
                onTogglePin={() => handleTogglePin(item._id)}
                onLearnMore={() => handleGenerateExplanation(item._id, item.question)}
                onUpdateNote={async (newNote) => {
                setSessionData((prev) => ({
                    ...prev,
                    questions: prev.questions.map((q) =>
                    q._id === item._id ? { ...q, note: newNote } : q
                    ),
                }));
                try {
                    await axiosInstance.put(API_PATHS.QUESTION.UPDATE_NOTE(item._id), {
                    note: newNote,
                    });
                    toast.success("Note updated!");
                } catch {
                    toast.error("Failed to update note");
                    fetchSession();
                }
                }}
                loadingExplanation={generatingExplanation === item._id}
            />
            ))}
        </div>
        
        {/* --- "+ ADD QUESTION" BUTTON RESTORED --- */}
        <div className="mt-8 flex justify-end">
            <button
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow hover:from-cyan-600 hover:to-blue-600 transition-all text-base disabled:opacity-50"
                onClick={handleAddQuestion}
                disabled={addingQuestion}
            >
                {addingQuestion ? "Generating..." : "+ Add Question"}
            </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;