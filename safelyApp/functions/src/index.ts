import { onCall } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import twilio, { Twilio } from "twilio";
import * as functions from "firebase-functions";

// ---- Helper to get Twilio config from Firebase Runtime Config or env vars ----
const getTwilioConfig = () => {
  const config = functions.config();
  const accountSid = config.twilio?.sid || process.env.TWILIO_SID;
  const authToken = config.twilio?.token || process.env.TWILIO_TOKEN;
  const twilioPhone = config.twilio?.phone || process.env.TWILIO_PHONE;

  if (!accountSid || !authToken || !twilioPhone) {
    throw new Error(
      "Twilio environment variables are missing! Make sure TWILIO_SID, TWILIO_TOKEN, and TWILIO_PHONE are set."
    );
  }

  return { accountSid, authToken, twilioPhone };
};

// ---- Types ----
interface SafetyAlertRequest {
  phoneNumber: string;
  message: string;
}

// ---- Helper: sanitize phone numbers to E.164 format ----
const sanitizePhoneNumber = (number: string) => {
  let digits = number.replace(/\D/g, ""); // remove all non-digit chars

  // South African numbers: if starting with 0 and 10 digits total -> replace leading 0 with +27
  if (digits.length === 10 && digits.startsWith("0")) {
    digits = "+27" + digits.substring(1);
  }
  // If already starts with country code but no '+' sign
  else if (digits.length > 0 && !digits.startsWith("+")) {
    digits = "+" + digits;
  }

  return digits;
};


// ---- Gen 2 onCall function ----
export const sendSafetyAlert = onCall(
  {
    memory: "256MiB",
    timeoutSeconds: 60,
    region: "us-central1",
  },
  async (request) => {
    try {
      logger.info("Received request data:", request.data);
      const data: SafetyAlertRequest = request.data;

      if (!data?.phoneNumber || !data?.message) {
        logger.error("Missing phoneNumber or message", data);
        return { success: false, error: "Missing phoneNumber or message" };
      }

      // Get Twilio config (from Runtime Config or env vars)
      const { accountSid, authToken, twilioPhone } = getTwilioConfig();
      const client: Twilio = twilio(accountSid, authToken);

      const sanitizedNumber = sanitizePhoneNumber(data.phoneNumber);

      logger.info("Sanitized phone number:", sanitizedNumber);

      const response = await client.messages.create({
        body: data.message,
        from: twilioPhone,
        to: sanitizedNumber,
      });

      logger.info("SMS sent:", response.sid);
      return { success: true, sid: response.sid };
    } catch (error: any) {
      logger.error("Failed to send SMS:", error);
      return { success: false, error: error.message || error };
    }
  }
);
