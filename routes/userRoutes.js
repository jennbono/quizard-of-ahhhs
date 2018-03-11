var router = require("express").Router();
var Users = require ("../server/db/models/user");;
var axios = require ("axios")

router.get("/api/users", (req, res) => {
    Users.find(req.query).then(function (err, data){
        res.json(data)})
    }
);

// router.get('/leaderboard', (req, res) =>{
//   Users.find({}).sort({highscore: -1}).limit(5).then(function (err, data) {
//     res.json(data);
//     console.log(data);
//   })
// })
// ProjectModel.find({projectName: 'name'}).sort({viewCount: -1}).limit(5).exec( 
//   function(err, projects) {
//       ...
//   }
// );

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
  // router.get('/leaderboard', (req, res) =>{
  //   console.log("another leader");
  //   Users.find({}).sort({highscore: -1}).limit(5).then(function (err, data) {
  //     res.json(data);
  //     console.log(data);
  //     console.log("inside leaderboard");
  //   })
  //   })
  

module.exports = router;
