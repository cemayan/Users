var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

var User_ = require("../model/user");


router.post('/register', function(req, res) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
  User_.create({
    name : req.body.name,
    surname : req.body.surname,
    username : req.body.username,
    password : hashedPassword
  },
  function (err, user) {
    if (err) return res.status(500).send("There was a problem registering the user.")
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 3600 
    });
    res.status(200).send({ auth: true, token: token });
  }); 
});


router.post('/login', function(req, res) {
  User_.findOne({ username: req.body.username }, function (err, user) {
    if (err) return res.status(500).send({auth: false, token: null });
    if (!user) return res.status(404).send( {auth: false, token: null });
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 3600 
    });
    res.status(200).send({ auth: true, token: token });
  });
});



router.get('/me', function(req, res) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    User_.findById(decoded.id, function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");

      res.status(200).send({user:user,auth:true});
    });
  });
});



module.exports = router;