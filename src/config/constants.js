import firebase from 'firebase'

/**
 * config for firebase conn
 * @type {{apiKey: string, authDomain: string, databaseURL: string, storageBucket: string}}
 */
const config = {
    apiKey: "AIzaSyCGd7vq8hdK17Ik1NE_yjvaC9OQAJH8RiY",
    authDomain: "chat-developer.firebaseapp.com",
    databaseURL: "https://chat-developer.firebaseio.com",
    storageBucket: "chat-developer.appspot.com",

}

firebase.initializeApp(config)


/**
 * connection to database
 */
export const database = firebase.database()

/**
 * connection for storage firebase
 */
export const storage = firebase.storage()
/**
 * firebase authetication service
 */
export const firebaseAuth = firebase.auth
