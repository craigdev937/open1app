import express from "express";
import { client } from "../middleware/openai.ts";
import { CSchema } from "../validation/Schema.ts";
import { conRepo } from "../data/ConREP.ts";

class OpenAI {
    Chat: express.Handler = async (req, res, next) => {
        try {
            const C = CSchema.safeParse(req.body);
            if (!C.success) {
                res.status(400).json(C.error.format());
                return;
            };
            const { prompt, convId } = req.body;
            const response = await client.responses.create({
                model: "gpt-5.4-nano-2026-03-17",
                input: prompt,
                temperature: 0.2,
                max_output_tokens: 100,
                previous_response_id: conRepo.getLastResID(convId)
            });
            conRepo.setLastResID(convId, response.id);
            
            return res
                .status(201)
                .json({ message: response.output_text });
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
};

export const OPEN: OpenAI = new OpenAI();



