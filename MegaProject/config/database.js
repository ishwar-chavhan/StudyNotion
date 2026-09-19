const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("db successfully connected");
    }).catch((err)=>{
        console.error(err);
        console.log("error while connecting db");
        process.exit(1);
    })
}