import { Request,Response } from "express";
import { userBookService } from "../../Services/UserBookService/UserBookService";

class UserFavouriteBooksController{



    async userFavouriteBooks(req:Request,res:Response){

        const result = await userBookService.upsertUserFavouriteBook(req.body.validatedUserFavouriteBook)
        
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

    async getFavouriteBooks(req: Request, res: Response) {
        try {
            const result = await userBookService.getUserFavouriteBooks(req.params.ValidatedFavouriteUserId);
            

            if (!result|| result.length==0){
                return res.status(200).json({
                    statusCode: 200,
                    status: "Success",
                    data: {
                        message: "Data fetched successfully",
                        result:[], 
                    },
            });


            }
            return res.status(200).json({
            statusCode: 200,
            status: "Success",
            data: {
                message: "Data fetched successfully",
                result: result.FavouriteBooks , 
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

export const userFavouriteBooksController = new UserFavouriteBooksController