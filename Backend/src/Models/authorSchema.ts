import mongoose from "mongoose";

const authorSchema= new mongoose.Schema({
    authorName:String
})

module.exports= mongoose.model("Author",authorSchema);