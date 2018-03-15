import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import Navbar from "../../components/Nav";
import { Col, Container, Row } from "../../components/Grid";
import { Input, Label, FormBtn } from "../../components/Form";
import axios from "axios";
import TextField from "material-ui/TextField";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GoogleLogin} from 'react-google-login';
import { grey50 } from 'material-ui/styles/colors';

const styles = {
  floatingLabelStyle: {
    color: grey50,
  },
  underlineStyle: {
    borderColor: grey50,
  },
  floatingLabelTextStyle: {
    color: grey50,
  },
  inputStyle: {
    color: grey50,
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
      user: null,
      redirect: false

    }
    // this.googleSignin = this.googleSignin.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this._login = this._login.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseGoogleFail = this.responseGoogleFail.bind(this);
    this.signup = this.signup.bind(this);
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
  responseGoogle(response){
    console.log("google response");
    console.log(response);
    this.signup(response, 'google');
  }

  signup(res, type){
    let postData;
    // if(type === 'facebook' && res.email){
    //     postData = {
    //       name: res.name,
    //       provider: type,
    //       email: res.email,
    //       provider_id: res.id,
    //       token: res.accessToken
    //     };
    // }110028054490247465176
    if (type === 'google' && res.w3.U3) {
      postData = {
        'google.googleId': res.profileObj.googleId,
        firstName: res.w3.ofa,
        lastName: res.w3.wea,
        email: res.w3.U3,
        token: res.Zi.access_token
      };
    }
    if(postData){
      console.log(postData);
      axios
      .post('/auth/saveGoogleUser', {
        googleId: res.profileObj.googleId,
        firstName: res.w3.ofa,
        lastName: res.w3.wea,
        email: res.w3.U3,
        token: res.Zi.access_token
      })
      .then(response => {
        console.log("------response----");
        console.log(response.config.data);
        if (response.status === 200) {
          let responseJson  = response.config.data;
          console.log(JSON.stringify(responseJson));
          sessionStorage.setItem("user", responseJson);
          console.log("== added the google user ==");
          this.setState({
            loggedIn: true,
            user: response.data.user,
            redirectTo: '/start'
          })
        }
        else{
          console.log("==failed in adding the user==");
        }
      })  

    }//end of if

  }
  responseGoogleFail(response){
    console.log("responseGoogleFail");
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
            <Navbar loggedIn={this.state.loggedIn} />
            <Container fluid>
              <Row>
                <Col size="md-6">
                  <div className="text-center" >
                    <img className="logo img-fluid" src="../img/quizard_of_ahhhs.png" alt="Quizard of Ahhhs... Logo" height="200" />
                    <form>
                      {/* <Label htmlFor="username">Username: </Label> */}
                      <TextField
                        inputStyle={styles.inputStyle}
                        floatingLabelText="Styled Floating Label Text"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        underlineStyle={styles.underlineStyle}
                        underlineFocusStyle={styles.underlineStyle}
                        floatingLabelText="Styled Floating Label Text"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
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
                        underlineStyle={styles.underlineStyle}
                        underlineFocusStyle={styles.underlineStyle}
                        floatingLabelText="Styled Floating Label Text"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        type="password"
                        name="password"
                        floatingLabelText="Password"
                        value={this.state.password}
                        errorText={this.state.passwordError}
                        onChange={this.handleChange}
                      /><br />
                      <button className="btn-test" onClick={this.handleSubmit}>Login</button>
                    </form><br />
                    <GoogleLogin className="btn-test"
                      clientId="4863906804-hbsq07mcg6p1hcc1hd594s4unpgo8up3.apps.googleusercontent.com"
                      buttonText="Google Login"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogleFail}
                    />
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