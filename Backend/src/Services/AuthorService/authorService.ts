
const Author = require("../../Models/authorSchema")

class AuthorService{
    async addAuthor(data:typeof Author){
        const value = new Author(data);
        const result = await Author.insertOne(value);
        return result;

    }

    async getAllAuthor(){
        const value = await Author.find({})
        return value
    }
}

export const authorService = new AuthorService;