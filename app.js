const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongodb = require('mongodb');


// const Course = require('./models/course');
const url = 'mongodb://jeff:gunner@ds163181.mlab.com:63181/thinkful';
mongoose.connect(url);


app.use(bodyParser.json());
app.use(express.static('public'))


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
    res.render('index');
});

// POST
app.post('/course', function(req, res, next) {
    console.log(req.body);
    var course = 
    thiscourse = new Course(req.body);
    // Course.create()
    thiscourse.save(function (err){
        if (err){
            res.send(err);
        }
    })
//    // mongoose.connect(url, function(err, db) {
//      //   if (err) {
//        //     throw err;
//         }
//         db.collection('course_data').insertOne(course, function(err, result) {
//             if (err) {
//                 throw err;
//             }
     //       console.log('Course added');
//        })
  //  })
});

app.listen(8080, function(){
    console.log("app running 8080");
})



