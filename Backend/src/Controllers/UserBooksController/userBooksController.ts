import { Request,Response } from "express";
import { userBookService } from "../../Services/UserBookService/UserBookService";

class UserBookController{
    
    async addOrUpdateList(req:Request,res:Response){
        const result = await userBookService.upsertBookStatus(req.body.validatedUserBook)
        if(!result){
            return res.status(400).json({
                statusCode:400,
                status:"Failure",
                message:"Data not saved",

            })
        }


        res.status(200).json({
                statusCode:200,
                status:"Success",
                data:{message:"Data saved Successfully",
                    result : result
                }
        })

    
    }

    async getUserBookList(req:Request,res:Response){
        const result = await userBookService.getUserBooks(req.params.ValidatedUserId)

        if(!result){
            return res.status(400).json({
                statusCode:400,
                status:"Failure",
                message:"Data not available",

            })
        }

        res.status(200).json({
                statusCode:200,
                status:"Success",
                data:{message:"Data fetched Successfully",
                    result : result
                }
        })

        
    }
}

export const userBookController = new UserBookController