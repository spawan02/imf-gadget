import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import { PrismaClient } from '@prisma/client';

const db = new PrismaClient()
const app = express()
const PORT = 3000;

dotenv.config()
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Hello here")
})

app.listen(PORT,()=>{
    console.log("Server is listening on port 3000")
})