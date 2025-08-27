const mongoose = require("mongoose");

const userLikedBooksSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
    unique: true
  },
  likedBooks: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books",
        required: true
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("UserLikedBooks", userLikedBooksSchema);
