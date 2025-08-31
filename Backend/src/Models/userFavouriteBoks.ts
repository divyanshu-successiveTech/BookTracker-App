import mongoose from "mongoose";


const userFavouriteBooksSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
    unique: true
  },
  FavouriteBooks: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books",
        required: true
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("UserFavouriteBooks", userFavouriteBooksSchema);
