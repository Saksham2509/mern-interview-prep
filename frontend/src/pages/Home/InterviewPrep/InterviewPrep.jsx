// InterviewPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import { API_PATHS } from "../../../utils/apiPaths";

import SpinnerLoader from "../../../components/loader/SpinnerLoader";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import QuestionCard from "../../../components/Cards/QuestionCard";
import toast from "react-hot-toast";

const InterviewPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatingExplanation, setGeneratingExplanation] = useState(false);

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
    try {
      await axiosInstance.put(API_PATHS.QUESTION.PIN(questionId));
      toast.success("Question pin status updated!");
      fetchSession();
    } catch (error) {
      console.error("Error toggling pin:", error);
      toast.error("Failed to toggle pin");
    }
  };

 const handleGenerateExplanation = async (questionId, questionText) => {
  try {
    setGeneratingExplanation(true);

    const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, {
      question: questionText,
    });

    const explanation = response.data?.explanation;
    if (!explanation) {
      toast.error("Failed to generate explanation");
      return;
    }

    setSessionData((prev) => {
      const updatedQuestions = prev.questions.map((q) => {
        if (q._id === questionId) {
          const existingNote = q.note || "";
          const newNote = existingNote
            ? `${existingNote.trim()}\n\n---\n\n🧠 ${explanation.title}\n${explanation.explanation}`
            : `🧠 ${explanation.title}\n${explanation.explanation}`;
          return { ...q, note: newNote };
        }
        return q;
      });
      return { ...prev, questions: updatedQuestions };
    });

    await axiosInstance.put(API_PATHS.QUESTION.UPDATE_NOTE(questionId), {
      note: sessionData.questions.find((q) => q._id === questionId)?.note || "",
    });

    toast.success("Explanation added to your notes!");
  } catch (error) {
    console.error("Error generating explanation:", error);
    toast.error("Failed to generate explanation");
  } finally {
    setGeneratingExplanation(false);
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
      <div className="container mx-auto pt-10 pb-20 max-w-3xl relative min-h-[90vh] flex flex-col items-center justify-start">
        {/* Modern background orbs for professional look */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-cyan-300/30 to-blue-400/10 rounded-full blur-2xl z-0 animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tr from-blue-300/30 to-cyan-400/10 rounded-full blur-2xl z-0 animate-pulse" />
        {/* Back to Sessions Button - beautiful, floating, always visible, not overlapping */}
        <div className="w-full flex justify-start mb-4 md:mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="relative z-30 flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-cyan-600 transition-all text-base border-2 border-white/80 backdrop-blur-md"
            style={{ marginTop: 0 }}
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to Sessions
          </button>
        </div>
        <div className="relative z-10 w-full flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight drop-shadow-lg flex items-center gap-3 text-center">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 text-white shadow-md text-2xl md:text-3xl font-bold uppercase tracking-wider">
              <svg className="w-7 h-7 mr-2 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zm0 0c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3zm0 8v-2m0 0c-4.418 0-8-1.79-8-4V7a2 2 0 012-2h16a2 2 0 012 2v6c0 2.21-3.582 4-8 4z" /></svg>
              {sessionData?.role ?? "N/A"}
            </span>
          </h2>
          <div className="flex flex-wrap gap-4 mb-10 text-base md:text-lg font-medium justify-center w-full">
            <div className="bg-gradient-to-r from-cyan-100 to-cyan-200 rounded-lg px-5 py-2 shadow border border-cyan-200 flex items-center gap-2 min-w-[160px]">
              <span className="font-semibold text-cyan-700">Topics:</span>
              <span className="text-cyan-900 truncate max-w-[200px]">{sessionData?.topicsToFocus?.length ? sessionData.topicsToFocus.join(", ") : "N/A"}</span>
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg px-5 py-2 shadow border border-blue-200 flex items-center gap-2 min-w-[160px]">
              <span className="font-semibold text-blue-700">Experience:</span>
              <span className="text-blue-900">{sessionData?.experience ?? "N/A"} {sessionData?.experience && !isNaN(Number(sessionData.experience)) ? (Number(sessionData.experience) === 1 ? "year" : "years") : ""}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
          {sessionData?.questions?.map((item, index) => (
            <QuestionCard
              key={item._id || index}
              question={item.question}
              answer={item.answer}
              note={item.note}
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
              loadingExplanation={generatingExplanation}
              cardIndex={index}
            />
          ))}
        </div>
        <div className="mb-8 flex justify-end w-full max-w-2xl mx-auto">
          <button
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold shadow-lg hover:from-cyan-600 hover:to-blue-600 transition-all text-lg"
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!sessionData) return;
              try {
                const numberOfQuestions = 1;
                toast.loading("Generating a new question...");
                const aiRes = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
                  role: sessionData.role,
                  experience: sessionData.experience,
                  topicsToFocus: sessionData.topicsToFocus,
                  numberOfQuestions,
                });
                const newQuestions = aiRes.data.questions;
                // Save new question to session
                const saveRes = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
                  sessionId,
                  questions: newQuestions,
                });
                toast.dismiss();
                toast.success("Question added!");
                setSessionData((prev) => ({
                  ...prev,
                  questions: [...prev.questions, ...saveRes.data],
                }));
                // Scroll to the new question
                setTimeout(() => {
                  const lastCard = document.querySelector('.question-card:last-child');
                  if (lastCard) lastCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
              } catch (err) {
                toast.dismiss();
                toast.error("Failed to add question");
              }
            }}
          >
            + Add Question
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPage;
