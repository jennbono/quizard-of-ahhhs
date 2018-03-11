const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("../routes");
const dbConnection = require("../server/db");
const passport = require("passport");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const PORT = process.env.PORT || 5000;
const app = express();

app.use(morgan('dev'));
// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.use(
  session({
    secret: process.env.APP_SECRET || 'this is the default one',
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
  })
);

// ===== Passport ====
app.use(passport.initialize());
app.use(passport.session());// will call the deserializeUser

app.use(routes);
app.use('/auth', require('../server/auth'));

// ====== Error handler ====
app.use(function (err, req, res, next) {
  console.log('====== ERROR =======');
  console.error(err.stack);
  res.status(500);
});

app.listen(PORT, function () {
  console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
});