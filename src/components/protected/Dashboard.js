import React, { Component } from 'react'
import { firebaseAuth } from '../../config/constants'
import  {Grid,Row,Col,Thumbnail} from 'react-bootstrap/lib/';
import Panel from './Panel'



export default class Dashboard extends Component {

    state = {
        authed: false,
        loading: true,
        img: "",
        name:"",
        email:""
    }
    componentWillMount () {
        this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authed: true,
                    loading: false,
                    img:user.photoURL,
                    name:user.displayName,
                    email:user.email,
                    id_user:user.uid
                })
            } else {
                this.setState({
                    authed: false,
                    loading: false
                })
            }
        })
    }


    componentWillUnmount () {
        this.removeListener()
    }

    render () {
        return (
        <div  >
            <Row className="show-grid">
                <Panel id_user={this.state.id_user} img={this.state.img} name={this.state.name} email={this.state.email} />
                <Col md= {9} sm={5} id="myChat">

                </Col>


            </Row>



        </div>


        );

  }
}