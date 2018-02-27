import React, { Component } from "react";
import Navbar from "../../components/Nav";
import { Col, Container, Row } from "../../components/Grid";
import { Card, CardBody, CardHeader } from "../../components/Card";



class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Container fluid>
          <Row>
            <Col size="md-6">
              <img className="main-logo" src="img/quizard_of_ahhs.png" alt="Quizard of Ahhhs... Logo" height="250" />
              <Card>
                <CardHeader><h1>Rules of the Game</h1></CardHeader>
                <CardBody>
                  <h3>Every player has 10 seconds to answer each question.  The player with the most questions correct at the end of 15 questions will be the winner and will enter Emerald Quizity.</h3>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container> 
      </div>
    )
  }
}
    
    
export default Home;