import React, { Component } from "react";
import Navbar from "../../components/Nav";
import { Col, Container, Row } from "../../components/Grid";
import { Card, CardBody, CardHeader } from "../../components/Card";
import API from "../../utils/api";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: [],
      timer: null,
      answers: [],
      answerClicked: null,
      correctAnswerIndex: null,
      questionNum: 1,
      totalAnswered: 0,
      totalCorrect: 0,
      totalWrong: 0,
      questionOn: true //true to display question, false to display answer
    };
  }

  componentWillMount() {
    this.showQuestion();
  }

  componentWillUnmount() {

  }

  showQuestion() {
    API.getQuestions()
      .then(res => {
        this.setState({ question: res.data.results[0] });
        console.log(this.state.question);
        this.makeAnswerArray();
      })
      .catch(err => console.log(err));
  }

  makeAnswerArray() {
    const temp = [];
    const questObj = this.state.question;
    this.setState({ correctAnswerIndex: Math.floor(Math.random() * 4)});
    console.log(this.state.correctAnswerIndex);
    switch (this.state.correctAnswerIndex) {
      case 0:
        temp.push(questObj.correct_answer, questObj.incorrect_answers[0], questObj.incorrect_answers[1], questObj.incorrect_answers[2]);
        break;
      case 1:
        temp.push(questObj.incorrect_answers[0], questObj.correct_answer, questObj.incorrect_answers[1], questObj.incorrect_answers[2]);
        break;
      case 2:
        temp.push(questObj.incorrect_answers[0], questObj.incorrect_answers[1], questObj.correct_answer, questObj.incorrect_answers[2]);
        break;
      case 3:
        temp.push(questObj.incorrect_answers[0], questObj.incorrect_answers[1], questObj.incorrect_answers[2], questObj.correct_answer);
        break;
      default:
        break;
    }
    this.setState({ answers: temp});
    console.log(this.state.answers);
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
                  <CardHeader><h1 className="text-center">Question {this.state.questionNum}</h1></CardHeader>
                  <CardBody>
                    <h4 className="text-center">{this.state.question.question}</h4>
                  </CardBody>
                </Card>
                <div className="text-center">
                  {this.state.answers.map((option, index) => {
                    return (
                      <div key={index}>
                        <button type="button" className="btn btn-outline-dark answer-btn text-center">{option}</button>
                        <br />
                      </div>
                    );
                  })}
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