import "./ChatBot.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CSchema } from "../../validation/Schema";
import { IData } from "../../models/Interfaces";

export const ChatBot = () => {
    const { register, handleSubmit, watch, 
        formState: { errors } } = useForm<IData>({
            resolver: zodResolver(CSchema)
        });

    return (
        <section className="chat__container">
            <div className="chat__area">
                <textarea 
                    className="chat__text" 
                    placeholder="Ask anything..."
                    maxLength={1000}
                    {...register("prompt")}
                />
                <button className="chat__btn">Send</button>
            </div>
        </section>
    );
};



