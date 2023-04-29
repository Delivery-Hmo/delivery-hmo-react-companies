import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const app = initializeApp({
  apiKey: 'AIzaSyAJZcZP0yqFEeD3roIhSRrwDyLlpUkWKb4',
  authDomain: 'delivery-hmo.firebaseapp.com',
  projectId: 'delivery-hmo',
  storageBucket: 'delivery-hmo.appspot.com',
  messagingSenderId: '739416934358',
  appId: '1:739416934358:web:6e95d6b3e28193199dc677',
  measurementId: 'G-XRCB7GXMBH'
});

const auth = getAuth(app);
const storage = getStorage(app);

export {
  auth,
  storage
};
