import { NextFunction ,Request,Response} from "express";
import Joi from "joi";

const PutByID = Joi.object({

    userId:Joi.string().required(),
    bookId:Joi.string().required(),
    status: Joi.string().valid("like", "unlike").required(),

})

class UserLikedBookMiddleware{

    putValidation(req:Request,res:Response,next:NextFunction){

        const {error,value} = PutByID.validate(req.body);
            if(error){
                return res.json({
                    statusCode:400,
                    status:"Failure",
                    message:"Invalid Format"
                })
            }
    
        req.body.validatedUserLikedBook = value;

        next();

    }




}

export const userlikedBookMiddleware = new UserLikedBookMiddleware