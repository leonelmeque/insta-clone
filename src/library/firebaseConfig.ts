import firebaseApp from 'firebase/app'
import Constants from 'expo-constants'

const firebaseConfig = {

    apiKey: Constants.manifest?.extra?.apiKey,
    authDomain: Constants.manifest?.extra?.authDomain,
    projectId: Constants.manifest?.extra?.projectId,
    storageBucket: Constants.manifest?.extra?.storageBucket,
    messagingSenderId: Constants.manifest?.extra?.messagingSenderId,
    appId: Constants.manifest?.extra?.appId,
    measurementId: Constants.manifest?.extra?.measurementId
};

/**
 * @description - firebase initialization
 */
export default function firebaseInit() {
    if (firebaseApp.apps.length === 0) {
        firebaseApp.initializeApp(firebaseConfig)
    }
}