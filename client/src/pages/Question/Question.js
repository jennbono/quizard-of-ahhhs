import React, { Component } from "react";
import Navbar from "../../components/Nav";
import { Col, Container, Row } from "../../components/Grid";
import { Card, CardBody, CardHeader } from "../../components/Card";



class Question extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Container fluid>
          <Row>
            <Col size="md-6">
              <img className="main-logo" src="img/quizard_of_ahhs.png" alt="Quizard of Ahhhs... Logo" height="200" />
              <Card>
                <CardHeader><h1>Question 1</h1></CardHeader>
                <CardBody>
                  <h4>What is the third planet from the sun?</h4>
                </CardBody>
              </Card>
              <button type="button" className="btn btn-outline-dark answer-btn">Option 1</button>
              <br />
              <button type="button" className="btn btn-outline-dark answer-btn">Option 2</button>
              <br />
              <button type="button" className="btn btn-outline-dark answer-btn">Option 3</button>
              <br />
              <button type="button" className="btn btn-outline-dark answer-btn">Option 4</button>
            </Col>
          </Row>
        </Container> 
      </div>
    )
  }
}
    
    
export default Question;