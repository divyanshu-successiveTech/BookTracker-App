import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  preference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  phone: String,
  role: {
    type: String,
    default: 'user'
  },
  otp: String,
});

module.exports = mongoose.model("User",userSchema,"users");