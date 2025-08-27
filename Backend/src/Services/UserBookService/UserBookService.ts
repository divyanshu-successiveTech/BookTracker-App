const UserBooks =require( "../../Models/userReadlist" )
const UserLikedBooks = require("../../Models/userLikedSchema")
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

}

export const userBookService = new UserBookService