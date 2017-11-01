require("dotenv").config();
var express = require('express');
var bodyParser = require('body-parser');
var User = require('./models/user');
var app = express();

// SECRET AND JWT TOKENS
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = process.env.SECRET;

//mongoose models and connection
var mongoose = require('mongoose');
var User = require('./models/user');
mongoose.connect('mongodb://localhost/ScottSite');

app.use(bodyParser.urlencoded({ extended: false }));


// Use controllers/users for routes going to api/users
app.use('/api/users', expressJWT({secret: secret}).unless({
  path: [{ url: '/api/users', methods: ['POST'] }]
}), require('./controllers/users'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000);