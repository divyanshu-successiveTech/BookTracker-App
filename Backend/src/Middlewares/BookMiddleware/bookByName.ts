import { NextFunction ,Request,Response} from "express";
import Joi from "joi";

const BookNameValidator = Joi.object({
    name:Joi.string(),
})

class BookByNameMiddleware{

    validateBookName(req:Request,res:Response,next:NextFunction){

        const {error,value} = BookNameValidator.validate(req.params);

        if(error){
            return res.json({
                statusCode:400,
                status:"Failure",
                message:"Invalid Format"
            })
        }

        req.params.validatedBookName = value.name
        next();


        

    }
}

export const bookByNameMiddleware = new BookByNameMiddleware;