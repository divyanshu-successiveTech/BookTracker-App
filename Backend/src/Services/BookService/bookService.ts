import mongoose, { ObjectId } from "mongoose";

const Books = require("../../Models/booksSchema")

interface BookInterface {
  name: string;
  shortDescription: string;
  readingTime: string;
  pages: number;
  likes: number;
  authorId: string;
  categoryId: string;
  coverImage: string;
  content: string;
}


class BookService{
    async addBook(data : typeof Books){
        const values = new Books(data);
        const result = await Books.insertOne(values);
        return result;
    }

    async fetchBook(id:ObjectId){
        const value = await Books.findById(id);
        return value;
    }

    async getBookByAuthor(id:ObjectId){
        const value = await Books.find({authorId : id})
        return value;
    }

    async getBookByCategory(id:ObjectId){
        const value = await Books.find({categoryId : id})
        return value;
    }

    async getAllBooks(){
        const value = await Books.find({});
        return value;

    }

    async changeLike(id: string, likeChange: number) {
        if (!id || likeChange === undefined) {
        throw new Error("Book id and like change value are required");
        }

        // Update likes automatically
        const updatedBook = await Books.findByIdAndUpdate(
        id,
        { $inc: { likes: likeChange } }, // increment or decrement
        { new: true } // return updated document
        );

        if (!updatedBook) {
        throw new Error("Book not found");
        }

        return updatedBook;
    }

    async findBookByName(name: string) {
        if (!name) return null;

        const regex = new RegExp(name, "i"); 

        const books = await Books.find({ name: { $regex: regex } });
        return books;
    }

    async deleteBook(id:string){

        const deletedBook = await Books.findByIdAndDelete(id);
        return deletedBook
    }

    async addMultipleBooks(data:[BookInterface]){
        const insertedBooks = await Books.insertMany(data)
        return insertedBooks
    }
}

export const bookService = new BookService;