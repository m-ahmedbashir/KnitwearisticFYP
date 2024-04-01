import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDNvLudAJY2avIC2xW_CEDoN6XiWo8o3Gg",
    authDomain: "knitwearistic.firebaseapp.com",
    projectId: "knitwearistic",
    storageBucket: "knitwearistic.appspot.com",
    messagingSenderId: "983263273668",
    appId: "1:983263273668:web:227dad23aac00089931f91",
    measurementId: "G-W427TLGM30"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const myapp=app;