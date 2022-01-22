import "dotenv/config"
import {
  ExpoConfig,
  ConfigContext
} from "@expo/config"

export default ({
  config
}: ConfigContext): ExpoConfig => ({
  ...config,
  name: "instagram-clone",
  slug: "instagram-clone",
  version: "1.0.0",
  "assetBundlePatterns": [
    "**/*"
  ],
  extra: {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APP_ID,
    measurementId: process.env.MENSUREMENTID
  }
})
