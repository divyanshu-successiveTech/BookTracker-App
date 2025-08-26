import { NextFunction,Request,Response } from "express";
import Joi from "joi";
import bcrypt from 'bcrypt';


export const registerSchema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(30).required(),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    preference:Joi.string().required(),
    phone:Joi.string().required()
})

class UserRegister {

    register=(schema:Joi.ObjectSchema)=>{
        return async(req:Request,res:Response,next:NextFunction)=>{
            const {error,value}= schema.validate(req.body);
            if(error){
                return res.status(400).json({statuscode:400,
                    status:"Failure",
                    message:"Invalid Format"
                })
            }
            const pass = await bcrypt.hash(value.password,7)
            value.password=pass;

            req.body.validateValues = value;

            

            next();

        }



    }

}

export const userRegister = new UserRegister;