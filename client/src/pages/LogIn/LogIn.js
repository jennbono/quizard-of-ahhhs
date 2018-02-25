import React, { Component } from "react";
import Navbar from "../../components/Navbar";
import { Col, Container, Row } from "../../components/Grid";
import { Input, Label, FormBtn } from "../../components/Form";


class LogIn extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Container fluid>
          <Row>
            <Col size="md-6">
              <img src="../img/quizard_of_ahhhs.png" alt="Quizard of Ahhhs... Logo" height="200" />
              <form>
                <Label>Username</Label>
                <Input
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  name="username"
                  placeholder="Username (required)"
                />
                <Label>Password</Label>
                <Input
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  name="password"
                  placeholder="Password (required)"
                />
                <FormBtn
                  disabled={!(this.state.name)}
                  onClick={this.handleFormSubmit}
                >
                  Log In
                    </FormBtn>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default LogIn;