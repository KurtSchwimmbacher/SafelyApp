// functions/src/index.ts
import { onCall } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import twilio from "twilio";
import * as dotenv from "dotenv";

// Load .env variables
dotenv.config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;

if (!accountSid || !authToken || !twilioPhone) {
  throw new Error("Twilio environment variables are missing!");
}

const client = twilio(accountSid, authToken);

export const sendSafetyAlert = onCall(
  {
    memory: "256MiB",
    timeoutSeconds: 60,
    region: "us-central1",
  },
  async (request) => {
    const { phoneNumber, message } = request.data;

    if (!phoneNumber || !message) {
      throw new Error("Missing phoneNumber or message in request data.");
    }

    try {
      const response = await client.messages.create({
        body: message,
        from: twilioPhone,
        to: phoneNumber,
      });

      logger.info("SMS sent:", response.sid);
      return { success: true, sid: response.sid };
    } catch (error) {
      logger.error("Failed to send SMS:", error);
      throw new Error("Failed to send SMS");
    }
  }
);
