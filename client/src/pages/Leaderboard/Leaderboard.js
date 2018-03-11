import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";
//import Navbar from "../../components/Nav";
//import { Col, Container, Row } from "../../components/Grid";
//import { Card, CardBody, CardHeader } from "../../components/Card";
//import Routes from "../../../routes/userRoutes";
//import API from "../../../server/auth";



class Leaderboard extends Component {
  constructor() {
    super();

    this.state = {
      data: []
    };
  }
  componentDidMount() {
    axios.get('/auth/leaderboard').then(response => {
      console.log(response.data);
       this.setState({
          data: response.data
        })    
    })
  }
  render() { 

  //   return (
  //     this.props.data.map((highscore, index) => (
  //     <span className="indent" key={index}>
  //         {index}
  //     </span>
  //     )
  // ));

  // var score = [];
  // for (var i = 0; i < 5; i++) {
  //   this.state.data.push(<span  key={i}></span>);
  // }
  // return (
  //    <div>
  //     {score}
  //     "Some text value"
  //    </div>
  // );




  // Object.entries(this.props.data).map(([name, highscore]) => {
  //   console.log(name)
  //   console.log(highscore)
  //console.log(this.state.data)

     // this.state.data.map((item,i) => <li key={i}>Test</li>)

     //  this.state.data.map(function(name, i){
    //   console.log('test');
     
    //   return <li key={i}>test</li>
    // })

  //   return (
  //     <div>
  //      {this.state.data.map((item, index) => (
  //         <span className='indent' key={index} />
  //      ))}
  //      "Some text value"
  //     </div>
  //  );
  // var indents = [];
  // for (var i = 0; i < this.props.level; i++) {
  //   indents.push(<span className='indent' key={i}></span>);
  // }
  // return indents;

      
      // Object.entries(this.props.data).map(([name, highscore]) => {
      //   console.log(name)
      // console.log(highscore)
     


      
   
    //   <div>
    //     <p>User: {name}</p>
    //     <p>High Score: {highscore}</p>
    //  </div>
    //)
    
    let result = this.state.data.map(score => ({ value: score.name, text: score.highscore }));
    console.log(result)
    var text = "jill";
    var resultScores;
    return (
      <div>
        {resultScores = result.map(top => <li>{top.value}</li> )}
      </div>
      
    );
    
  }
}
export default Leaderboard;