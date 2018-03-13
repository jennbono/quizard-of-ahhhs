import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import TextField from "material-ui/TextField";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from "../../components/Nav";
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


class Signup extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      usernameError: '',
      password: '',
      passwordError: '',
      confirmPassword: '',
      confirmPasswordError: '',
      redirectTo: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  validate = () => {
    let isError = false;
    const errors = {
      usernameError: "",
      passwordError: "",
      confirmPasswordError: "",
    };

    if (this.state.username.length < 5) {
      isError = true;
      errors.usernameError = "Username needs to be atleast 5 characters long";
    }

    if (this.state.username.length === 0) {
      isError = true;
      errors.usernameError = "UserName is required";
    }
    if (this.state.password.length === 0) {
      isError = true;
      errors.passwordError = "Password is required";
    }
    if (this.state.confirmPassword.length === 0) {
      isError = true;
      errors.confirmPasswordError = "Confirm Password is required";
    }

    if (!(this.state.password === this.state.confirmPassword)) {
      isError = true;
      errors.confirmPasswordError = "Password missmatch ";
    }

    this.setState({
      ...this.state,
      ...errors
    });
    return isError;
  }
  handleSubmit(event) {
    event.preventDefault()
    // TODO - validate!
    const err = this.validate();
    if (!err) {
      axios
        .post('/auth/signup', {
          username: this.state.username,
          password: this.state.password
        })
        .then(response => {
          console.log(response)
          if (!response.data.errmsg) {
            console.log('youre good')
            this.setState({
              redirectTo: '/login'
            })
          } else {
            console.log('duplicate')
          }
        })

    }
  }
  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    }
    return (
      <MuiThemeProvider>
        <div>
          <Navbar />
          <div className="text-center">
            <img className="logo" src="../img/quizard_of_ahhhs.png" alt="Quizard of Ahhhs... Logo" height="200" />
            <form>
              <div className="SignupForm">
                <TextField 
                  inputStyle={styles.inputStyle}
                  floatingLabelText="Styled Floating Label Text"
                  floatingLabelStyle={styles.floatingLabelStyle}
                  hintText="Custom Underline Color"
                  underlineStyle={styles.underlineStyle}
                  hintText="Custom Underline Focus Color"
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
                <TextField 
                  inputStyle={styles.inputStyle}
                  floatingLabelText="Styled Floating Label Text"
                  floatingLabelStyle={styles.floatingLabelStyle}
                  hintText="Custom Underline Color"
                  underlineStyle={styles.underlineStyle}
                  hintText="Custom Underline Focus Color"
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
                <TextField 
                  inputStyle={styles.inputStyle}
                  floatingLabelText="Styled Floating Label Text"
                  floatingLabelStyle={styles.floatingLabelStyle}
                  hintText="Custom Underline Color"
                  underlineStyle={styles.underlineStyle}
                  hintText="Custom Underline Focus Color"
                  underlineFocusStyle={styles.underlineStyle}
                  floatingLabelText="Styled Floating Label Text"
                  floatingLabelStyle={styles.floatingLabelStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  type="password"
                  name="confirmPassword"
                  floatingLabelText="Confirm Password"
                  value={this.state.confirmPassword}
                  errorText={this.state.confirmPasswordError}
                  onChange={this.handleChange}
                /><br />
                <button className="btn-test" onClick={this.handleSubmit}>Sign Up</button>
              </div>
            </form>
          </div>

        </div>
      </MuiThemeProvider>
    )
  }
}

export default Signup;
