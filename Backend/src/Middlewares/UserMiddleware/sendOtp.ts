import { NextFunction,Request,Response } from "express";
import Joi from "joi";

const mobileLoginSchema = Joi.object({
    mobile:Joi.string().required()
})

class SendOtp{
    send(req:Request,res:Response,next:NextFunction){

        const {error,value} = mobileLoginSchema.validate(req.body);


        if(error){
            res.send({statusCode:400,
                status:"failure",
                message:"Invalid data"

            })
        }

        req.body.validatedPhone= value;
        next();

    }
}

export const sendotp = new SendOtp;