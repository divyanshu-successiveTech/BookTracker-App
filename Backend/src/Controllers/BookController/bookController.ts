import { Request ,Response} from "express";
import { bookService } from "../../Services/BookService/bookService";

class BookController{
    async saveBook(req:Request,res:Response){
        const result = await bookService.addBook(req.body.ValidatedBook);
        res.json({statusCode:200,
            status:"Success",
            data:{message:"Saved Successfully",
                result:result
            }
        })
        

    }

    async getBook(req:Request,res:Response){
        const { id } = req.body.ValidatedBookSchema;
        const result = await bookService.fetchBook(id);
        if(!result || result.length === 0){
            res.json({
                statuscode:400,
                status:"Failure",
                message:"No book found"
            })
        }

        res.json({
            statuscode:200,
            status:"Success",
            data:result
        })
    }


    async getBookByAuthor(req:Request,res:Response){

        const {id} = (req as any).validatedAuthor.bookAuthor
        const result = await bookService.getBookByAuthor(id)

        if(!result || result.length === 0){
            return res.json({
                statuscode:404,
                status:"Failure",
                message:[]
            })
        }

        return res.json({
            statuscode:200,
            status:"Success",
            data:result
        })

    }

    async getBookBycategory(req:Request,res:Response){

        const {id} = (req as any).validatedCategory.category
        const result = await bookService.getBookByCategory(id)

        if(!result || result.length === 0){
            return res.json({
                statuscode:404,
                status:"Failure",
                data:[]
            })
        }

        return res.json({
            statuscode:200,
            status:"Success",
            data:result
        })

    }

    async getAllBooks(req:Request,res:Response){
        const result = await bookService.getAllBooks()

        if(!result || result.length === 0){
            return res.json({
                statuscode:404,
                status:"Failure",
                message:"No book found"
            })
        }

        return res.json({
            statuscode:200,
            status:"Success",
            data:result
        })

        

    }

    async changeCount(req:Request,res:Response){
        const {id,likeChange} = req.body // like = +1 or -1
        const result = await bookService.changeLike(id,likeChange)

        if(!result ){
            return res.json({
                statuscode:404,
                status:"Failure",
                message:"No book found"
            })
        }

            console.log("PRINTING",result)


        return res.json({
            statuscode:200,
            status:"Success",
            data:result
        })


    }


    async getBookByName(req:Request,res:Response){
        const result = await bookService.findBookByName(req.params.validatedBookName)

        if(!result ){
            return res.json({
                statuscode:404,
                status:"Failure",
                message:"No book found"
            })
        }

        return res.json({
            statuscode:200,
            status:"Success",
            data:result
        })

    }
    
}

export const bookController = new BookController