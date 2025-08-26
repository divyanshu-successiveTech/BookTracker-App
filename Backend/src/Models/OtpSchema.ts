import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    mobile:String,
    otp:String,
    expiresAt:Date
})

module.exports = mongoose.model("OtpStore",otpSchema);