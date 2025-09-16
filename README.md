
# Career Chatbot 🚀

> Your personal AI-powered career counselor, built for modern professionals and students. Ask career questions, get instant advice, and track your journey—all in a beautiful, secure chat interface.

---

## Features

- **AI Career Counseling:** Get expert advice on jobs, interviews, skills, developer roadmaps, and more.
- **Chat Sessions:** Start, rename, and delete chat sessions. Each session is saved for future reference.
- **Optimistic UI:** Instant feedback as you type and send messages.
- **Authentication:** Secure login with GitHub. Manage your profile and sessions.
- **Profile Dropdown:** Access your account and logout from the sticky header.
- **Modern UI:** Premium, responsive design with Tailwind CSS and Lucide icons.
 **Tech Stack:** Next.js 15, React 19, TypeScript, tRPC, Prisma, NextAuth, Groq AI, Tailwind CSS, Lucide React, Radix UI, Sonner, SuperJSON.

 **Frontend:** Next.js App Router, React, TypeScript, Tailwind CSS, Lucide React, Radix UI, Sonner
 **Backend:** tRPC, Prisma ORM, NextAuth (GitHub login), Groq AI (llama-3.3-70b-versatile), TypeScript
 **Database:** PostgreSQL (via Prisma)
 **Other:** SuperJSON, React Query, Markdown rendering

---
<img width="1838" height="829" alt="image" src="https://github.com/user-attachments/assets/de8e994e-e73b-4587-abb5-4b6e2aee2b6d" />
<img width="1838" height="829" alt="Screenshot from 2025-09-16 09-49-51" src="https://github.com/user-attachments/assets/271bd85e-477a-4319-94c0-6e9fd8a29f59" />



## Getting Started (Local Development)

1. **Clone the repo:**
	```bash
	git clone https://github.com/shubhjain191/career-chatbot.git
	cd career-chatbot
	```

2. **Install dependencies:**
	```bash
	npm install
	```

3. **Set up environment variables:**
	- Copy `.env.example` to `.env.local` and fill in:
	  - `DATABASE_URL` (Postgres connection string)
	  - `GROQ_API_KEY` (Groq AI key)
	  - `GITHUB_ID` and `GITHUB_SECRET` (GitHub OAuth)

4. **Run Prisma migrations:**
	```bash
	npx prisma migrate dev
	```

5. **Start the dev server:**
	```bash
	npm run dev
	```

6. **Open in browser:**
	Visit [http://localhost:3000](http://localhost:3000)

---

## Usage

- Login with GitHub to start chatting.
- Ask career-related questions (jobs, interviews, developer roadmap, etc.).
- Manage chat sessions and your profile from the sticky header.

---

## Folder Structure

- `app/` — Next.js app router pages and layout
- `frontend/components/` — All UI components (chat, profile, etc.)
- `backend/` — tRPC routers, Prisma services, AI integration
- `prisma/` — Prisma schema and migrations
- `public/` — Static assets

---
