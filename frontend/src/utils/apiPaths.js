export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", // Signup
    LOGIN: "/api/auth/login",       // Login & return token
    GET_PROFILE: "/api/auth/profile", // Get logged-in user details
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image", // Upload profile picture
  },

  AI: {
    GENERATE_QUESTIONS: "/api/ai/generate-questions", // Generate Q&A using Gemini
    GENERATE_EXPLANATION: "/api/ai/generate-explanation", // Explain concept using Gemini
  },

  SESSION: {
    CREATE: "/api/sessions/create", // Create new session
    GET_ALL: "/api/sessions/my-sessions", // Get all sessions
    GET_ONE: (id) => `/api/sessions/${id}`, // Get one session
    DELETE: (id) => `/api/sessions/${id}`, // Delete session
  },

  QUESTION: {
    ADD_TO_SESSION: "/api/questions/add", // Add questions to session
    PIN: (id) => `/api/questions/${id}/pin`, // Pin/Unpin question
    UPDATE_NOTE: (id) => `/api/questions/${id}/note`, // Add note to question
  },
};
