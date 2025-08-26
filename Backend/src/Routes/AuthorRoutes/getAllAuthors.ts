import { Router } from "express";
import { authorController } from "../../Controllers/AuthorController/authorController";

export const getAllAuthorRouter = Router();

getAllAuthorRouter.get("/allAuthor",authorController.getAllAuthor)