import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import Navbar from "../../components/Nav";
import { Col, Container, Row } from "../../components/Grid";
import { Card, CardBody, CardHeader } from "../../components/Card";
import { Input, Label, FormBtn } from "../../components/Form";
import axios from "axios";
import TextField from "material-ui/TextField";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { yellow500 } from 'material-ui/styles/colors';

const styles = {
  floatingLabelStyle: {
    color: yellow500,
  },
  underlineStyle: {
    borderColor: yellow500,
  },
  inputStyle: {
    color: yellow500,
  }
};

class LogIn extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      usernameError: '',
      password: '',
      passwordError: '',
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
            redirectTo: '/start'
          })
        }
      })
  }

  validate = () => {
    let isError = false;
    const errors = {
      usernameError: "",
      passwordError: ""
    };

    if (this.state.username.length == 0) {
      isError = true;
      errors.usernameError = "UserName is required";
    }
    if (this.state.password.length == 0) {
      isError = true;
      errors.passwordError = "Password is required";
    }

    this.setState({
      ...this.state,
      ...errors
    });
    return isError;
  }


  handleSubmit(event) {
    event.preventDefault();
    const err = this.validate();
    if (!err) {
      console.log('handleSubmit');
      this._login(this.state.username, this.state.password);
      this.setState({
        usernameError: '',
        passwordError: ''
      })
    }


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
        <MuiThemeProvider>
          <div>
            <Navbar _logout={this._logout} loggedIn={this.state.loggedIn} />
            <Container fluid>
              <Row>
                <Col size="md-6">
                  <div className="text-center" >
                    <img src="../img/quizard_of_ahhhs.png" alt="Quizard of Ahhhs... Logo" height="200" />
                    <form>
                          {/* <Label htmlFor="username">Username: </Label> */}
                          <TextField 
                            inputStyle={styles.inputStyle}
                            floatingLabelText="Styled Floating Label Text"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            hintText="Custom Underline Color"
                            underlineStyle={styles.underlineStyle}
                            hintText="Custom Underline Focus Color"
                            underlineFocusStyle={styles.underlineStyle}
                            type="text"
                            name="username"
                            floatingLabelText="User Name"
                            value={this.state.username}
                            errorText={this.state.usernameError}
                            onChange={this.handleChange}
                          /><br />
                          {/* <Label htmlFor="password">Password: </Label> */}
                          <TextField 
                            inputStyle={styles.inputStyle}
                            floatingLabelText="Styled Floating Label Text"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            hintText="Custom Underline Color"
                            underlineStyle={styles.underlineStyle}
                            hintText="Custom Underline Focus Color"
                            underlineFocusStyle={styles.underlineStyle}
                            type="password"
                            name="password"
                            floatingLabelText="Password"
                            value={this.state.password}
                            errorText={this.state.passwordError}
                            onChange={this.handleChange}
                          />
                          <br />
                          <button className="btn-test" onClick={this.handleSubmit}>Login</button>
                    </form>
                    <a href="/auth/google">
                      {/* <GoogleButton /> */}
                      <img className="google-button" src="../img/google_signin.png" alt="Sign into Google Button" />
                    </a>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </MuiThemeProvider>
      )
    }
  }
}
export default LogIn;