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
