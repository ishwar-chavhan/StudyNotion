const express = require("express");
const app = express(); 

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
require("dotenv").config();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;

database.connect();

app.use(express.json());
app.use(cookieParser());


const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:3000")
    .split(",")
    .map((o) => o.trim());

app.use(
    cors({
        origin: (origin, cb) => {
            // allow curl/Postman (no Origin header)
            if (!origin) return cb(null, true);
            if (allowedOrigins.includes(origin)) return cb(null, true);
            // allow all your Vercel preview deploys
            if (/^https:\/\/study-notion-frontend-.*\.vercel\.app$/.test(origin)) return cb(null, true);
            return cb(new Error("Not allowed by CORS: " + origin));
        },
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
);


app.use(
    fileUpload({
        useTempFiles : true,
        tempFileDir : "/tmp"
    }) 
)

cloudinaryConnect();

app.use("/api/v1/auth" , userRoutes);
app.use("/api/v1/profile" , profileRoutes);
app.use("/api/v1/course" , courseRoutes);
app.use("/api/v1/payment" , paymentRoutes );

app.get("/" , (req , res)=>{
    return res.json({
        success : true,
        message : "your server is up and running"
    })
})

app.listen(PORT , ()=>{
    console.log(`app is running at ${PORT}`);
})