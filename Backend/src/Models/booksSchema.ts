import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
    name:String,
    shortDescription:String,
    readingTime:String,
    pages:Number,
    likes:Number,
    authorId:{
        type: mongoose.Schema.ObjectId,
        ref: 'Author'
    },
    categoryId:{
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    },
    coverImage: String
})

module.exports= mongoose.model("Books",booksSchema);