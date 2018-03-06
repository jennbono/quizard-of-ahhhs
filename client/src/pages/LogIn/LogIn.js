import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import Navbar from "../../components/Nav";
import { Col, Container, Row } from "../../components/Grid";
import { Input, Label, FormBtn } from "../../components/Form";

class LogIn extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      redirectTo: null
    }
    // this.googleSignin = this.googleSignin.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('handleSubmit')
    this.props._login(this.state.username, this.state.password)
    this.setState({
      redirectTo: '/'
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
                <img src="../img/quizard_of_ahhhs.png" alt="Quizard of Ahhhs... Logo" height="200" />
                <form>
                  <Label htmlFor="username">Username: </Label>
                  <Input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                  <Label htmlFor="password">Password: </Label>
                  <Input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <button onClick={this.handleSubmit}>Login</button>
                </form>
                <a href="/auth/google">
                  {/* <GoogleButton /> */}
                  <img src="../img/google_signin.png" alt="Sign into Google Button" />
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