import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";


const App = () =>
  <Router>
    <div>
      <Navbar />
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
      </div>
    </div>
  </Router>;

export default App;
