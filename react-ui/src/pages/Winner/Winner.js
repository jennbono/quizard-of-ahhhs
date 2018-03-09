import React, { Component } from "react";
import Navbar from "../../components/Nav";
import { Col, Container, Row } from "../../components/Grid";
import { Card, CardBody, CardHeader } from "../../components/Card";



class Winner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div>
        <Navbar />
        <Container fluid>
          <Row>
            <Col size="md-6">
              <img className="mx-auto d-block winner-logo" src="img/Emerald_Quizity.png" alt="Emerald Quizity Logo" height="250" />
              <Card>
                <CardHeader className="winner"><h1 className="text-center">Congratulations!</h1></CardHeader>
                <CardBody>
                  <h3 className="text-center">You have won the game.</h3>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container> 
      </div>
    )
  }
}
    
    
export default Winner;