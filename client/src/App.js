
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { Component } from 'react';
import axios from 'axios';
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Question from "./pages/Question";
import LoginForm from './components/Login/LoginForm'
import SignupForm from './components/SignupForm'
import Header from './components/Header'
import Status from './components/Status'
import Navbar from './components/Nav'
import './css/App.css';
import { Col, Container, Row } from "./components/Grid";
import { Card, CardBody, CardHeader } from "./components/Card";


class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      user: null
    }
    this._logout = this._logout.bind(this)
    this._login = this._login.bind(this)
  }
  componentDidMount() {
    axios.get('/auth/user').then(response => {
      console.log(response.data)
      if (!!response.data.user) {
        console.log('THERE IS A USER')
        this.setState({
          loggedIn: true,
          user: response.data.user
        })
      } else {
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
          user: null
        })
      }
    })
  }

  _login(username, password) {
    axios
      .post('/auth/login', {
        username,
        password
      })
      .then(response => {
        console.log("------response----");
        console.log(response);
        if (response.status === 200) {
          // update the state
          this.setState({
            loggedIn: true,
            user: response.data.user
          })
        }
      })
  }

  render() {
    return (
      <div className="App">
    
        <Header user={this.state.user} />
        {/* LINKS to our different 'pages' */}
        <Navbar _logout={this._logout} loggedIn={this.state.loggedIn} />
        <Container fluid>
          <Row>
            <Col size="md-6">
              <img className="mx-auto d-block" src="img/quizard_of_ahhhs.png" alt="Quizard of Ahhhs... Logo" height="250" />
              <Card>
                <CardHeader><h1 className="text-center">Rules of the Game</h1></CardHeader>
                <CardBody>
                  <h3 className="text-center">Every player has 10 seconds to answer each question.  The player with the most questions correct at the end of 15 questions will be the winner and will enter Emerald Quizity.</h3>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container> 
        {/*  ROUTES */}
        {/* <Route exact path="/" component={Status} /> */}
        <Route exact path="/" render={() => <Status user={this.state.user} />} />
        <Route
          exact
          path="/login"
          render={() =>
            <LoginForm
              _login={this._login}
              _googleSignin={this._googleSignin}
            />}
        />
        <Route exact path="/signup" component={SignupForm} />
        {/* <LoginForm _login={this._login} /> */}
      </div>
    )
  }
}

export default App

