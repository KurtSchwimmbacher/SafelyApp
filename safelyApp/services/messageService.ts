import * as SMS from 'expo-sms';
import { Linking } from 'react-native';

export const sendSMS = async (phoneNumber: string, message: string) => {
  const isAvailable = await SMS.isAvailableAsync();
  if (isAvailable) {
    await SMS.sendSMSAsync([phoneNumber], message);
  } else {
    console.warn('SMS is not available on this device');
  }
};

export const sendWhatsApp = async (phoneNumber: string, message: string) => {
  const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    console.warn('WhatsApp is not installed or the number is invalid');
  }
};
