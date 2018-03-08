import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import Navbar from "../../components/Nav";
import { Col, Container, Row } from "../../components/Grid";
import { Input, Label, FormBtn } from "../../components/Form";
import axios from "axios";

class LogIn extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
      redirectTo: null,
      loggedIn: false,
      user: null

    }
    // this.googleSignin = this.googleSignin.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this._login = this._login.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
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
            user: response.data.user,
            redirectTo: '/question'
          })
        }
      })
  }
  handleSubmit(event) {
    event.preventDefault()
    console.log('handleSubmit')
    this._login(this.state.username, this.state.password)



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
  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <div>
          <Navbar _logout={this._logout} loggedIn={this.state.loggedIn} />
          <Container fluid>
            <Row>
              <Col size="md-6">
                <div className="text-center" >
                  <img src="../img/quizard_of_ahhhs.png" alt="Quizard of Ahhhs... Logo" height="200" />
                </div>
                <form>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <button className="btn-test" onClick={this.handleSubmit}>Login</button>
                </form>
                <a href="/auth/google">
                  {/* <GoogleButton /> */}
                  <img className="google-button" src="../img/google_signin.png" alt="Sign into Google Button" />
                </a>
              </Col>
            </Row>
          </Container>
        </div>
      )
    }
  }
}
export default LogIn;