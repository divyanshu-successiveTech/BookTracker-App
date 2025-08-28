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
    content:Joi.string(),


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


   validateBooksArray(req:Request, res:Response, next:NextFunction) {
        const { books } = req.body;
        if (!Array.isArray(books) || books.length === 0) {
            return res.status(400).json({ statusCode: 400, message: "Request body must contain a non-empty array of books" });
        }

        
        for (let i = 0; i < books.length; i++) {
            const book = books[i];
            const requiredFields = [
            "name",
            "shortDescription",
            "readingTime",
            "pages",
            "likes",
            "authorId",
            "categoryId",
            "coverImage",
            "content",
            ];

            for (const field of requiredFields) {
            if (
                book[field] === undefined ||
                book[field] === null ||
                (typeof book[field] === "string" && book[field].trim() === "")
            ) {
                return res.status(400).json({
                statusCode: 400,
                message: `Book at index ${i} is missing or has invalid field: ${field}`,
                });
            }
            }

            
            if (typeof book.pages !== "number" || typeof book.likes !== "number") {
            return res.status(400).json({
                statusCode: 400,
                message: `Book at index ${i} has invalid type for 'pages' or 'likes', must be numbers`,
            });
            }
        }

        next(); 
    }
}

export const addBook = new AddBook;