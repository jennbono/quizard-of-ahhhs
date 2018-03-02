import React, { Component } from "react";
import Navbar from "../../components/Nav";
import { Col, Container, Row } from "../../components/Grid";
import { Card, CardBody, CardHeader } from "../../components/Card";
import API from "../../utils/api";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      timer: null,
      questionNum: 1,
      totalAnswered: 0,
      totalCorrect: 0,
      totalWrong: 0,
      questionOn: false //true to display question, false to display answer
    };
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {

  }

  showQuestion() {

  }

  render() {
    return (
      <div className="background">
        <Navbar />
        <Container fluid>
          <Row>
            {this.state.questionOn ? (
              <Col size="md-6">
                {/* question component */}
                <img className="mx-auto d-block" src="img/quizard_of_ahhhs.png" alt="Quizard of Ahhhs... Logo" height="200" />
                <Card>
                  <CardHeader><h1 className="text-center">Question 1</h1></CardHeader>
                  <CardBody>
                    <h4 className="text-center">What is the third planet from the sun?</h4>
                  </CardBody>
                </Card>
                <div className="text-center">
                  <button type="button" className="btn btn-outline-dark answer-btn text-center">Option 1</button>
                  <br />
                  <button type="button" className="btn btn-outline-dark answer-btn text-center">Option 2</button>
                  <br />
                  <button type="button" className="btn btn-outline-dark answer-btn text-center">Option 3</button>
                  <br />
                  <button type="button" className="btn btn-outline-dark answer-btn text-center">Option 4</button>
                </div>
              </Col>
            ) : (
                <Col size="md-6">
                  {/* answer component */}
                </Col>
              )}

            
          </Row>
        </Container>
      </div>
    )
  }
}


export default Question;