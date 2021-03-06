import React, { Component } from "react";
import ReactPlayer from 'react-player';
import Navbar from "../../components/Nav";
import { Col, Container, Row } from "../../components/Grid";
import { Card, CardBody } from "../../components/Card";
import { Redirect } from 'react-router-dom';


class Loser extends Component {
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
        <Navbar _logout={this._logout} loggedIn={this.state.loggedIn} />
        <Container fluid>
          <Row>
            <Col size="md-6">
              <div className="text-center">
                <img className="logo img-fluid" src="img/lose_logo.png" alt="Loser Logo" height="200" />
              </div>
              <Card>
                <CardBody>
                  <h3 className="text-center">The Wicked Witch of the West has summoned her monkeys to fly you away from the Emerald Quizity!  Try again next time! </h3>
                  <div className="text-center">
                    <button className="btn-test text-center" onClick={this.handleSubmit}>Go to Leaderboard</button>
                  </div>
                </CardBody>
              </Card>
              {/* Need to insert button to enter the questions page to play again ONLY IF LOGGED IN */}
            </Col>
          </Row>
          <ReactPlayer
            url='audio/cackle3.mp3'
            playing
            width='0%'
            height='0%'
          />
        </Container>
      </div>
    )
  }
}


export default Loser;