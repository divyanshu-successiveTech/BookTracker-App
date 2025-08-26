import { Router } from "express";
import { addBook } from "../../Middlewares/BookMiddleware/addBook";
import { bookController } from "../../Controllers/BookController/bookController";

export const addBookRouter = Router();

addBookRouter.post("/addBook",addBook.add,bookController.saveBook)