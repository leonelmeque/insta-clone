// Import the functions you need from the SDKs you need
import * as firebase from 'firebase'
// import { API_KEY, APP_ID, AUTH_DOMAIN, MEASUREMENT_ID, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET } from './constants';
import Constants from 'expo-constants'
// TODO: Add SDKs for Firebase products that you want to use



const firebaseConfig = {
 
    apiKey: Constants.manifest?.extra?.apiKey,
    authDomain: Constants.manifest?.extra?.authDomain,
    projectId: Constants.manifest?.extra?.projectId,
    storageBucket: Constants.manifest?.extra?.storageBucket,
    messagingSenderId: Constants.manifest?.extra?.messagingSenderId,
    appId: Constants.manifest?.extra?.appId,
    measurementId: Constants.manifest?.extra?.measurementId
};

// Initialize Firebase


export default function firebaseInit() {
    if (firebase.default.apps.length === 0) {
        const app = firebase.default.initializeApp(firebaseConfig);
        // const analytics = firebase.default.analytics(app)
    }
}