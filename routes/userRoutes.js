var router = require("express").Router();
var Users = require ("../models/Users");

router.get("/api/users", function(req, res) {
    Users.find(req.query).then(function (err, data){
        res.json(data)})
        
    }
);

router.post("/api/users", function(req, res) {
    Users.create(req.body).then(function (err, data) {
        res.json(data)
    })
})

//router.put 

//router.delete