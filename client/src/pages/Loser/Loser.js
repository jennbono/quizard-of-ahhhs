import React, { Component } from "react";
import ReactHowler from 'react-howler';
import Navbar from "../../components/Nav";
import { Col, Container, Row } from "../../components/Grid";
import { Card, CardBody, CardHeader } from "../../components/Card";
import { Redirect } from 'react-router-dom';


class Loser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
        redirectTo: '/question'
      })    
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    }
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
                  <button className="btn-test text-center" onClick={this.handleSubmit}>Start Again</button>
                </CardBody>
              </Card>
              {/* Need to insert button to enter the questions page to play again ONLY IF LOGGED IN */}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}


export default Loser;