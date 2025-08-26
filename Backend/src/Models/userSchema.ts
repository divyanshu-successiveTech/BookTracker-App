import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:String,
    password:String,
    preference:{type:mongoose.Schema.ObjectId,
        ref:'Category'
    },
    phone:String,
    otp:String,
})

module.exports = mongoose.model("User",userSchema,"users");