import React, { Component } from "react";
import Navbar from "../../components/Nav";
import { Col, Container, Row } from "../../components/Grid";
import { Card, CardBody, CardHeader } from "../../components/Card";
import { Redirect } from 'react-router-dom';



class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
        redirectTo: null
    };
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
                  <Navbar />
                  <Container fluid>
                    <Row>
                      <Col size="md-6">
                        <div className="text-center" >
                          <img className="logo img-fluid" src="../img/quizard_of_ahhhs.png" alt="Quizard of Ahhhs... Logo" height="200" />
                            <Card>
                                <CardHeader className="winner"><h1 className="text-center">You can now start the game</h1></CardHeader>
                                <CardBody>
                                <button className="btn-test text-center" onClick={this.handleSubmit}>Start</button>
                                </CardBody>
                            </Card>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
    )
  }
}
    
    
export default Start;