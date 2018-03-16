import axios from "axios";


export default {
  getQuestions: function() {
    const queryURL = "https://opentdb.com/api.php?amount=15&type=multiple" ;
    return axios.get(queryURL);
  },

  // PORT: process.env.PORT || 3001,
  





}
