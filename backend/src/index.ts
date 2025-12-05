import dotenv from "dotenv"
dotenv.config()
import express from "express";
import aiRoutes from "./routes/ai.routes.js"
import cors from 'cors'

const port=process.env.PORT
const app=express()
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json())

app.use("/ai",aiRoutes)

app.listen(port,()=>{
    console.log("server running on",port)
})