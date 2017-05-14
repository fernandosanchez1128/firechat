import React, { Component } from 'react'
import  {Image, Button, Col,Glyphicon,ListGroupItem} from 'react-bootstrap/lib/';
import {database} from '../../config/constants'
import './panel.css'
import  ReactDOM from 'react-dom'

import  Chat from './Chat'

export default class Panel extends Component {

    state = {
        users:[]
    }

    handleClick = (event) => {
        event.preventDefault()
        var userSession =
            {
                email : this.props.email,
                id:this.props.id_user,
                photo: this.props.img
            }
        var userFriend =
            {
                email: event.target.dataset['email'],
                id: event.target.dataset['id'],
                photo: event.target.dataset['photo'],
            }


        ReactDOM.unmountComponentAtNode(document.getElementById("myChat"))
        ReactDOM.render(<Chat userSession = {userSession} userFriend={userFriend} /> ,document.getElementById("myChat"))

    }

    handleDistroy= (event) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("myChat"))
    }

    componentWillMount () {
        var ref = database.ref('users')

        this.removeListener = ref.on("child_added", ((snapshot) => {

            var user = snapshot.val().info;
            //  alert (email)
            var newItem = {
                email: user.email,
                id: user.uid,
                userImg: user.img
            };

            this.setState((prevState) => ({
                users: prevState.users.concat(newItem),

            }));

            }))

    }

    componentWillUnmount ()
    {
        this.removeListener();
    }

    render () {

        return (

        <Col md= {3} sm={6} className="panel">
            <div  style = {{paddingLeft:5,paddingTop:20, height:400}}  className="navbar-default sidebar" role="navigation">
                <Col >
                    <Image src={this.props.img} circle width="25%" />
                    <h6>{this.props.email} </h6>
                    <br />
                </Col>

                <h4 className="text-primary"> Contacts</h4>
                <Col>
                    <ul className="nav in" id="side-menu">
                        <li className="sidebar-search">
                            <div className="input-group custom-search-form">
                                <input type="text" className="form-control" placeholder="Search..." />
                                <span className="input-group-btn">
                        <Button ><Glyphicon glyph="search" /> </Button>
                            </span>
                            </div>
                        </li>
                    </ul>
                </Col>

                <Col >
                        <div className="conversation-wrap" >
                        {this.state.users.map(item => (
                            <div className="media conversation" >
                                <a className="pull-left" href="#">
                                </a>
                                <div className="media-body">

                                    <img style={{width: 40, height: 40, float:"left"}} class="media-object" data-src="holder.js/64x64" alt="64x64"  src={item.userImg}/>


                                    <h6 className="text-primary" data-email={item.email} data-id={item.id} data-photo= {item.userImg}
                                        onClick={this.handleClick}> <a href="" data-email={item.email} data-id={item.id} data-photo= {item.userImg}> {item.email} </a></h6>


                                </div>
                            </div>
                        ))}
                        </div>

                </Col>

            </div>


        </Col>




        );

    }
}
