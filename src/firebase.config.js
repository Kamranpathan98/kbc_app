import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAvELOzsB8kPDLY8EJBW4TsX-l8uBghkR8",
  authDomain: "kbc-web-5057a.firebaseapp.com",
  databaseURL: "https://kbc-web-5057a-default-rtdb.firebaseio.com",
  projectId: "kbc-web-5057a",
  storageBucket: "kbc-web-5057a.firebasestorage.app",
  messagingSenderId: "850016013641",
  appId: "1:850016013641:web:d12a8893a377b74f685e98",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
