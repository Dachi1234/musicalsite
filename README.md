# Musical School Website

Full-stack web application for a modern music school. Students can register, set their musical interests, and get course recommendations automatically tailored to them.

## Features

- **Authentication**: Register/Login powered by PostgreSQL
- **Interests Profile**: Users pick genres, bands, instruments, styles
- **Dynamic Recommendations**: Courses are tagged with interests; page highlights which ones match the user
- **Vibrant UI**: React + Vite frontend with animated cards and stateful feedback
- **Comprehensive Backend**: Node.js/Express API, migrations, seed data, PostgreSQL via Neon

## Tech Stack

- **Frontend**: React 19 + Vite, React Router
- **Backend**: Node.js 20 + Express
- **Database**: PostgreSQL (Neon) accessed via `pg`
- **Tooling**: npm scripts, `dotenv`, custom migration runner

## Getting Started

```bash
git clone https://github.com/Dachi1234/musicalsite.git
cd musicalsite
npm install
```

### Environment Variables

Create `.env` (never commit it) based on `.env.example`:

```
DATABASE_URL=postgresql://user:password@host/db?sslmode=require
```

### Database Migrations

```bash
npm run migrate
```

This creates tables (`courses`, `users`, `interests`, `user_interests`, `course_interests`) and inserts seed data (courses, admin user, example interests, course-interest links).

### Development Servers

- **Backend**: `npm start` (http://localhost:3000)
- **Frontend**: `npm run dev:frontend` (http://localhost:5173)

Vite proxies `/api/*` calls to the Express server, so both should run simultaneously.

## Key API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/register` | Register user (username, password, optional email) |
| POST | `/api/login` | Authenticate user, returns profile (without password) |
| GET | `/api/interests` | List all available interests |
| GET/POST | `/api/users/:id/interests` | Fetch/update user interests |
| GET | `/api/courses?userId=:id` | Courses with `isForYou` + matching tags |
| POST | `/api/courses/:id/interests` | Attach interests to a course |

## Project Structure

```
.
├── server/
│   ├── config/           # database connection
│   ├── data/             # legacy local data (unused now)
│   └── migrations/       # SQL + runner script
├── src/
│   ├── pages/            # React pages (Login, Register, Main, Courses, Profile)
│   ├── App.jsx
│   └── index.css
├── README.md
├── package.json
└── vite.config.js
```

## Deployment Checklist

- Add production `DATABASE_URL` as an environment secret (e.g., GitHub Actions, hosting provider)
- Run `npm run build` for frontend (if deploying as static assets)
- Optional: configure CI/CD (GitHub Actions) for lint/test/migrations

## Roadmap

- Password hashing (bcrypt) + tokens
- Course enrollment + progress tracking
- Teacher/admin dashboards
- Email verification & notifications

---

Enjoy building the rest of the musical school experience! 🎶

