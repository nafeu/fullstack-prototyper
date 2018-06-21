const express = require('express');
const api = express.Router();
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DB_URI = require('../config').DB_URI;
const SECRET = require('../config').SECRET;

const User = require('../models/user');

mongoose.connect(DB_URI);
db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

api.use((req, res, next) => {
  const time = new Date().toTimeString();
  const {method, url} = req;
  const {statusCode} = res;

  console.log(`[ api.js - ${statusCode} ] ${method} ${url} : ${time}`);
  next();
})

api.get('/test', (req, res) => {
  res.status(200).send('OK');
})

api.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    User.find({email: req.body.email}, function(err, docs){
      if (docs.length) {
        res.status(200).send('User already exists');
      } else {
        const newUser = User({
          email: req.body.email,
          hash: hash
        })
        newUser.save(function(err){
          if (err) {
            res.status(400).send('DB Error.');
          } else {
            res.status(200).json({
              token: jwt.sign({ id: newUser._id }, SECRET)
            });
          }
        })
      }
    })
  });
})

api.post('/authenticate', (req, res) => {
  User.findOne({email: req.body.email}, function(err, result){
    if (err) {
      res.json({
        message: "Database error"
      });
    } else {
      if (result) {
        bcrypt.compare(req.body.password, result.hash, function(err, response){
          if (response) {
            res.json({
              token: jwt.sign({ id: result._id }, SECRET)
            });
          } else {
            res.json({
              message: "Invalid password"
            });
          }
        })
      } else {
        res.json({
          message: "Account does not exist"
        });
      }
    }
  })
})

api.post('/verify', (req, res) => {
  jwt.verify(req.body.token, SECRET, function(err, decoded) {
    if (err) {
      res.json({
        message: "Invalid token"
      });
    } else {
      User.findById(decoded.id, function(err, user){
        if (err) {
          res.json({
            message: "Invalid token, no user."
          });
        } else {
          res.json({
            email: user.email
          });
        }
      });
    }
  });
})

module.exports = api;