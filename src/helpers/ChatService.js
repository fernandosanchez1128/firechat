
/**
 * Created by big-data on 13/05/17.
 */

import { database, storage,provider } from '../config/constants'

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

export function getIdChat (id_user, id_contac) {
    var ids = [id_user,id_contac]
    ids.sort();
    return ids[0].concat ("-",ids[1])
}


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

export function getUrlImage (imageUri)
{


    storage.refFromURL(imageUri).getMetadata().then(function(metadata) {
        alert ( metadata.downloadURLs[0])
    });



}

