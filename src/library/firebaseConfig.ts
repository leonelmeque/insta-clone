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

// Initialize Firebase


export default function firebaseInit() {
    if (firebaseApp.apps.length===0) {
        const app = firebaseApp.initializeApp(firebaseConfig)
      
        console.log("Fire init")
        // const analytics = firebase.default.analytics(app)
    }
}