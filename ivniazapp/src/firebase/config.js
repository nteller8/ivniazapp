import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCY2pPEK0KqUDORxDHjgb4NRzIzd7NfbGA",
    authDomain: "demo15-d16ab.firebaseapp.com",
    projectId: "demo15-d16ab",
    storageBucket: "demo15-d16ab.appspot.com",
    messagingSenderId: "451249659542",
    appId: "1:451249659542:web:ef940b8d2ee795804a2cb7"
  };

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()