import React, { Component } from "react";
import Navbar from "../../components/Nav";
import { Col, Container, Row } from "../../components/Grid";
import { Card, CardBody, CardHeader } from "../../components/Card";



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div>
        <Navbar _logout={this._logout} loggedIn={this.state.loggedIn}/>
        <Container fluid>
          <Row>
            <Col size="md-6">
              <img className="mx-auto d-block logo" src="img/quizard_of_ahhhs.png" alt="Quizard of Ahhhs... Logo" height="250" />
              <Card>
                <CardHeader className="default"><h1 className="text-center">Rules of the Game</h1></CardHeader>
                <CardBody>
                  <h3 className="text-center">Every player has 10 seconds to answer each question.  The player with the most questions correct at the end of 15 questions will be the winner and will enter Emerald Quizity.</h3>
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
    
    
export default Home;