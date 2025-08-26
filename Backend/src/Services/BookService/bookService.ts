import mongoose, { ObjectId } from "mongoose";

const Books = require("../../Models/booksSchema")

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
}

export const bookService = new BookService;