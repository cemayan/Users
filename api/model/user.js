
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/users',{"useNewUrlParser": true });
var mongoSchema = mongoose.Schema;

var userSchema = {
    "name": String,
    "surname":String,
    "username":String,
    "password":String
};


module.exports = mongoose.model('users', userSchema);