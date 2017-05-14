/**
 *
 */
import { database, firebaseAuth,provider } from '../config/constants'
import firebase from 'firebase'

/**
 * allow logout aplication
 * @returns {*|{name, a}|!firebase.Promise.<void>|firebase.Promise<any>}
 */

export function logout () {

  return firebaseAuth().signOut()

}


/**
 * Allow login using google account
 */
export function authGoogle ()
{
        var provider = new firebase.auth.GoogleAuthProvider();
        // [END createprovider]
        // [START addscopes]
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        // [END addscopes]
        // [START signin]
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            saveUser(user);
            // [START_EXCLUDE]
            //document.getElementById('quickstart-oauthtoken').textContent = token;
            // [END_EXCLUDE]
        })

}


/**
 * allow save user details into a firebase database
 * @param user: user logged
 */
export function saveUser (user) {

  database.ref().child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid,
      nick: "this is my nick",
      img: user.photoURL
    })
}
