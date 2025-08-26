import { Router } from "express";
import { createCategory } from "../../Middlewares/CategoryMiddlware/createMiddleWare";
import { categoryController } from "../../Controllers/CategoryController/CategoryController";

export const addCategoryRouter = Router();

addCategoryRouter.post("/createCategory",createCategory.create,categoryController.saveCategory)