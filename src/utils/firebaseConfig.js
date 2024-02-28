import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDW2xPeEhoFfaxzkVZ04-yb7efLqrvp2xE",
  authDomain: "watchstoredb.firebaseapp.com",
  databaseURL: "https://watchstoredb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "watchstoredb",
  storageBucket: "watchstoredb.appspot.com",
  messagingSenderId: "228097293596",
  appId: "1:228097293596:web:6c40d0ed52c341cd95ced9",
};

const app = initializeApp(firebaseConfig);
export const database = getAuth(app);

export default getFirestore();
