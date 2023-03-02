import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDFLho_HYUJ3MBKubVpIqVJ0JCyJdL0DoI",
  authDomain: "post-project-28b52.firebaseapp.com",
  projectId: "post-project-28b52",
  storageBucket: "post-project-28b52.appspot.com",
  messagingSenderId: "460711528012",
  appId: "1:460711528012:web:c0b8dab219efa40b5396e9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
