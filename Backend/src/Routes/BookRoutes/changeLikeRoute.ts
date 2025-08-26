import { Router } from "express";
import { bookController } from "../../Controllers/BookController/bookController";

export const likeRouter = Router();

likeRouter.put("/likechange",bookController.changeCount)