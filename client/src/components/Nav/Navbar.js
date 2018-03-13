import React, { Component } from "react";
import { Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from "axios";
 
class Navbar extends Component {
  constructor(props) {
    super(props)
 
    this.state = {
        loggedIn: false,
        user: null
     }
     this._logout = this._logout.bind(this)
  }
  componentDidMount() {
    axios.get('/auth/user').then(response => {
    let sessionData = sessionStorage.getItem('user');
      console.log(response)
      console.log(sessionData);
      console.log(this.state.user);
      if (response.data.user || sessionData) {
        console.log('THERE IS A USER');
        this.setState({
          loggedIn: true,
          user: response.data.user
        })
    } 
        else {
        this.setState({
          loggedIn: false,
          user: null
        })
      }
    })
  }
  _logout(event) {
    event.preventDefault()
    console.log('logging out')
    axios.post('/auth/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.setState({
            loggedIn: false,
            user: null,
            redirectTo: '/login'
          })
        // return <Redirect to='/login' />
      }
    })
  }
  render() {
    if (this.state.redirectTo) {
        return <Redirect to={{ pathname: this.state.redirectTo }} />
      } 
    if(this.state.loggedIn || this.props.loggedIn){
        return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/home">Quizard of Ahhhs...</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className={window.location.pathname === "/" ||
                        window.location.pathname === "/home"
                        ? "active"
                        : ""}>
                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li>
                        <Link to="#" className="nav-link" onClick={this._logout}>
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
                {/* <button type="button" className="btn btn-test">
                    Sign Up
                </button>
                <button type="button" className="btn btn-test">
                    Log In
                </button> */}
        </nav>
        )
    }
    else{
        return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/home">Quizard of Ahhhs...</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className={window.location.pathname === "/" ||
                    window.location.pathname === "/home"
                    ? "active"
                    : ""}>
                    <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signup" className="nav-link">
                            Sign Up
                        </Link>
                    </li>
            </ul>
        </div>
            {/* <button type="button" className="btn btn-test">
                Sign Up
            </button>
            <button type="button" className="btn btn-test">
                Log In
            </button> */}
    </nav>
        )
    }
  }
}
export default Navbar;