import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import Navbar from "../../components/Nav";
import { Col, Container, Row } from "../../components/Grid";
import { Card, CardBody, CardHeader } from "../../components/Card";


class Leaderboard extends Component {
  constructor() {
    super();

    this.state = {
      data: []
    };
  }
  componentDidMount() {
    axios.get('/auth/leaderboard').then(response => {
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

    let result = this.state.data.map(score => ({ value: score.local.username, text: score.highscore }));
    var resultScores
    return (
      <div>
        <Navbar _logout={this._logout} loggedIn={this.state.loggedIn} />
        <Container fluid>
          <Row>
            <Col size="md-6">
              <img className="mx-auto d-block logo img-fluid" src="img/quizard_of_ahhhs.png" alt="Quizard of Ahhhs... Logo" height="200" />
              <Card>
                <CardHeader><h1 className="text-center">Top 10 Leaderboard</h1>
                </CardHeader>
                <CardBody>
                  {resultScores = result.map(topScores =>
                    <h6 className="text-center">{topScores.value} - {topScores.text} </h6>
                  )}
                  <div className="text-center">
                    <button className="btn-test text-center" onClick={this.handleSubmit}>Play Again</button>
                  </div>
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