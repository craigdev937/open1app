import React from "react";
import "./ChatInput.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CSchema } from "../../validation/Schema";
import { IData, ISub } from "../../models/Interfaces";

export const ChatInput = ({ onSubmit }: ISub) => {
    const { register, handleSubmit, 
        reset, formState } = useForm<IData>({
        resolver: zodResolver(CSchema)
    });

    const handleForm = handleSubmit((data) => {
        reset({ prompt: "" });
        onSubmit(data);
    });

    const handleKeyDown = 
    (event: React.KeyboardEvent<HTMLFormElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleForm();
        }
    };

    return (
        <React.Fragment>
            <form 
                className="chat__area"
                onSubmit={handleForm}
                onKeyDown={handleKeyDown}
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
        </React.Fragment>
    );
};


