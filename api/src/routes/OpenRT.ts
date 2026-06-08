import express from "express";
import { OPEN } from "../controllers/OpenCTR.ts";

// ROUTE:  http://localhost:9000/api/chat
export const openRT: express.Router = express.Router();
    openRT.post("/chat", OPEN.Chat);




    