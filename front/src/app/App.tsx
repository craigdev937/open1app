import React from "react";
import "./App.css";
import Tom from "@public/Tom Burke2.webp";

export const App = () => {
    return (
        <React.Fragment>
            <h1>Tom Burke</h1>
            <img 
                src={Tom} alt="Tom Burke" 
                height={"600px"} width={"auto"}
            />
        </React.Fragment>
    );
};


