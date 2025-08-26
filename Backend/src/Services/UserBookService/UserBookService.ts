const UserBooks =require( "../../Models/userReadlist" )

interface UpsertInput {
  userId: string;
  bookId: string;
  status: "read" | "reading" | "to read" | "remove";
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

}

export const userBookService = new UserBookService