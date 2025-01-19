import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? {};

export default {
    apiKey: extra.API_KEY,
    authDomain: extra.AUTH_DOMAIN,
    projectId: extra.PROJECT_ID,
    storageBucket: extra.STORAGE_BUCKET,
    messagingSenderId: extra.MESSAGING_SENDER_ID,
    appId: extra.APP_ID,
};