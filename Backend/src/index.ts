import express, { NextFunction, Request,Response } from "express";
import mongoose from "mongoose";
import { allRouter } from "./Routes/allRoutes";
import dotenv from "dotenv";
import cors from "cors"; 

dotenv.config()


const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if you use cookies/sessions later
  })
);  
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/PracticeDB");

app.use("/",allRouter);


app.get("/",(req:Request,res:Response,next:NextFunction)=>{
    res.send("working");
})

app.listen(5000,()=>{
    console.log("Running the server " );
})