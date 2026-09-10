import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../server.ts";

process.env.NODE_ENV = "test";
process.env.OTP_SECRET = "test_secret";

describe("OTP auth flow", () => {
  it("sends OTP and verifies successfully using otpPreview", async () => {
    const app = await createApp();
    const email = `otp-success-${Date.now()}-${Math.random()}@example.com`;

    const sendRes = await request(app)
      .post("/api/auth/send-otp")
      .send({ email, role: "candidate", name: "Test User" });

    expect(sendRes.status).toBe(200);
    expect(sendRes.body.success).toBe(true);
    expect(sendRes.body.otpPreview).toMatch(/^\d{6}$/);

    const verifyRes = await request(app)
      .post("/api/auth/verify-otp")
      .send({ email, otp: sendRes.body.otpPreview, role: "candidate", name: "Test User" });

    expect(verifyRes.status).toBe(200);
    expect(verifyRes.body.success).toBe(true);
    expect(verifyRes.body.token).toBeTruthy();
    expect(verifyRes.body.user).toBeTruthy();
    expect(verifyRes.body.user.email).toBe(email);
  });

  it("locks verification after repeated wrong OTP attempts", async () => {
    const app = await createApp();
    const email = `otp-fail-${Date.now()}-${Math.random()}@example.com`;

    const sendRes = await request(app).post("/api/auth/send-otp").send({ email });
    expect(sendRes.status).toBe(200);

    let lastRes = await request(app).post("/api/auth/verify-otp").send({ email, otp: "000000" });
    expect(lastRes.status).toBe(400);

    for (let i = 0; i < 4; i += 1) {
      lastRes = await request(app).post("/api/auth/verify-otp").send({ email, otp: "000000" });
    }

    expect(lastRes.status).toBe(400);
    expect(lastRes.body.error).toContain("0 attempt(s) remaining");

    const lockedRes = await request(app).post("/api/auth/verify-otp").send({ email, otp: "000000" });
    expect(lockedRes.status).toBe(429);
    expect(lockedRes.body.error).toContain("Maximum verification attempts exceeded");
  });
});
