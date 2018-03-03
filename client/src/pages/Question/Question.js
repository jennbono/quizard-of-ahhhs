import React, { Component } from "react";
import Navbar from "../../components/Nav";
import { Col, Container, Row } from "../../components/Grid";
import { Card, CardBody, CardHeader } from "../../components/Card";
import API from "../../utils/api";
// fixes the appearance of quotation marks in questions
const Entities = require('html-entities').XmlEntities;
 
const entities = new Entities();

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: [],
      timer: 25,
      answers: [],
      answerClicked: null,
      correctAnswerIndex: null,
      questionNum: 0,
      totalAnswered: 0,
      totalCorrect: 0,
      totalWrong: 0,
      totalTimedOut: 0,
      questionOn: true //true to display question, false to display answer
    };
    this.showQuestion();
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      timer: this.state.timer - 1
    });
    const timer = this.state.timer;
    if ((timer + 5) % 25 === 10) {
      this.setState({ questionOn: false });
    }
    else if (timer % 25 === 0) {
      this.showQuestion();
    }
  }

  showQuestion() {
    let questionNum = this.state.questionNum;
    if (questionNum > 14) {
      this.endRound();
    }
    else {
      API.getQuestions()
      .then(res => {
        this.setState({ question: res.data.results[0], questionNum: questionNum+1, questionOn: true, timer: 25 });
        this.makeAnswerArray();
      })
      .catch(err => console.log(err));
    }
  }

  makeAnswerArray() {
    const temp = [];
    const questObj = this.state.question;
    this.setState({ correctAnswerIndex: Math.floor(Math.random() * 4)});
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
  }

  scoreAnswer = index => {
    const correctAnswer = this.state.correctAnswerIndex;
    let totalAnswered = this.state.totalAnswered;
    let totalCorrect = this.state.totalCorrect;
    let totalWrong = this.state.totalWrong;
      if (index === correctAnswer) {
        this.setState({ totalAnswered: totalAnswered+1, totalCorrect: totalCorrect+1, questionOn: false});
      }
      else if (index !== correctAnswer) {
        this.setState({ totalAnswered: totalAnswered+1, totalWrong: totalWrong+1, questionOn: false});
      }
  }

  endRound() {
    clearInterval(this.timerID);
    // this is the end of the game...add calls to end of game stuff
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
                    <p className="text-center">Time Remaining: {this.state.timer-5}</p>
                    <h4 className="text-center">{entities.decode(this.state.question.question)}</h4>
                  </CardBody>
                </Card>
                <div className="text-center">
                  {this.state.answers.map((option, index) => {
                    return (
                      <div key={index}>
                        <button type="button" className="btn btn-outline-dark answer-btn text-center" onClick={() => this.scoreAnswer(index)}>{entities.decode(option)}</button>
                        <br />
                      </div>
                    );
                  })}
                </div>

              </Col>
            ) : (
                <Col size="md-6">
                  {/* answer component */}
                  <img className="mx-auto d-block" src="img/quizard_of_ahhhs.png" alt="Quizard of Ahhhs... Logo" height="200" />

                <Card>
                  <CardHeader><h1 className="text-center">Question {this.state.questionNum}</h1></CardHeader>
                  <CardBody>
                    <p className="text-center">Time Until Next Question: {this.state.timer}</p>
                    <h4 className="text-center">{entities.decode(this.state.question.question)}</h4>
                    <h6 className="text-center">The correct answer is: {entities.decode(this.state.answers[this.state.correctAnswerIndex])}</h6>
                    <p className="text-center"><strong>Total Answered:</strong> {this.state.totalAnswered} out of {this.state.questionNum}</p>
                    <p className="text-center"><strong>Total Correct:</strong> {this.state.totalCorrect}</p>
                    <p className="text-center"><strong>Total Wrong:</strong> {this.state.totalWrong}</p>
                  </CardBody>
                </Card>
                </Col>
              )}
          </Row>
        </Container>
      </div>
    )
  }
}


export default Question;