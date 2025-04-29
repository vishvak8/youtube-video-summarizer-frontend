# YouTube Video Summarizer – Frontend

This is the frontend for the YouTube Video Summarizer application, built using **React**, **TypeScript**, and **Vite**. It allows users to register/login using **Nhost authentication**, enter a YouTube video URL, and view an AI-generated summary fetched from the backend.

---

## What the frontend does

- Provides a login/signup flow with Nhost Authentication
- Lets users input YouTube video URLs through a form
- Displays a generated summary from the backend
- Handles invalid URLs, loading states, and error messages with toast notifications
- Uses a clean and modern UI with gradient styling and animations

---

## Tech Stack Used

- **Framework**: React + Vite
- **Language**: TypeScript
- **Styling**: CSS
- **Auth**: Nhost Authentication
- **Backend Communication**: REST (Fetch API)
- **Notifications**: react-toastify

---

## How to run the project

1. Clone the repository:
   
   git clone https://github.com/vishvak8/youtube-video-summarizer-frontend.git

2. Navigate to the frontend folder:

   cd youtube-video-summarizer-frontend

3. Install dependencies:

   npm install

4. Start the development server:

   npm run dev

5. Open your browser and go to:

   http://localhost:5173

---

## Notes
-The backend must be running and accessible via the URL configured in the App.tsx file (currently hardcoded with ngrok).
-Update the backend URL when deploying or switching environments.
-The nhost.ts file contains the project-specific Nhost configuration for auth and GraphQL integration.

---

## License
This project is open-source and intended for learning and demonstration purposes.

