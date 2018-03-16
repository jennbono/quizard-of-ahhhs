import React, { Component } from "react";
import ReactPlayer from 'react-player';
import Navbar from "../../components/Nav";
import { Col, Container, Row } from "../../components/Grid";
import { Card, CardBody, CardHeader } from "../../components/Card";
import { Redirect } from 'react-router-dom';


class Winner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      redirectTo: '/leaderboard'
    })
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    }
    return (
      <div>
        <Navbar />
        <Container fluid>
          <Row>
            <Col size="md-6">
              <img className="mx-auto d-block winner-logo img-fluid" src="img/Emerald_Quizity.png" alt="Emerald Quizity Logo" height="250" />
              <Card>
                <CardHeader className="winner"><h1 className="text-center">Congratulations!</h1></CardHeader>
                <CardBody>
                  <h3 className="text-center">You have won the game.</h3>
                  <div className="text-center">
                    <button className="btn-test text-center" onClick={this.handleSubmit}>Go to Leaderboard</button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <ReactPlayer
            url='audio/no_place_like_home.wav'
            playing
            width='0%'
            height='0%'
          />
        </Container>
      </div>
    )
  }
}


export default Winner;