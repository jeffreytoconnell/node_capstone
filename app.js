const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const router = express.Router();

const Course = require('./models');
const url = 'mongodb://localhost:8080';

app.use(bodyParser.json());

// GET HOME PAGE
router.get('/', function(req, res, next) {
    res.render('index');
});

// POST
router.post('/course', function(req, res, next) {
    var course = {
        date: req.body.date,
        course: req.body.course,
        location: req.body.location,
        courseDirector: req.body.courseDirector,
        assist1: req.body.assist1,
        assist2: req.body.assist2,
        assist3: req.body.assist3
    }
});
