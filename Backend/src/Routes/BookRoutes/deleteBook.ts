import { Router } from "express";
import { deleteBookMiddleware } from "../../Middlewares/UserBooksMiddleware/deleteBookMiddleware";
import { bookController } from "../../Controllers/BookController/bookController";

export const deleteBookRouter = Router();

deleteBookRouter.delete("/deleteBook/:id",deleteBookMiddleware.deleteValidation,bookController.deleteBook)