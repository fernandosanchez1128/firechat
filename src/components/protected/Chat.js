/**
 * Created by big-data on 12/05/17.
 */


import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import  {Image, Button, Col,Glyphicon,ListGroupItem} from 'react-bootstrap/lib/';
import {database} from '../../config/constants'
import './panel.css'
import {saveMsg,getIdChat,sendImage,getUrlImage} from '../../helpers/ChatService'


/**
 * component for show and control conversations between user
 */
export default class Chat extends Component {

    state = {
        msgs:[]
    }


    /**
     * function for send messages
     * @param event
     */
    handleClickSend= (event) => {
        event.preventDefault()
        var user = this.props.userSession
        var userFriend = this.props.userFriend
        var id = getIdChat(user.id, userFriend.id)
        var msg = this.msg.value
        this.msg.value= ""




        saveMsg(this.props.userSession,id,msg).then
        (function () {
            var list_msg = document.getElementById("list_msg");
            list_msg.scrollTop=list_msg.scrollHeight

        })



    }

    /**
     * begin selection of images for sending
     * @param event
     */
    handleImage= (event) => {
        event.preventDefault()
        var mediaCapture = document.getElementById('mediaCapture')
        mediaCapture.click()

    }

    /**
     * function to send images
     * @param event
     */
    sendImage= (event) => {
        var file = event.target.files[0]
        var user = this.props.userSession
        var userFriend = this.props.userFriend
        var id_chat = getIdChat(user.id, userFriend.id)
        sendImage (id_chat, file, this.props.userSession).then(function () {
            var list_msg = document.getElementById("list_msg");
            list_msg.scrollTop=list_msg.scrollHeight

        })


    }


    /**
     * Funtioon with listener for update conversation between two users
     */
    componentDidMount () {

        var user = this.props.userSession
        var userFriend = this.props.userFriend
        var id = getIdChat(user.id, userFriend.id)

        this.ref = database.ref('chats/'.concat(id))


        this.dbListen = this.ref.limitToLast(50).on("child_added", ((snapshot) => {

            var msg= snapshot.val().msg;
            var user= snapshot.val().user;
            var photo = snapshot.val().photo
            var type = snapshot.val().type
            var uriImage = snapshot.val().imageUrl;
            var hour = snapshot.val().date;
            //  alert (email)
            var newItem = {
                msg: msg,
                user:user,
                photo:photo,
                type: type,
                image:uriImage,
                hour: hour
            };

            this.setState((prevState) => ({
                msgs: prevState.msgs.concat(newItem),


            }));
            var list_msg = document.getElementById("list_msg");
            list_msg.scrollTop=list_msg.scrollHeight


        }))
    }

    /**
     * kill listener when the conversation is closed
     */
    componentWillUnmount ()
    {
        this.ref.off();


    }


    render () {

        return (
            <div className="message-wrap">
                <div id= "list_msg" className="msg-wrap">
                    {this.state.msgs.map(item => (
                        <div className="media msg ">
                            <a className="pull-left" href="#">
                                <img className="media-object" data-src="holder.js/64x64" alt="64x64" style={{width: 32, height: 32}} src={item.photo}/>
                            </a>
                            <div className="media-body">
                                <small className="pull-right time"><i className="fa fa-clock-o"></i> {item.hour}</small>
                                <h5 className="media-heading"> {item.user}</h5>
                                {item.type != "image" ?
                                <small className="col-lg-10">
                                    {item.msg}
                                </small>
                                :
                                    <img className="media-object" data-src="holder.js/64x64" alt="64x64" style={{width: 400}}  align="middle" src={item.image}/>

                            }
                            </div>
                        </div>
                    ))}

                </div>

                <div className="send-wrap ">

                    <textarea ref={(msg) => this.msg= msg} className="form-control send-message" rows="3" placeholder="Write a reply..."></textarea>


                </div>
                <div className="btn-panel">
                    <input className="hidden" id="mediaCapture" type="file" accept="image/*,capture=camera" onChange={this.sendImage}/>
                    <a href="" className="col-lg-4 btn btn-primary send-message-btn" role="button" onClick={this.handleImage}>Add Image</a>
                    <a href="" className="col-lg-4 text-right btn btn-primary send-message-btn pull-right" role="button" onClick={this.handleClickSend}><i className="fa fa-send"></i> Send Message</a>
                </div>
            </div>




        );

    }


}



