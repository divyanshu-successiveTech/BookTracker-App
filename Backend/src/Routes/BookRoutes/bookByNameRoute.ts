import { Router } from "express";
import { bookByNameMiddleware } from "../../Middlewares/BookMiddleware/bookByName";
import { bookController } from "../../Controllers/BookController/bookController";

export const bookByNameRouter = Router();

bookByNameRouter.get("/bookByName/:name",bookByNameMiddleware.validateBookName,bookController.getBookByName)