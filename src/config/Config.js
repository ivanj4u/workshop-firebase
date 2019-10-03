import Firebase from 'firebase';

let firebaseConfig = {
    apiKey: "AIzaSyDW9h5ZLtFVz5ySdj7na1rE1JfoJZ8LWFQ",
    authDomain: "workshopfirebase-105d4.firebaseapp.com",
    databaseURL: "https://workshopfirebase-105d4.firebaseio.com",
    projectId: "workshopfirebase-105d4",
    storageBucket: "workshopfirebase-105d4.appspot.com",
    messagingSenderId: "457619077965",
    appId: "1:457619077965:web:975a9125898fe61f411504"
};

let app = Firebase.initializeApp(firebaseConfig);

export const db = app.database();