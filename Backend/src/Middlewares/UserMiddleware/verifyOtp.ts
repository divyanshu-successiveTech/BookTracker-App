import { NextFunction,Request,Response } from "express";
import Joi from "joi";

const verifyOtpSchema = Joi.object({
  inputMobile:Joi.string().required(),
  inputOtp:Joi.string().required()
})

class VerifyOtp{

    verify(req:Request,res:Response,next:NextFunction){

        const {error,value}= verifyOtpSchema.validate(req.body);

        if(error){
            res.send({statusCode:400,
                status:"failure",
                message:"Invalid data"

            })

        }

        req.body.ValidatedInput = value;
        next()


    }
}

export const verifyotp = new VerifyOtp