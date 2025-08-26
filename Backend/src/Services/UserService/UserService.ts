const User = require("../../Models/userSchema")
const OtpStore = require("../../Models/OtpSchema")

class UserService{
    async save(data:typeof User){
        const values = new User(data)
        const result = await User.insertOne(values);
        return result;
    }


    async finding(userName:String){
        const result = await User.findOne({userName:userName});
        return result;
    }

    async findByPhone(phone:String){
        const result = await User.findOne({phone:phone});
        return result;
    }

    async sendOtp(data:typeof OtpStore){
        const values = new OtpStore(data);
        const result = await OtpStore.insertOne(values)
        return result;
    }

    async findOtp(data:String){
        const result = OtpStore.findOne({otp:data});
        return result
    }

    async findOtpAndDelete(data:String){
        const result = OtpStore.findOneAndDelete({otp:data});
        return result;
    }
}

export const userService = new UserService