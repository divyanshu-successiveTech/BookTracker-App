import { NextFunction, Request ,Response} from "express";
import Joi from "joi";

const authorValidationSchema = Joi.object({
    authorName:Joi.string().required()

})
class Author{
    create(req:Request,res:Response,next:NextFunction){

        const {error,value} = authorValidationSchema.validate(req.body);
        if(error){
            res.json({
                statusCode:400,
                status:"Failure",
                message:"Invalid Format"
            })
        }

        req.body.validatedAuthor = value;
        next();


    }
}

export const author = new Author