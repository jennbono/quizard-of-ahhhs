import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_disabled_web.png'
import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png';
import TextField from "material-ui/TextField";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			usernameError: '',
			password: '',
			passwordError: '',
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
		event.preventDefault()
		const err = this.validate();
		if (!err) {
			this.props._login(this.state.username, this.state.password)
			this.setState({
				redirectTo: '/'
			})
		}
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<MuiThemeProvider>
					<div className="LoginForm">
						<h1>Login form</h1>
						<form>
							<label htmlFor="username">Username: </label>
							<TextField
								type="text"
								name="username"
								value={this.state.username}
								errorText={this.state.usernameError}
								onChange={this.handleChange}
							/>
							<label htmlFor="password">Password: </label>
							<TextField
								type="password"
								name="password"
								value={this.state.password}
								errorText={this.state.passwordError}
								onChange={this.handleChange}
							/>
							<button onClick={this.handleSubmit}>Login</button>
						</form>
						<a href="/auth/google">
							{/* <GoogleButton /> */}
							<img src={googleButton} alt="sign into Google Button" />
						</a>
					</div>
				</MuiThemeProvider>
			)
		}
	}
}

export default LoginForm
