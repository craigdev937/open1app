import { client } from "../middleware/openai.ts";
import { conRepo } from "../data/ConREP.ts";

interface ChatRes {
    id: string,
    message: string
};

// Public Interface and Leaky Abstraction.
export const CService = {
    async sendMessage(prompt: string, convId: string): Promise<ChatRes> {
        const response = await client.responses.create({
            model: "gpt-5.4-nano-2026-03-17",
            input: prompt,
            temperature: 0.2,
            max_output_tokens: 200,
            previous_response_id: conRepo.getLastResID(convId)
        });
        conRepo.setLastResID(convId, response.id);
        return {
            id: response.id,
            message: response.output_text
        };
    }
};


