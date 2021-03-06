import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import TextField from "material-ui/TextField";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class SignupForm extends Component {
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

		if (this.state.username.length == 0) {
			isError = true;
			errors.usernameError = "UserName is required";
		}
		if (this.state.password.length == 0) {
			isError = true;
			errors.passwordError = "Password is required";
		}
		if (this.state.confirmPassword.length == 0) {
			isError = true;
			errors.confirmPasswordError = "Confirm Password is required";
		}

		if(!(this.state.password === this.state.confirmPassword)){
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
		if(!err){
			axios
			.post('/auth/signup', {
				username: this.state.username,
				password: this.state.password
			})
			.then(response => {
				if (!response.data.errmsg) {
					this.setState({
						redirectTo: '/login'
					})
				} else {
					console.log('duplicate')
				}
			})
			this.setState({
				usernameError: "",
				passwordError: "",
				confirmPasswordError: "",

			})

		}
	}
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
			<MuiThemeProvider>
			<form>
			<div className="SignupForm">
				<h1>Signup form</h1>
				<TextField
					type="text"
					name="username"
					floatingLabelText="User Name"
					value={this.state.username}
					errorText={this.state.usernameError}
					onChange={this.handleChange}
				/><br />
				<TextField
					type="password"
					name="password"
					floatingLabelText="Password"
					value={this.state.password}
					errorText={this.state.passwordError}
					onChange={this.handleChange}
				/><br />
				<TextField
					type="password"
					name="confirmPassword"
					floatingLabelText="Confirm Password"
					value={this.state.confirmPassword}
					errorText={this.state.confirmPasswordError}
					onChange={this.handleChange}
				/><br />
				<button className="btn-test" onClick={this.handleSubmit}>SignUp</button>
			</div>
			</form>
			</MuiThemeProvider>
		)
	}
}

export default SignupForm
