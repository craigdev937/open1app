import express from "express";
import { CSchema } from "../validation/Schema.ts";
import { CService } from "../service/ChatService.ts";

class OpenAI {
    Chat: express.Handler = async (req, res, next) => {
        try {
            const C = CSchema.safeParse(req.body);
            if (!C.success) {
                res.status(400).json(C.error.format());
                return;
            };
            const { prompt, convId } = req.body;
            const response = await CService.sendMessage(prompt, convId);            
            return res
                .status(201)
                .json({ message: response.message });
        } catch (error) {
            res
                .status(500)
                .json({
                    success: false,
                    message: "Error getting the Prompt!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            next(error);
        }
    };

    FetchAll: express.Handler = async (req, res, next) => {
        
    };
};

export const OPEN: OpenAI = new OpenAI();



