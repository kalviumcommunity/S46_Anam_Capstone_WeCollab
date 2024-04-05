import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "wecollab-23f71.firebaseapp.com",
  projectId: "wecollab-23f71",
  storageBucket: "wecollab-23f71.appspot.com",
  messagingSenderId: "896387228962",
  appId: "1:896387228962:web:984ee85a4c45d313d2f17b",
  measurementId: "G-H7ED77DSHG"
}

const app = initializeApp(firebaseConfig)
export const imageDB = getStorage(app)
