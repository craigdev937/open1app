import React from "react";
import "./ChatBot.css";
import { TypingInd } from "./TypingInd";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { IData, IMsg } from "../../models/Interfaces";
const URL = "http://localhost:9000/api/chat";

export const ChatBot = () => {
    const [messages, setMessages] = React.useState<IMsg[]>([]);
    const [isTy, setIsTy] = React.useState(false);
    const [error, setError] = React.useState("");    
    const convId = React.useRef(crypto.randomUUID());    

    const onSubmit = async ({ prompt }: IData) => {
        try {
            setMessages((prev) => [
                ...prev, 
                { content: prompt, role: "user" }
            ]);
            setIsTy(true);
            setError("");
            
            const res = await fetch(URL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    prompt: prompt,
                    convId: convId.current
                }),
            });
            if (!res.ok) throw new Error(res.statusText);
            const data = await res.json();
            setMessages((prev) => [
                ...prev, 
                { content: data.message, role: "bot" }
            ]);
            setIsTy(false);
            return data;
        } catch (error) {
            console.log(error);
            setError("There's a problem, try again!");
        } finally {
            setIsTy(false);
        }
    };

    return (
        <section className="chat__container">
            <ChatMessages messages={messages} />
            {isTy && (
                <TypingInd />
            )}
            {error && <h2 className="msg__err">{error}</h2>}
            <ChatInput onSubmit={onSubmit} />
        </section>
    );
};



