
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzxlhg3akceWy4wisfbFPlzUKuuCs76JE",
  authDomain: "wecollab-23f71.firebaseapp.com",
  projectId: "wecollab-23f71",
  storageBucket: "wecollab-23f71.appspot.com",
  messagingSenderId: "896387228962",
  appId: "1:896387228962:web:984ee85a4c45d313d2f17b",
  measurementId: "G-H7ED77DSHG"
}

const app = initializeApp(firebaseConfig)
export const imageDB = getStorage(app)
