import express from "express";
import { IndexHome } from "../controllers/OpenCTR.ts";

export const openRT: express.Router = express.Router();
    openRT.get("/", IndexHome);




    