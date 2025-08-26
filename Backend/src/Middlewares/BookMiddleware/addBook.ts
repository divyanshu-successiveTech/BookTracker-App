import { NextFunction, Request ,Response } from "express";
import Joi from "joi";

const BookValidatorSchema = Joi.object({
    name:Joi.string().required(),
    shortDescription:Joi.string().required(),
    readingTime:Joi.string().required(),
    pages:Joi.number().required(),
    likes:Joi.number().required(),
    authorId:Joi.string().required(),
    categoryId:Joi.string().required(),
    coverImage:Joi.string(),


})

class AddBook{
    add(req:Request,res:Response,next:NextFunction){
        const {error,value} = BookValidatorSchema.validate(req.body);

        if(error){
            res.json({
                statusCode:400,
                status:"Failure",
                message:"Invalid Format"
            })
        }

        req.body.ValidatedBook = value;

        next();

    }
}

export const addBook = new AddBook;