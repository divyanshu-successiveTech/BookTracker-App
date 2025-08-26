import { NextFunction, Request ,Response} from "express";
import Joi from "joi";

const categoryValidationSchema = Joi.object({
    categoryName:Joi.string().required()

})
class CreateCategory{
    create(req:Request,res:Response,next:NextFunction){

        const {error,value} = categoryValidationSchema.validate(req.body);
        if(error){
            res.json({
                statusCode:400,
                status:"Failure",
                message:"Invalid Format"
            })
        }

        req.body.validated = value;
        next();


    }
}

export const createCategory = new CreateCategory