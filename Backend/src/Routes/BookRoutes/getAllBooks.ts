import { Router } from "express";
import { bookController } from "../../Controllers/BookController/bookController";

export const getAllBooks = Router();

getAllBooks.get("/allBooks",bookController.getAllBooks)