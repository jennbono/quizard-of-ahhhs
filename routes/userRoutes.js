var router = require("express").Router();
var Users = require ("../server/db/models/user");;
var axios = require ("axios")

router.get("/api/users", (req, res) => {
    Users.find(req.query).then(function (err, data){
        res.json(data)})
    }
);

router.post("/api/users", (req, res) => {
    Users.create(req.body).then(function (err, data) {
        res.json(data)
    })
});

router.get('/api/questions', (req, res) => {
    const url = "https://opentdb.com/api.php?amount=15&category=9&difficulty=hard&type=multiple" ;
    axios.get(url).then((response) => {
      res.json(response.data);
        console.log(response.data);
    });
});

router.post('/api/users/highscore/:id', (req, res) => {
  Users.findOne({"_id": req.params.id})
  .then(user => {
      if (req.body.score > user.highscore) {
        user.update({
          $set:{
            "highscore": req.body.score
          }
        })
        .then(message => {
          res.json(message);
        }
        )
      }
      else {
        res.json(0);
      }
    })
  });


module.exports = router;
