import { describe, it, expect } from "@rstest/core";
import request from "supertest";
import { app } from "../app.ts";

describe("GET /", () => {
    it("should return 200 OK", async () => {
        const res = await request(app).get("/");

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ status: "hello world!" });
    });
});


