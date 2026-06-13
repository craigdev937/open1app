import React from "react";
import "./ChatBot.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CSchema } from "../../validation/Schema";
import { IData, IMsg } from "../../models/Interfaces";
const URL = "http://localhost:9000/api/chat";

export const ChatBot = () => {
    const [messages, setMessages] = React.useState<IMsg[]>([]);
    const convId = React.useRef(crypto.randomUUID());
    const { register, handleSubmit, reset, 
        formState } = useForm<IData>({
            resolver: zodResolver(CSchema)
        });

    const onSubmit = async ({ prompt }: IData): Promise<IData> => {
        setMessages((prev) => 
            [...prev, { content: prompt, role: "user" }]);
        reset();
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
        setMessages((prev) => [...prev, { content: data.message, role: "bot" }]);
        return data;
    };

    const onKeyDown = 
    (event: React.KeyboardEvent<HTMLFormElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    return (
        <section className="chat__container">
            <aside>
                {messages.map((msg, index) => (
                    <p 
                        key={index}
                        className={` ${
                            msg.role === "user"
                            ? "blue"
                            : "white"
                        }`}
                        >{msg.content}
                    </p>
                ))}
            </aside>
            <form 
                className="chat__area"
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={onKeyDown}
            >
                <textarea 
                    className="chat__text" 
                    placeholder="Ask anything..."
                    maxLength={1000}
                    {...register("prompt")}
                />
                <button 
                    className="chat__btn"
                    disabled={!formState.isValid}
                    >Send
                </button>
            </form>
        </section>
    );
};



