import { Request ,Response} from "express";
import { categoryService } from "../../Services/CategoryService/CategoryService";

class CategoryController{
    async saveCategory(req:Request,res:Response){
        const result = await categoryService.addCategory(req.body.validated);

        if(result){

            res.send({
                statusCode:200,
                status:"Success",
                data:{message:"Data saved Successfully",
                    result : result
                }
            })

        }else{
            res.send({
                statusCode:400,
                status:"Failure",
                message:"Data not saved",
                               
            })
        }

    }

    async getAllCatergory(req:Request,res:Response){

        const result = await categoryService.getAllCategory();
        
        if(!result || result.length === 0){
            return res.json({
                statuscode:404,
                status:"Failure",
                message:"No Categoiries found"
            })
        }

        return res.json({
            statuscode:200,
            status:"Success",
            data:result
        })

    }
}

export const  categoryController = new CategoryController