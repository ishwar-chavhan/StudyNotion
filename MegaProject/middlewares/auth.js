const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.auth = async (req, res, next) => {
    try {

        console.log("before");
        const token = req.cookies?.token || req.body?.token || req.header("Authorization")?.replace("Bearer ", "");
        console.log("after");
        console.log(token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "token is missing"
            });
        }

        try {
            let decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            // decode = toObject(decode);
            req.user = decode;
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                success: false,
                message: "token is invalid"
            })
        }
        console.log("token me problem hai")

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error while authorization"
        })
    }
}


exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: 'this is protected route for Student Only'
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "user role cannot be verified please try again"
        });

    }
}



exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: 'this is protected route for Instructor Only'
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "user role cannot be verified please try again"
        });

    }
}




exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: 'this is protected route for Admin Only'
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "user role cannot be verified please try again"
        });

    }
}