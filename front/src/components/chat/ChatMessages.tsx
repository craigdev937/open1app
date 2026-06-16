import React from "react";
import "./ChatMessages.css";
import ReactMarkdown from "react-markdown";
import { MES } from "../../models/Interfaces";

export const ChatMessages = ({ messages }: MES) => {
    const lastMesRef = React.useRef<HTMLElement | null>(null);

    React.useEffect(() => {
        lastMesRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages]);

    const onCopyMsg = 
    (event: React.ClipboardEvent) => {
        const selection = window.getSelection()?.toString().trim();
        if (selection) {
            event.preventDefault();
            event.clipboardData.setData("text/plain", selection)
        }
    };

    return (
        <React.Fragment>
            <section className="message__cont">
                {messages.map((msg, index) => (
                    <aside 
                        key={index}
                        className={msg.role === "user"
                            ? "msg__user"
                            : "msg__bot"}
                        onCopy={onCopyMsg}
                        ref={lastMesRef}
                    >
                            <ReactMarkdown>
                                {msg.content}
                            </ReactMarkdown>
                    </aside>
                ))}
            </section>
        </React.Fragment>
    );
};


