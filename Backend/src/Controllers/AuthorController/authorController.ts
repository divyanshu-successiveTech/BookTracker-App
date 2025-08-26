import { Request ,Response} from "express";
import { authorService } from "../../Services/AuthorService/authorService";

class AuthorController{
    async saveAuthor(req:Request,res:Response){
        const result = await authorService.addAuthor(req.body.validatedAuthor);

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

    async getAllAuthor(req:Request,res:Response){
        const result = await authorService.getAllAuthor()

        if(!result || result.length === 0){
            return res.json({
                statuscode:404,
                status:"Failure",
                message:"No Author found"
            })
        }

        return res.json({
            statuscode:200,
            status:"Success",
            data:result
        })
        
    }
}

export const  authorController = new AuthorController