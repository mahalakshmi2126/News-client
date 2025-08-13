import { messaging } from './firebase';
import { getToken } from "firebase/messaging";

export const requestFirebaseNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, { 
        vapidKey: 'BPHwJAHMZqRFSEv8zzITrrZPDHwCCchH30BW026WJhpEEa500UARBzS61Z1Bs6z3JXTAH99BVQvnURYP0tR5q5l' // unga Firebase Public VAPID key
      });
      console.log('FCM Token:', token);
      // TODO: Send token to backend API
      return token;
    } else {
      console.log('Notification permission denied');
    }
  } catch (error) {
    console.error('Error getting permission or token:', error);
  }
};