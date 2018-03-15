import axios from "axios";


export default {
  getQuestions: function() {
    const queryURL = "https://opentdb.com/api.php?amount=15&category=9&difficulty=hard&type=multiple" ;
    return axios.get(queryURL);
  },

  PORT: process.env.PORT || 3001,
  

  getUsers: function() {

    return axios.get(`https://localhost:${this.PORT}/api/users` );

  }



}
