import React, { Component } from "react";
import ReactHowler from 'react-howler';
import Navbar from "../../components/Nav";
import { Col, Container, Row } from "../../components/Grid";
import { Card, CardBody, CardHeader } from "../../components/Card";



class Loser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div>
        <ReactHowler
          src='audio/cackle3.mp3'
          playing={true}
        />
        <Navbar _logout={this._logout} loggedIn={this.state.loggedIn} />
        <Container fluid>
          <Row>
            <Col size="md-6">
              <img className="mx-auto d-block" src="img/lose_logo.png" alt="Loser Logo" height="250" />
              <Card>
                <CardBody>
                  <h3 className="text-center">The Wicked Witch of the West has summoned her monkeys to fly you away from the Emerald Quizity!  Try again next time! </h3>
                </CardBody>
              </Card>
              {/* Need to insert button to enter the Quizard of Ahhhs (questions page) ONLY IF LOGGED IN */}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}


export default Loser;