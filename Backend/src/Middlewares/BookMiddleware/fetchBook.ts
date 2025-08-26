import { NextFunction ,Request,Response} from "express";
import Joi from "joi";

const GetBookSchema = Joi.object({
    id:Joi.string().required()

})

class FetchBooks{
    validateInput(req:Request,res:Response,next:NextFunction){
        const {error,value} = GetBookSchema.validate(req.body);

        if(error){
            res.json({
                statusCode:400,
                status:"Failure",
                message:"Invalid Format"
            })
        }
        console.log(value);

        req.body.ValidatedBookSchema = value
        next();
    }
}

export const fetchBooks = new FetchBooks