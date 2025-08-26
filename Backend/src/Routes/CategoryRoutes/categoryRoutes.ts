import { Router } from "express";
import { addCategoryRouter } from "./createCategory";
import { getAllCategoriesRouter } from "./getAllCategories";

export const categoryRouter = Router();

categoryRouter.use(addCategoryRouter)
categoryRouter.use(getAllCategoriesRouter)