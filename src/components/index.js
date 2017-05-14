import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Register from './Register'

import Dashboard from './protected/Dashboard'
import { logout } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'


function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

function InitialRoute ({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={
                <Redirect to='/dashboard' />}
        />
    )
}
export default class App extends Component {
  state = {
    authed: false,
    loading: true,
  }

    logout= (event) => {
        logout().then()
        {
            window.location.href = window.location.href
        }



    }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
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

  render() {
      var x =  <span> <button
          style={{border: 'none', background: 'transparent'}}

          className="navbar-brand">Profile</button>
      <button  style={{border: 'none', background: 'transparent'}}
              onClick={this.logout}
              className="navbar-brand">
      Logout
      </button>
        </span>

    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div>
          <nav style={{margin:0}} className="navbar navbar-default navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">React Router + Firebase Auth</Link>
              </div>
              <ul className="nav navbar-nav pull-right">

                <li>
                  <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
                </li>
                <li>

                  {this.state.authed
                    ? x: <span>
                        <Link to="/login" className="navbar-brand">Login</Link>
                      </span>

                     }
                </li>
              </ul>
            </div>
          </nav>

          <div className="page-wrapper">
            <div >
              <Switch>

                <PublicRoute authed={this.state.authed} path='/login' component={Register} />
                <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
                <PrivateRoute authed={this.state.authed} path='/' component={Dashboard}/>


              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
