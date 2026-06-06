import express from "express";

export const IndexHome: express.Handler = (req, res) => {
    res.json({ API: "OpenAI API!" });
};




