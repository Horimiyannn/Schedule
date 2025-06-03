import jwt from 'jsonwebtoken';
import express from "express";
import { prisma } from "..";
const cookieParser = require("cookie-parser");
import { authToken } from '../middleware/authToken';


const adminRouter = express.Router()
adminRouter.use(express.json())
adminRouter.use(cookieParser())


adminRouter.get("/getallusers", authToken, async (req,res)=>{
try {
   const users = await prisma.user.findMany({where:{
      role:"STUDENT"
   }})
   res.json(users).sendStatus(200)
} catch (error) {
   console.error(error)
}
})

export default adminRouter