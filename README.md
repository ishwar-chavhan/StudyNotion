# StudyNotion

A full-stack ed-tech platform where students can browse and purchase courses, and instructors can create and manage their own course content. Deployed on **Vercel** (frontend) + **Render** (backend).

---

## Project Structure

```
megaProjectFrontEnd/          ← React CRA Frontend (Vercel)
├── src/
│   ├── services/operation/   ← API call functions
│   ├── components/           ← Reusable UI components
│   ├── pages/                ← Page-level components
│   └── slice/                ← Redux slices
├── public/
├── .env                      ← Frontend env vars (not committed)
├── .env.example              ← Frontend env example
├── vercel.json               ← Vercel routing config
└── package.json              ← Frontend dependencies

MegaProject/                  ← Express Backend (Render)
├── controllers/              ← Route handlers
├── models/                   ← Mongoose models
├── routes/                   ← Express routers
├── middlewares/              ← auth, rate-limit guards
├── utils/                    ← mailSender, imageUploader
├── config/                   ← DB, Cloudinary, Razorpay setup
├── templates/                ← HTML email templates
├── .env                      ← Backend env vars (not committed)
├── .env.example              ← Backend env example ← see this file
├── .gitignore
└── package.json
```

---

## Getting Started

### 1. Clone the repo

```sh
git clone https://github.com/ishwar-chavhan/StudyNotion.git
cd StudyNotion
```

### 2. Backend setup

```sh
cd MegaProject
cp .env.example .env        # fill in your real values
npm install
npm run dev                 # starts on port 4000
```

### 3. Frontend setup

```sh
# From the repo root
cp .env.example .env        # fill in REACT_APP_BASE_URL etc.
npm install
npm start                   # starts on port 3000
```

### 4. Run both together

```sh
npm run dev                 # concurrently starts client + server
```

---

## Environment Variables

### Backend (`MegaProject/.env`) — see [`MegaProject/.env.example`](./MegaProject/.env.example)

| Variable | Description |
|---|---|
| `PORT` | Server port (default 4000) |
| `MONGODB_URL` | MongoDB Atlas connection string |
| `JWT_SECRET` | Long random string for signing JWTs |
| `MAIL_HOST` | SMTP host (e.g. `smtp.gmail.com`) |
| `MAIL_USER` | Sender email address |
| `MAIL_PASS` | App-specific password (not your real password) |
| `CLOUD_NAME` | Cloudinary cloud name |
| `API_KEY` | Cloudinary API key |
| `API_SECRET` | Cloudinary API secret |
| `FOLDER_NAME` | Cloudinary upload folder |
| `RAZORPAY_KEY` | Razorpay key ID |
| `RAZORPAY_SECRET` | Razorpay key secret |
| `CORS_ORIGINS` | Comma-separated allowed origins (e.g. your Vercel URL) |
| `FRONTEND_URL` | Your Vercel URL — used in password-reset emails |

### Frontend (`.env`)

| Variable | Description |
|---|---|
| `REACT_APP_BASE_URL` | Backend API base URL (e.g. `https://your-render-app.onrender.com/api/v1`) |
| `REACT_APP_RAZORPAY_KEY` | Razorpay publishable key (same as `RAZORPAY_KEY`) |

---

## Security Notes

- **JWT_SECRET** must be a strong random value (≥32 chars). Rotate it if it was ever committed.
- **Razorpay / Cloudinary / MongoDB** credentials in `.env` were previously exposed in git history. **Rotate all of them** before deploying.
- Password reset tokens are now **hashed** before storage — the raw token only appears in the reset email.
- OTP values are **never** returned in API responses.
- Admin accounts **cannot** be self-registered; only `Student` and `Instructor` are allowed from the signup form.
- Rate limiting: `/auth/login`, `/auth/sendotp`, `/auth/reset-password-token` → 10 requests per 15 min.
- All API routes are protected by Helmet (security headers).

## Deploying to Render

After deploying the backend, set the following environment variables in Render's dashboard:

```
FRONTEND_URL=https://your-app.vercel.app
CORS_ORIGINS=https://your-app.vercel.app
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Redux Toolkit, Tailwind CSS, Swiper, react-toastify |
| Backend | Node.js 18+, Express 5, Mongoose 9 |
| Database | MongoDB Atlas |
| Media | Cloudinary |
| Payments | Razorpay |
| Auth | JWT (HTTP-only cookie + Authorization header) |
| Security | Helmet, express-rate-limit, bcrypt |
| Email | Nodemailer (Gmail SMTP) |
| Deployment | Vercel (frontend), Render (backend) |