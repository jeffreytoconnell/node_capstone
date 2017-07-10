const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const {BasicStrategy} = require('passport-http');
const passport = require('passport');
const {User} = require('./models');
// const Course = require('./models/course');
const url = 'mongodb://jeff:gunner@ds163181.mlab.com:63181/thinkful';
mongoose.connect(url);
const basicStrategy = new BasicStrategy((username, password, callback) => {
  let user;
  User
    .findOne({username: username})
    .exec()
    .then(_user => {
      user = _user;
      if (!user) {
        return callback(null, false);
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return callback(null, false);
      }
      else {
        return callback(null, user);
      }
    })
    .catch(err => callback(err));
});

passport.use(basicStrategy);

router.post('/', (req, res) => {
  if (!req.body) {
    return res.status(400).json({message: 'No request body'});
  }

  if (!('username' in req.body)) {
    return res.status(422).json({message: 'Missing field: username'});
  }

  let {username, password, firstName, lastName} = req.body;

  if (typeof username !== 'string') {
    return res.status(422).json({message: 'Incorrect field type: username'});
  }

  username = username.trim();

  if (username === '') {
    return res.status(422).json({message: 'Incorrect field length: username'});
  }

  if (!(password)) {
    return res.status(422).json({message: 'Missing field: password'});
  }

  if (typeof password !== 'string') {
    return res.status(422).json({message: 'Incorrect field type: password'});
  }

  password = password.trim();

  if (password === '') {
    return res.status(422).json({message: 'Incorrect field length: password'});
  }

  // check for existing user
  return User
    .find({username})
    .count()
    .exec()
    .then(count => {
      if (count > 0) {
        return res.status(422).json({message: 'username already taken'});
      }
      // if no existing user, hash password
      return User.hashPassword(password)
    })
    .then(hash => {
      return User
        .create({
          username: username,
          password: hash,
          firstName: firstName,
          lastName: lastName
        })
    })
    .then(user => {
      return res.status(201).json(user.apiRepr());
    })
    .catch(err => {
      res.status(500).json({message: 'Internal server error'})
    });
});



app.use(bodyParser.json());
app.use(express.static('public')) // USE PUBLIC DIRECTORY


// Course Schema
var courseSchema = mongoose.Schema({
    date:{
        type: String,
        required: false
    },
    course:{
        type: String,
        required: false
    },
    location:{
        type: String,
        required: false
    },
    courseDirector:{
        type: String,
        required: false
    },
    assist1:{
        type: String,
        required: false
    },
    assist2:{
        type: String,
        required: false
    },
    assist3:{
        type: String,
        required: false
    }
});

var Course = mongoose.model('course', courseSchema)

// GET HOME PAGE
app.get('/', function(req, res, next) {
    res.render('index.html');
});

// POST
app.post('/course', function(req, res, next) {
    console.log(req.body); 
    thiscourse = new Course(req.body);
    thiscourse.save(function (err){
        if (err){
            res.send(err);
        }
    })
});
// GET
app.get('/course', function(req, res, next) {
    console.log(req.body)
    Course.find(function (err, docs) {
        if(err)
        res.send(err)
        res.json(docs)
    })
})


// DELETE
app.delete('/course/:id', (req, res) => {
    console.log(req.params);
    Course.findByIdAndRemove(req.params.id, function(err, docs){
        if(err)
        res.send(err)
        
    });
    console.log('Deleted', req.params.id);
    res.json({Message: "Item Delted"})
    
});

app.listen(8080, function(){
    console.log("app running 8080");
})



