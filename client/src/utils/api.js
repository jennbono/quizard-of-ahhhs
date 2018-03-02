import axios from "axios";

export default {
  getQuestions: function() {
    const queryURL = "https://opentdb.com/api.php?amount=15&category=9&difficulty=hard&type=multiple" ;
    return axios.get(queryURL);
  }
}
