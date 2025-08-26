import { Request,Response } from "express";
import { userService } from "../../Services/UserService/UserService";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


class UserController{
    async saveUser(req:Request,res:Response){
        const result = await userService.save(req.body.validateValues)
        res.json({statusCode:200,
            status:"Success",
            data:{message:"Saved Successfully",
                result:result
            }
        })
    
    }

    async findUser(req:Request,res:Response){
        
        const {userName,password} = req.body.validatedValues
        const result = await userService.finding(userName);
        const secret = process.env.JWT_SECRET || '';
        console.log(result);


        if(result){
            if(await bcrypt.compare(password,result.password)){
                let token = jwt.sign({ userId: result._id, userName: result.userName },secret,{expiresIn:'1h'});
                res.status(200).send({statusCode:200,
                    status:"Success",
                    data:{message:"Logged in successfully",
                        token:token,
                        user: {
                            _id: result._id,
                            userName: result.userName,
                            preference: result.preference,
                            phone: result.phone
                        }
                    }
                })

            }else{
                res.status(400).send({
                    statusCode:400,
                    status:"Failure",
                    message:"Invalid password"
                })
            }
        }else{
            res.send({
                statusCode:400,
                status:"Failure",
                message:"User does not exist"
            })
        }
    }


    async sendOtp(req:Request,res:Response){

    
        const mobile = req.body.validatedPhone.mobile
        const otp = Math.floor(1000 + Math.random() * 9000).toString(); 
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        const result = await userService.sendOtp({mobile,otp,expiresAt});

        console.log(`OTP for ${mobile}: ${otp} (expires at ${new Date(expiresAt)})`);

        res.send({OTP:otp})
    }


    async verifyOtp(req:Request,res:Response){
        

        const {inputMobile,inputOtp} = req.body.ValidatedInput
        const entry = await userService.findOtp(inputOtp)
        const secret = process.env.JWT_SECRET || ""
        let token = "";
        if (!entry){
            res.send({ statusCode: 404, 
                status:"Failure",
                message: "Invalid OTP"
            })
        }

        const { mobile ,otp, expiresAt } = entry;

        if(mobile == inputMobile){

            if (Date.now() > expiresAt) {

                res.send( { statusCode:400,
                    status: "Failure", 
                    message: 'OTP expired' 
                })
            }

            if (otp !== inputOtp) {
                res.send({ statusCode:400,
                    status: "Failure", 
                    message: 'Invalid OTP'
                })
            }

            const result = await userService.findByPhone(mobile)
            if(result){

                token = jwt.sign({mobile},secret)
                const deleted = await userService.findOtpAndDelete(otp)
                console.log("Deleted Otp ",deleted) 
            }
        
            res.send({
                statusCode:200,
                status:"Success",
                data:{message:"OTP verified",
                    token : token
                }
            })

        }else{
            res.send({
                statusCode:404,
                status:"Failure",
                message:"Mobile number not found"
            })
        }

        
        
    }
}

export const userController = new UserController;