import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC5OPFxsHr-jNMWtTck-V_tiJyAfKJ00Uk",
  authDomain: "gamezone-e-comemerce.firebaseapp.com",
  databaseURL: "https://gamezone-e-comemerce-default-rtdb.firebaseio.com",
  projectId: "gamezone-e-comemerce",
  storageBucket: "gamezone-e-comemerce.appspot.com",
  messagingSenderId: "470844700571",
  appId: "1:470844700571:web:0fd1beb3756dccaeb4933e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export{
    auth,
    storage
}