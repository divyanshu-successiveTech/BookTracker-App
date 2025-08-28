import { Router } from "express";
import { addBook } from "../../Middlewares/BookMiddleware/addBook";
import { bookController } from "../../Controllers/BookController/bookController";

export const multipleBookAdd = Router();

multipleBookAdd.post("/addMultipleBook",addBook.validateBooksArray,bookController.saveMultipleBooks)