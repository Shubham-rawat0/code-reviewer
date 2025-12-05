import type { Response,Request } from "express";
import aiService from "../services/ai.service.js"
import z from "zod"

const codeSchema=z.object({
    code:z.string()
})

export const getReview=async(req:Request, res:Response) => {
   try {
    const parsed = codeSchema.safeParse(req.body);
 
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid query parameters",
        errors: parsed.error,
      });
    }
   const { code } = parsed.data;
   const response = await aiService(code);
 
   res.status(200).send(response);
   } catch (error) {
    res.status(500).json({message:"Something unexpected occured"})
   }
}