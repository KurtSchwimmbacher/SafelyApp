import { Linking } from "react-native";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();

// ---- New SMS function using Firebase Gen 2 cloud function (Twilio) ----
export const sendSMS = async (phoneNumber: string, message: string) => {
  try {
    const sendSafetyAlert = httpsCallable<
      { phoneNumber: string; message: string },
      { success: boolean; sid?: string; error?: string }
    >(functions, "sendSafetyAlert");

    const result = await sendSafetyAlert({ phoneNumber, message });

    if (!result.data.success) {
      console.warn("Failed to send SMS via Twilio:", result.data.error);
      throw new Error(result.data.error || "Twilio failed to send SMS");
    }

    console.log("SMS sent via Twilio, SID:", result.data.sid);
  } catch (error) {
    console.error("Error sending SMS via Twilio:", error);
    throw error;
  }
};


