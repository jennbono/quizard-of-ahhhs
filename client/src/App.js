
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { Component } from 'react';
import axios from 'axios';
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Question from "./pages/Question";
import Winner from "./pages/Winner";
import Loser from "./pages/Loser";
import Start from "./pages/Start";
import Leaderboard from "./pages/Leaderboard";
import Signup from './pages/Signup';
import './css/App.css';
import './css/font.css';


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
      if (!!response.data.user) {
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
    axios.post('/auth/logout').then(response => {
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
        <Router>
          <div>
            <Route exact path="/" component={Home} user={this.state.user}/>
            <Route exact path="/home" component={Home} user={this.state.user} />
            <Route exact path="/login" component={LogIn} user={this.state.user}/>
            <Route exact path="/question" component={() => <Question user={this.state.user}/>} />
            <Route exact path="/winner" component={Winner} user={this.state.user}/>
            <Route exact path="/loser" component={Loser} user={this.state.user}/>
            <Route exact path="/start" component={() => <Start user={this.state.user}/>} />
            <Route exact path="/leaderboard" component={() => <Leaderboard user={this.state.user}/>} />
            <Route exact path="/signup" component={Signup} />
          </div>
        </Router>

      </div>
    )
  }
}

export default App

