import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

const app = initializeApp({
  apiKey: 'AIzaSyAJZcZP0yqFEeD3roIhSRrwDyLlpUkWKb4',
  authDomain: 'delivery-hmo.firebaseapp.com',
  projectId: 'delivery-hmo',
  storageBucket: 'delivery-hmo.appspot.com',
  messagingSenderId: '739416934358',
  appId: '1:739416934358:web:6e95d6b3e28193199dc677',
  measurementId: 'G-XRCB7GXMBH'
})

const db = getFirestore(app);
const auth = getAuth(app);

export {
  db,
  auth
}
