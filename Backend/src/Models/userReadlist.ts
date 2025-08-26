import mongoose from "mongoose";

const userSchemaList = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User", // reference your User collection
    required: true,
    unique: true
  },
  userList: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books", 
        required: true
      },
      status: {
        type: String,
        enum: ["read", "reading", "to read"],
        required: true
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("UserBooks", userSchemaList);
