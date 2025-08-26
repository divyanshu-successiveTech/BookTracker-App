import { Router } from "express";
import { getBookByCategoryMiddleware } from "../../Middlewares/BookMiddleware/bookByCategory";
import { bookController } from "../../Controllers/BookController/bookController";

export const bookByCategory = Router()

bookByCategory.get("/category/:id",getBookByCategoryMiddleware.validateInput,bookController.getBookBycategory)