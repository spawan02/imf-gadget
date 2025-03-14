import express from "express";
import { signInSchema, signUpSchema } from "../validation/userSchema";
import { comparePassword, hashPassword } from "../utils";
import prisma from "../prismaClient";
import jwt from "jsonwebtoken"

const router = express.Router();
const JWT_PASSWORD = process.env.JWT_PASSWORD || "password";

router.post("/signup", async (req, res) => {
    const validation = signUpSchema.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({
            message: "Invalid Entry",
        });
        return;
    }

    const hashedPassword = await hashPassword(validation.data.password);

    if (!hashedPassword) {
        res.status(400).json({ message: "internal server error" });
        return;
    }
    try {
        const user = await prisma.user.create({
            data: {
                username: validation.data.username,
                password: hashedPassword,
                role: validation.data.type === "admin" ? "Admin" : "User",
            },
        });
        res.status(200).json({
            userId: user.id,
        });
    } catch (e) {
        res.status(400).json({
            message: "user already exists",
        });
    }
});


router.post('/signin', async(req,res)=>{
    
    const validation = signInSchema.safeParse(req.body)
    if(!validation.success){
        res.status(404).json({
            message: "Incorrect Details"
        })
        return
    }
    try{
        const user = await prisma.user.findUnique({
            where:{
                username: validation.data.username
            }
        })
        if(!user){
            res.status(404).json({
                message: "User not found"
            })
            return
        }
        const valid = await comparePassword(validation.data.password, user.password)
        if(!valid){
            res.status(404).json({
                mes: "Incorrect password"
            })
            return
        }
        const token = jwt.sign({
            userId: user.id,
            role: user.role
        },JWT_PASSWORD)
        res.status(200).json({token})

    }catch(e){
        res.status(400).json({  
            message: "Internal Error"
        })
    }
})
export default router