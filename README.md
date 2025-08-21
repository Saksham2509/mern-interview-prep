# InterviewPrep.AI

InterviewPrep.AI is a full-stack MERN application that helps users prepare for technical interviews with AI-generated questions and tailored explanations.

## Description

InterviewPrep.AI generates role- and experience-tailored interview questions and model explanations using Google Gemini. Users can manage multiple interview sessions, add personal notes, pin important questions, and regenerate questions instantly. The app uses JWT for authentication and MongoDB for persistence.

## Features

- AI-generated interview questions (Google Gemini)
- Concept explanations for questions
- Add and update personal notes for each question
- Pin important questions
- Regenerate questions instantly
- Manage multiple sessions (create, view, delete)
- Authentication with JWT (register / login)

## Tech Stack

- Frontend: React + Vite, Tailwind CSS, Axios, React Router, react-icons
- Backend: Node.js, Express, MongoDB (Mongoose)
- AI: Google Gemini via @google/genai
- Auth: JWT (jsonwebtoken)
- File uploads: multer
- Dev tooling: nodemon (backend), Vite (frontend)

## Folder Structure

Top-level layout (relevant files/folders):

- `backend/`
  - `index.js` — server entry
  - `package.json` — backend scripts & dependencies
  - `config/` — `db.js` (Mongo connection)
  - `controllers/` — route handlers
  - `routes/` — express routes
  - `models/` — Mongoose models (`User`, `Session`, `Question`)
  - `middleware/` — auth and upload middleware
  - `utils/` — prompt builders for AI

- `frontend/`
  - `package.json` — frontend scripts & dependencies
  - `vite.config.js`, `tailwind.config.js`, `postcss.config.js`
  - `src/` — React source (pages, components, context, utils)
  - `public/` — static assets

## Environment Variables

Backend (`backend/.env`) — required keys:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWTs
- `GEMINI_API_KEY` — Google Gemini API key
- `PORT` — (optional) server port, default 5000

Example `backend/.env`:

```
MONGO_URI=mongodb://localhost:27017/interview-prep-ai
JWT_SECRET=supersecretkey
GEMINI_API_KEY=ya29.my_google_gemini_key_here
PORT=5000
```

Frontend (`frontend/.env.local`) — required:

- `VITE_API_BASE_URL` — e.g. `http://localhost:5000`

Example `frontend/.env.local`:

```
VITE_API_BASE_URL=http://localhost:5000
```

> Note: Vite requires client-exposed env vars to be prefixed with `VITE_`.

## Install & Run (Local Development)

Open two terminals: one for backend, one for frontend.

Backend (development):

```powershell
cd c:\Users\Asus\Projects\interview-prep-ai\backend
npm install
# create .env with required variables
npm run dev
```

Frontend (development):

```powershell
cd c:\Users\Asus\Projects\interview-prep-ai\frontend
npm install
# create .env.local with VITE_API_BASE_URL
npm run dev
```

- Backend dev script: `npm run dev` (uses `nodemon index.js`).
- Frontend dev script: `npm run dev` (Vite dev server, default http://localhost:5173).

Production build:
- Frontend: `npm run build` in `frontend/` and serve static assets using a host or via backend static serving.
- Backend: `npm start` (runs `node index.js`).

## API Overview

Base path: `/api`

Auth
- `POST /api/auth/register` — register new user
- `POST /api/auth/login` — login and receive JWT
- `GET /api/auth/profile` — get logged-in user (protected)

AI
- `POST /api/ai/generate-questions` — generate questions (body: role, experience, topicsToFocus, numberOfQuestions)
- `POST /api/ai/generate-explanation` — generate explanation for a question (body: question)

Sessions
- `POST /api/sessions/create` — create a session (protected)
- `GET /api/sessions/my-sessions` — list user's sessions (protected)
- `GET /api/sessions/:id` — get session by id (protected)
- `DELETE /api/sessions/:id` — delete session (protected)

Questions
- `POST /api/questions/add` — add questions to a session
- `POST /api/questions/:id/pin` — toggle pin for a question
- `POST /api/questions/:id/note` — update personal note on a question
- `PUT /api/questions/:id/explanation` — save/update explanation for a question

Protected routes require `Authorization: Bearer <token>` header.

## How AI Integration Works

- Backend uses the official `@google/genai` package to call Google Gemini.
- Prompts are built in `backend/utils/prompt.js`; `GEMINI_API_KEY` is used to authenticate.
- Responses are parsed and returned as JSON to the frontend.

## Notes & Recommendations

- Add request rate-limiting and caching on AI endpoints to control costs and latency.
- Add unit and integration tests (none currently included).
- Consider Docker + `docker-compose` for a reproducible local environment (Mongo + backend + frontend).
- Add monitoring/alerting for API errors and failed AI calls.
