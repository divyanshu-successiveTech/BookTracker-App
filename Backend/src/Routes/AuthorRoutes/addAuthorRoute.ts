import { Router } from "express";
import { author } from "../../Middlewares/AuthorMiddleware/createAuthor";
import { authorController } from "../../Controllers/AuthorController/authorController";


export const addAuthorRouter = Router();

addAuthorRouter.post("/createAuthor",author.create,authorController.saveAuthor) 