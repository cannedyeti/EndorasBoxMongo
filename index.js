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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Use controllers/users for routes going to api/users
app.use('/api/users', expressJWT({secret: secret}).unless({
  path: [{ url: '/api/users', methods: ['POST'] }]
}), require('./controllers/users'));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ message: 'You need an authorization token to view this information.' });
  }
});

app.post('/api/auth', function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    // return 401 if error or no user
    if (err || !user) return res.status(401).send({ message: 'User not found' });

    // attempt to authenticate a user
    var isAuthenticated = user.authenticated(req.body.password);
    // return 401 if invalid password or error
    if (err || !isAuthenticated) return res.status(401).send({ message: 'User not authenticated' });

    // sign the JWT with the user payload and secret, then return
    var token = jwt.sign(user.toJSON(), secret);

    return res.send({ user: user, token: token });
  });
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000);