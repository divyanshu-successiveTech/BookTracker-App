import { NextFunction,Request,Response } from "express";
import Joi from "joi";

const userIDValidation = Joi.object({
    userId:Joi.string().required(),
})



class GetUserBooksMiddleware{

    userBooksValidation(req:Request,res:Response,next:NextFunction){

        const {error,value} = userIDValidation.validate(req.params);
        if(error){
                return res.json({
                    statusCode:400,
                    status:"Failure",
                    message:"Invalid Format"
                })
        }

        req.params.ValidatedUserId = value.userId

        next();


    }



}

export const getUserBooksMiddleware = new GetUserBooksMiddleware