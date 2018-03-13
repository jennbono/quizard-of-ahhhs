import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import Navbar from "../../components/Nav";
import { Col, Container, Row } from "../../components/Grid";
import { Card, CardBody, CardHeader } from "../../components/Card";
//import Routes from "../../../routes/userRoutes";
//import API from "../../../server/auth";


class Leaderboard extends Component {
  constructor() {
    super();

    this.state = {
      data: []
    };
  }
  componentDidMount() {
    axios.get('/auth/leaderboard').then(response => {
      console.log(response.data);
      this.setState({
        data: response.data
      })
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
        redirectTo: '/question'
      })    
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    }

    let result = this.state.data.map(score => ({ value: score.name, text: score.highscore }));
    console.log(result)
    var text = "jill";
    var resultScores;
    return (
      <div>
        <Navbar _logout={this._logout} loggedIn={this.state.loggedIn} />
        <Container fluid>
          <Row>
            <Col size="md-6">
              <img className="mx-auto d-block" src="img/quizard_of_ahhhs.png" alt="Quizard of Ahhhs... Logo" height="200" />
              <Card>
                <CardHeader><h1 className="text-center">Leaderboard</h1>
                </CardHeader>
                <CardBody>
                  {resultScores = result.map(topScores =>
                    <h5>{topScores.value}  {topScores.text} </h5>
                  )}
                  <button className="btn-test text-center" onClick={this.handleSubmit}>Play Game</button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

    );

  }
}
export default Leaderboard;