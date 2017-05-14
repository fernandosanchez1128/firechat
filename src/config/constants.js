import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCGd7vq8hdK17Ik1NE_yjvaC9OQAJH8RiY",
    authDomain: "chat-developer.firebaseapp.com",
    databaseURL: "https://chat-developer.firebaseio.com",
    storageBucket: "chat-developer.appspot.com",

}

firebase.initializeApp(config)




export const database = firebase.database()
export const storage = firebase.storage()
export const firebaseAuth = firebase.auth
