import React from "react";
import "./ChatBot.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactMarkdown from "react-markdown";
import { CSchema } from "../../validation/Schema";
import { IData, IMsg } from "../../models/Interfaces";
const URL = "http://localhost:9000/api/chat";

export const ChatBot = () => {
    const [messages, setMessages] = React.useState<IMsg[]>([]);
    const [isTy, setIsTy] = React.useState(false);
    const [error, setError] = React.useState("");
    const lastMesRef = React.useRef<HTMLElement | null>(null);
    const convId = React.useRef(crypto.randomUUID());
    const { register, handleSubmit, reset, 
        formState } = useForm<IData>({
            resolver: zodResolver(CSchema)
        });

    React.useEffect(() => {
        lastMesRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages]);

    const onSubmit = async ({ prompt }: IData) => {
        try {
            setMessages((prev) => [
                ...prev, 
                { content: prompt, role: "user" }
            ]);
            setIsTy(true);
            setError("");
            reset({ prompt: "" });
            const res: Response = await fetch(URL, {
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

    const onCopyMsg = 
    (event: React.ClipboardEvent) => {
        const selection = window.getSelection()?.toString().trim();
        if (selection) {
            event.preventDefault();
            event.clipboardData.setData("text/plain", selection)
        }
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
            <aside className="message__cont">
                {messages.map((msg, index) => (
                    <aside 
                        key={index}
                        className={
                            msg.role === "user"
                            ? "msg__user"
                            : "msg__bot"
                        }
                        onCopy={onCopyMsg}
                        ref={lastMesRef}
                        >
                            <ReactMarkdown>
                                {msg.content}
                            </ReactMarkdown>
                    </aside>
                ))}
                {isTy && (
                    <div className="msg__dot">
                        <span />
                        <span />
                        <span />
                    </div>
                )}
                {error && <h2 className="msg__err">{error}</h2>}
            </aside>
            <form 
                className="chat__area"
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={onKeyDown}
            >
                <textarea 
                    autoFocus
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



