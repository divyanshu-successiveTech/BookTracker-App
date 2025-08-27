import { Request,Response } from "express";
import { userBookService } from "../../Services/UserBookService/UserBookService";

class UserLikedBooksController{



    async userlikedBooks(req:Request,res:Response){

        const result = await userBookService.upsertUserLikedBooks(req.body.validatedUserLikedBook)
        
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
                data:{message:"Data saved Successfully",
                    result : result
                }
        })

    }

    async getLikedBooks(req: Request, res: Response) {
        try {
            const result = await userBookService.getUserLikedBooks(req.params.ValidatedUserId);

            return res.status(200).json({
            statusCode: 200,
            status: "Success",
            data: {
                message: "Data fetched successfully",
                result: result.likedBooks || [], 
            },
            });
        } catch (err: any) {
            return res.status(500).json({
            statusCode: 500,
            status: "Failure",
            message: err.message || "Internal server error",
            });
        }
    }


}

export const userLikedBooksController = new UserLikedBooksController