import { NextFunction ,Request,Response} from "express";
import Joi from "joi";

const PutByID = Joi.object({

    userId:Joi.string().required(),
    bookId:Joi.string().required(),
    status: Joi.string().valid("read", "reading", "to read","remove").required(),

})

class UserBookMiddleware{

    putValidation(req:Request,res:Response,next:NextFunction){

        const {error,value} = PutByID.validate(req.body);
            if(error){
                return res.json({
                    statusCode:400,
                    status:"Failure",
                    message:"Invalid Format"
                })
            }
    
        req.body.validatedUserBook = value;

        next();

    }




}

export const userBookMiddleware = new UserBookMiddleware