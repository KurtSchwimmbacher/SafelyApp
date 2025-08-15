import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import twilio from 'twilio';

admin.initializeApp();

// Load Twilio credentials from Firebase config
const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;
const twilioPhone = functions.config().twilio.phone;

if (!accountSid || !authToken || !twilioPhone) {
  throw new Error('Twilio credentials are not configured. Please run: firebase functions:config:set twilio.sid="..." twilio.token="..." twilio.phone="..."');
}

const client = twilio(accountSid, authToken);

// Define the expected data shape
interface SendSafetyAlertData {
  phoneNumbers: string[];
  message?: string;
}

/**
 * Cloud Function to send a safety timer SMS alert.
 * Trigger: HTTPS callable
 */
export const sendSafetyAlert = functions.https.onCall(
  async (request: functions.https.CallableRequest<SendSafetyAlertData>, context: any) => {
    // Extract data from the request
    const { phoneNumbers, message } = request.data;

    // Validate authentication
    if (!context?.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'You must be signed in to trigger an alert.'
      );
    }

    // Validate input
    if (!phoneNumbers || !Array.isArray(phoneNumbers) || phoneNumbers.length === 0) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Phone numbers are required.'
      );
    }

    try {
      const results = await Promise.all(
        phoneNumbers.map((number) =>
          client.messages.create({
            body: message || 'Safety timer expired. Please check in.',
            from: twilioPhone,
            to: number,
          })
        )
      );

      return { success: true, results };
    } catch (error) {
      console.error('Twilio error:', error);
      throw new functions.https.HttpsError(
        'internal',
        'Failed to send SMS alert.'
      );
    }
  }
);