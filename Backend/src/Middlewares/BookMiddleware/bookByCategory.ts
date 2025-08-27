import { NextFunction ,Response,Request} from "express";
import Joi from "joi"

const GetByAuthor = Joi.object({
    id:Joi.string().required()

})

class getBookByCategory{
    validateInput(req:Request,res:Response,next:NextFunction){
        
        const {error,value} = GetByAuthor.validate(req.params );

        if(error){
            return res.status(400).json({
                statusCode:400,
                status:"Failure",
                message:"Invalid Format"
            })
        }

        (req as any).validatedCategory = {
            category: value
        };
        next();
    }
}

export const getBookByCategoryMiddleware = new getBookByCategory