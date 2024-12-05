import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCp-V2c2lgzW8v0hu5E6uZaAzpMuDvELq4",
  authDomain: "gamezone-e-comemerce.firebaseapp.com",
  databaseURL: "https://gamezone-e-comemerce-default-rtdb.firebaseio.com",
  projectId: "gamezone-e-comemerce",
  storageBucket: "gamezone-e-comemerce.appspot.com",
  messagingSenderId: "470844700571",
  appId: "1:470844700571:web:0a02c08141949ca9b4933e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export{
    auth,
    storage
}