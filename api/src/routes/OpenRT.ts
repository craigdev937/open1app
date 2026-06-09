import express from "express";
import { OPEN } from "../controllers/OpenCTR.ts";
import { VAL } from "../middleware/Validate.ts";
import { CSchema } from "../validation/Schema.ts";

// ROUTE:  http://localhost:9000/api/chat
export const openRT: express.Router = express.Router();
    openRT.post("/chat", VAL(CSchema), OPEN.Chat);




    