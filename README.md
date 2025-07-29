# Excel Mock Interviewer

AI-powered Excel skills assessment platform helping candidates prepare for their dream jobs with personalized interviews.

## Features

- **AI-Powered Questions:** Personalized Excel questions based on your experience and target role.
- **Real-Time Feedback:** Instant evaluation and feedback on your answers.
- **Comprehensive Reports:** Detailed skill assessment and improvement recommendations.
- **Modern UI:** Responsive, accessible, and built with React, Tailwind CSS, and Vite.

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [React Query](https://tanstack.com/query/latest)
- [FastAPI (backend, not included here)](https://fastapi.tiangolo.com/)
- [Google Gemini AI (backend, not included here)](https://deepmind.google/technologies/gemini/)

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd interviewer_client
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and set `VITE_API_URL` to your backend URL.

4. **Run the development server:**
   ```sh
   npm run dev
   ```

5. **Build for production:**
   ```sh
   npm run build
   ```

## Project Structure

- `src/pages/` — Main pages (Home, Interview, Report, Setup)
- `src/components/` — UI and layout components
- `src/context/` — React context for interview state
- `src/hooks/` — Custom React hooks
- `src/services/` — API and service logic
- `src/utils/` — Utility functions and constants
- `src/styles/` — Global and component styles

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

## License

MIT

---

© 2025 Ritesh Raj Tiwari. All rights
