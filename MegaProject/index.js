const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const reachRoutes = require("./routes/Reach");
require("dotenv").config();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const PORT = process.env.PORT || 4000;

database.connect();

// ─── Security headers ─────────────────────────────────────────────────────────
app.use(helmet());

// ─── Body parsers ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:3000")
    .split(",")
    .map((o) => o.trim());

app.use(
    cors({
        origin: (origin, cb) => {
            if (!origin) return cb(null, true); // allow curl/Postman
            if (allowedOrigins.includes(origin)) return cb(null, true);
            if (/^https:\/\/study-notion-frontend-.*\.vercel\.app$/.test(origin))
                return cb(null, true);
            return cb(new Error("Not allowed by CORS: " + origin));
        },
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
);

// ─── Rate limiters ────────────────────────────────────────────────────────────
const defaultLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too many requests. Please try again later." },
});

const strictLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too many attempts. Please try again in 15 minutes." },
});

app.use(defaultLimiter);

// ─── File uploads ─────────────────────────────────────────────────────────────
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);

// ─── Cloudinary ───────────────────────────────────────────────────────────────
cloudinaryConnect();

// ─── Routes ───────────────────────────────────────────────────────────────────
// Apply strict rate limiting to auth-sensitive endpoints
app.use("/api/v1/auth/login", strictLimiter);
app.use("/api/v1/auth/sendotp", strictLimiter);
app.use("/api/v1/auth/reset-password-token", strictLimiter);

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", reachRoutes);

// Health check
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "StudyNotion API is running",
    });
});

// ─── 404 handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// ─── Central error handler ────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal server error";
    res.status(status).json({ success: false, message });
});

app.listen(PORT, () => {
});