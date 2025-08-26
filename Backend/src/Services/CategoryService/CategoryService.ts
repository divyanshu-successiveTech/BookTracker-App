
const Category = require("../../Models/categoriesSchema")

class CategoryService{
    async addCategory(data:typeof Category){
        const value = new Category(data);
        const result = await Category.insertOne(value);
        return result;

    }

    async getAllCategory(){
        const value = await Category.find({});
        return value;
    }
}

export const categoryService = new CategoryService;