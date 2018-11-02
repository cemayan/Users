var express = require("express");
var app = express();
var mongoOpUser = require("../model/user");
var router = express.Router();
var http = require('http').Server(app);
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../config');




router.route("/")
.get(function(req, res) {



var token = req.body.token || req.query.token || req.headers['x-access-token'];
 
if (token) {
  jwt.verify(token, config.secret, function(err, decoded) {      
     if (err) {
      return res.json({ success: false, message: 'Failed to authenticate token.' });       } 
      else {
      
          var response = {};
          mongoOpUser.find({}, function(err, data) {
            res.json(data);
          }); 
    }
  });

} else {
  return res.status(403).send({ 
      success: false, 
      message: 'No token provided.' 
  });

}











})
.post(function(req, res) {



  var token = req.body.token || req.query.token || req.headers['x-access-token'];
 
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {      
       if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });       } 
        else {
        
            var db = new mongoOpUser();
            var response = {};

            db.name = req.body.name
            db.surname = req.body.surname
            db.username = req.body.username
            db.password = req.body.password

            db.save(function(err) {
              if (err) {
                response = {
                  "message": "Something went wrong"
                };
              } else {
                response = {
                  "message": "New user added"
                };
              }
              res.json(response);
            });


      }
    });
  
  } else {
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  
  }

})


router.route("/:id")
.get(function(req, res) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];
 
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {      
       if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });       } 
        else {
          var response = {};
          mongoOpUser.findById(req.params.id, function(err, data) {
            res.json(data);
          });
      }
    });
  }
  
})
.put(function(req, res) {


  var token = req.body.token || req.query.token || req.headers['x-access-token'];
 
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {      
       if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });       } 
        else {
          var db = new mongoOpUser();
          var response = {};
          mongoOpUser.findById(req.params.id, function(err, data) {

            data.set({name : req.body.name, surname : req.body.surname, username : req.body.username, password: bcrypt.hashSync(req.body.password, 8)})
            data.save(function(err) {
              if (err) {
                response = {
                  "message": "Something went wrong"
                };
              } else {
                response = {
                  "message": "Updated : " + req.params.id
                };
              }
              res.json(response);
            })
          });

      }
    });
  }


}).delete(function(req, res) {



  var token = req.body.token || req.query.token || req.headers['x-access-token'];
 
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {      
       if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });       } 
        else {

            var response = {};
            mongoOpUser.findById(req.params.id, function(err, data) {
              mongoOpUser.remove({
                _id: req.params.id
              }, function(err) {
                if (err) {
                  response = {
                    "message": "Something went wrong."
                  };
                } else {
                  response = {
                    "message": "Deleted."
                  };
                }
                res.json(response);
              });

            });

      }
    });
  }








})

module.exports = router;