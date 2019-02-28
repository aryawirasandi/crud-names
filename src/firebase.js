import {initializeApp} from 'firebase'

const app =  initializeApp({
    apiKey: "YOUR-API-KEY",
    authDomain: "YOUR-AUTH-DOMAIN",
    databaseURL: "YOUR-DATABASE URL",
    projectId: "YOUR PROJECT-ID",
    storageBucket: "your storage bucket",
    messagingSenderId: "your message sender id"
});

export const db = app.database();
export const namesRef = db.ref('names');