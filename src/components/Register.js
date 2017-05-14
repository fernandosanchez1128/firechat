import React, { Component } from 'react'
import { auth,authGoogle } from '../helpers/auth'
import  {Image, Button, Col,Glyphicon,ListGroupItem} from 'react-bootstrap/lib/';


function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class Register extends Component {
  state = { registerError: null }
  handleSubmit = (e) => {
    e.preventDefault();
    //auth(this.email.value, this.pw.value)
      //.catch(e => this.setState(setErrorMsg(e)))
      authGoogle();

  }
  render () {
    return (

      <div  className="col-sm-6 col-sm-offset-3 account-wall  " >
        <div className="">
          <h1 className="col-sm-12 col-sm-offset-3" align="center">Real Time Chat</h1>
          <br/>
          <br/>

        </div>

        <div className="">
          <img className="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
               alt=""/>
            <form class="form-signin" onSubmit={this.handleSubmit}>

              <button  className="col-sm-6 col-sm-offset-3" type="submit" style={{border: 'none', background: 'transparent'}} >
                <a className="btn btn-block btn-social  btn-primary btn-google-plus">
                  <i className="fa fa-google-plus"></i> Sign in with Google
                </a>
              </button>
                  <label class="checkbox pull-left">

                  </label>

                  <span className="clearfix"/>
            </form>

        </div>

      </div>

    )
  }
}
