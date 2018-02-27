import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
//import Home from "./pages/Home";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Question from "./pages/Question";
import './css/App.css';



const App = () =>
  <Router>
    <div>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/question" component={Question} />
      </div>
    </div>
  </Router>;

export default App;
