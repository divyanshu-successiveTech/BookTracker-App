import { NextFunction,Response,Request} from "express";
import Joi from "joi";

const loginSchema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(30).required(),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})
class UserLogin{
    login(req:Request,res:Response,next:NextFunction){

        const {error,value} = loginSchema.validate(req.body);

        if(error){
            return res.send({
                statusCode:400,
                status:"Failure",
                message:"Invalid Format"
            })
        }

       req.body.validatedValues = value;
       
       next();

    }
}

export const userLogin = new UserLogin;