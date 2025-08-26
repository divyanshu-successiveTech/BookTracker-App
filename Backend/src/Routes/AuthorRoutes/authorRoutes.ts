import { Router } from "express";
import { addAuthorRouter } from "./addAuthorRoute";
import { getAllAuthorRouter } from "./getAllAuthors";

export const authorRouter = Router();

authorRouter.use(addAuthorRouter);
authorRouter.use(getAllAuthorRouter);