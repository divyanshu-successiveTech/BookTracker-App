import { NextFunction ,Request,Response} from "express";
import Joi from "joi";

const PutByIDFavourite = Joi.object({

    userId:Joi.string().required(),
    bookId:Joi.string().required(),
    status: Joi.string().valid("add", "remove").required(),

})

class UserFavouriteBookMiddleware{

    putFavouriteValidation(req:Request,res:Response,next:NextFunction){

        const {error,value} = PutByIDFavourite.validate(req.body);
            if(error){
                return res.json({
                    statusCode:400,
                    status:"Failure",
                    message:"Invalid Format"
                })
            }
    
        req.body.validatedUserFavouriteBook = value;

        next();

    }




}

export const userFavauriteBookMiddleware = new UserFavouriteBookMiddleware