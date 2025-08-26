import { Router } from "express";
import { categoryController } from "../../Controllers/CategoryController/CategoryController";

export const getAllCategoriesRouter = Router();

getAllCategoriesRouter.get("/allCategories",categoryController.getAllCatergory)