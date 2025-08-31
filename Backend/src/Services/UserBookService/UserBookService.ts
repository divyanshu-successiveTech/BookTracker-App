const UserBooks =require( "../../Models/userReadlist" )
const UserLikedBooks = require("../../Models/userLikedSchema")
const UserFavouriteBooks = require("../../Models/userFavouriteBoks")
import mongoose from "mongoose";


interface UpsertInput {
  userId: string;
  bookId: string;
  status: "read" | "reading" | "to read" | "remove";
}

interface UpsertUser {
  userId: string;
  bookId: string;
  status: "like" | "unlike";
}


interface UpsertFavourite{
    userId: string;
  bookId: string;
  status: "add" | "remove";

}

class UserBookService{

    upsertBookStatus = async (data: UpsertInput) => {
    const { userId, bookId, status } = data;

    // include remove option
    if (!["read", "reading", "to read", "remove"].includes(status)) {
        throw new Error("Invalid status value");
    }

    const userBooks = await UserBooks.findOneAndUpdate(
        { user_id: userId },
        { $setOnInsert: { user_id: userId } },
        { new: true, upsert: true }
    );

    // 🔹 remove logic inside same function
    if (status === "remove") {
        const before = userBooks.userList.length;
        userBooks.userList = userBooks.userList.filter(
            (entry: any) => entry.bookId.toString() !== bookId
        );

        if (before === userBooks.userList.length) {
            throw new Error("Book not found in user list");
        }

        await userBooks.save();
        return userBooks;
    }

    // 🔹 update or insert
    const bookIndex = userBooks.userList.findIndex(
        (entry: any) => entry.bookId.toString() === bookId
    );

    if (bookIndex > -1) {
        userBooks.userList[bookIndex].status = status;
    } else {
        userBooks.userList.push({ bookId, status });
    }

    await userBooks.save();
    return userBooks;
};



    async getUserBooks(id:String){
        const result = await UserBooks.find({ user_id: id })
        .populate({
            path: "userList.bookId",
            populate: [
            { path: "authorId", select: "authorName" },
            { path: "categoryId", select: "categoryName" }
            ]
        });        
        return result;

    }


    upsertUserLikedBooks = async ({ userId, bookId, status }: UpsertUser) => {
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(bookId)) {
            throw new Error("Invalid userId or bookId");
        }

        if (status === "like") {
            const updated = await UserLikedBooks.findOneAndUpdate(
                { user_id: userId, "likedBooks.bookId": { $ne: bookId } }, // only add if not already present
                { $push: { likedBooks: { bookId } } }, // ✅ corrected
                { upsert: true, new: true }
            );
            return updated;
        } else {
            // unlike: remove the book if present
            const updated = await UserLikedBooks.findOneAndUpdate(
                { user_id: userId },
                { $pull: { likedBooks: { bookId } } }, // ✅ corrected
                { new: true }
            );
            return updated;
        }
    };

    async getUserLikedBooks(id: string) {
        const result = await UserLikedBooks.findOne({ user_id: id })
        .populate("likedBooks.bookId");
        return result || { user_id: id, likedBooks: [] };
    }


    upsertUserFavouriteBook = async ({ userId, bookId, status }: UpsertFavourite) => {
        // Validate userId and bookId format
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(bookId)) {
            throw new Error('Invalid userId or bookId');
        }

        // Check if the user already has a favouriteBooks list
        const user = await UserFavouriteBooks.findOne({ user_id: userId });

        if (!user) {
            // If the user does not have a favourites list, create a new one if the action is 'add'
            if (status === 'add') {
            const newUser = new UserFavouriteBooks({
                user_id: userId,
                FavouriteBooks: [{ bookId }]
            });
            await newUser.save();
            return newUser; // Return the newly created user document
            } else {
            // If the user does not have a list, they cannot remove a book
            throw new Error('User does not have a favourites list to remove a book.');
            }
        } else {
            // If the user already has a favourites list, proceed with adding/removing the book
            if (status === 'add') {
            // Add the book to favourites if it's not already in the list
            const updated = await UserFavouriteBooks.findOneAndUpdate(
                { user_id: userId, 'FavouriteBooks.bookId': { $ne: bookId } }, // Ensure bookId is not already in the list
                { $push: { FavouriteBooks: { bookId } } }, // Add bookId to the FavouriteBooks array
                { new: true } // Return the updated document
            );
            return updated;
            } else if (status === 'remove') {
            // Remove the book from favourites if it's present
            const updated = await UserFavouriteBooks.findOneAndUpdate(
                { user_id: userId, 'FavouriteBooks.bookId': bookId }, // Find the book in the favourites list
                { $pull: { FavouriteBooks: { bookId } } }, // Remove the bookId from the FavouriteBooks array
                { new: true } // Return the updated document
            );
            return updated;
            } else {
            throw new Error('Invalid status. Please use "add" or "remove".');
            }
        }
    }


    async getUserFavouriteBooks(userId: string) {
        const favourite= UserFavouriteBooks.findOne({ user_id: userId })
            .populate({
                path: "FavouriteBooks.bookId", // Populate bookId inside FavouriteBooks
                populate: [
                    { path: "authorId", select: "authorName" }, // Populate authorName
                    { path: "categoryId", select: "categoryName" } // Populate categoryName
                ]
        })

        return favourite
    }


}

export const userBookService = new UserBookService