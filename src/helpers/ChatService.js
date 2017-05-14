
/**
 * Created by big-data on 13/05/17.
 */

import { database, storage,provider } from '../config/constants'

/**
 * function for sending messages
 *
 * @param user user whos send image
 * @param id_chat  chat's id
 * @param msg message send
 * @param type  image or msg (text)
 * @param imageUrl  URl for images send
 * @returns {Number}
 */
export function saveMsg (user,id_chat,msg, type="msg", imageUrl = "None") {

    var today = new Date(),
        date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/'
            + today.getDate() + "-" + today.getHours() + ":" + today.getMinutes()
    return database.ref('chats/'.concat(id_chat) ).push
    ({
                 msg: msg,
                 user: user.email,
                 date: date,
                 photo: user.photo,
                 type: type,
                 imageUrl: imageUrl

        })
}


/**
 * return id chat of two users
 * @param id_user : id of user logged
 * @param id_contac : id contact chat
 * @returns {string|Array.<T>}
 */
export function getIdChat (id_user, id_contac) {
    var ids = [id_user,id_contac]
    ids.sort();
    return ids[0].concat ("-",ids[1])
}


/**
 * function for upload and sending images
 * @param id_chat : chat's id
 * @param file : image for sending
 * @param user : user whos send
 * @returns {Promise.<TResult>}
 */
export function sendImage (id_chat,file,user) {
    if (!file.type.match('image.*')) {
        alert ("The chosen file is not an image")
        return
        };
        // Upload the image to Cloud Storage.
        var filePath =user.id + "/" + file.name;
        return storage.ref(filePath).put(file).then(function (snapshot) {

        // Get the file's Storage URI and update the chat message placeholder.

            var uri = snapshot.metadata.downloadURLs[0];
        //var fullPath = snapshot.metadata.fullPath;
            return saveMsg(user,id_chat,"image","image",uri)

        })
    }

/**
 * return url_image for download
 * @param imageUri: url of image on the firebase storage
 */
export function getUrlImage (imageUri)
{


    storage.refFromURL(imageUri).getMetadata().then(function(metadata) {
        alert ( metadata.downloadURLs[0])
    });



}

