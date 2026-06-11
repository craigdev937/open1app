import React from "react";
import "./App.css";
import { ChatBot } from "../components/chat/ChatBot";
const URL = "http://localhost:9000/api";

export const App = () => {
    const [message, setMessage] = React.useState("");

    React.useEffect(() => {
        fetch(URL)
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch((error) => console.log(error));
    }, []);
    
    return (
        <React.Fragment>
            <ChatBot />
        </React.Fragment>
    );
};


