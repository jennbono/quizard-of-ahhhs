import React, { Component } from "react";
import Navbar from "../../components/Nav";
import { Col, Container, Row } from "../../components/Grid";
import { Card, CardBody, CardHeader } from "../../components/Card";



class Question extends Component {
  render() {
    return (
      <div className="background">
        <Navbar />
        <Container fluid>
          <Row>
            <Col size="md-6">
              <img className="mx-auto d-block" src="img/quizard_of_ahhhs.png" alt="Quizard of Ahhhs... Logo" height="200" />
              <Card>
                <CardHeader><h1 className="text-center">Question 1</h1></CardHeader>
                <CardBody>
                  <h4 className="text-center">What is the third planet from the sun?</h4>
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