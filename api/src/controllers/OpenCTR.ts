import express from "express";
import { client } from "../middleware/openai.ts";

const conversations = new Map<string, string>();

class OpenAI {
    Chat: express.Handler = async (req, res, next) => {
        try {
            const { prompt, convId } = req.body;
            const response = await client.responses.create({
                model: "gpt-5.4-nano-2026-03-17",
                input: prompt,
                temperature: 0.2,
                max_output_tokens: 100,
                previous_response_id: conversations.get(convId)
            });

            conversations.set(convId, response.id);

            return res
                .status(201)
                .json({ message: response.output_text });
        } catch (error) {
            res
                .status(res.statusCode)
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



