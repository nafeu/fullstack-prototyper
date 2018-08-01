const express = require('express');
const api = express.Router();
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const MONGODB_URI = require('../config').MONGODB_URI || process.env.MONGODB_URI;
const SECRET = require('../config').SECRET || process.env.SECRET;
const ADMIN_SEED = require('../config').ADMIN_SEED || process.env.ADMIN_SEED;
const ALL_ROLES = ['admin', 'roleA', 'roleB', 'roleC'];

const User = require('../models/user');

mongoose.connect(MONGODB_URI);
db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Seed Administrator Account
const adminCredentials = ADMIN_SEED.split("/");
User.find({email: adminCredentials[0]}, function(err, docs) {
  if (docs.length) {
    // Administrator account is active
  } else {
    console.log('[ api.js - Seeding administrator account ]');
    bcrypt.hash(adminCredentials[1], 10, function(err, hash){
      const newAdmin = User({
        email: adminCredentials[0],
        hash: hash,
        role: 'admin'
      });
      newAdmin.save(function(err){
        if (err) {
          console.log(`[ api.js - ${err} ]`);
        } else {
          console.log('[ api.js - Administrator account created successfully ]');
        }
      })
    })
  }
})

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
  if (req.body.password.length < 8) {
    res.json({
      error: "Password too short (minimum 8 characters)."
    })
  } else {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      User.find({email: req.body.email}, function(err, docs){
        if (docs.length) {
          res.json({
            error: "Email address is already in use."
          })
        } else {
          const newUser = User({
            email: req.body.email,
            hash: hash
          })
          newUser.save(function(err){
            if (err) {
              res.json({
                error: err
              })
            } else {
              res.json({
                email: newUser.email,
                token: jwt.sign({ id: newUser._id }, SECRET)
              });
            }
          })
        }
      })
    });
  }
})

api.post('/authenticate', (req, res) => {
  User.findOne({email: req.body.email}, function(err, result){
    if (err) {
      res.json({
        error: "Database error."
      });
    } else {
      if (result) {
        bcrypt.compare(req.body.password, result.hash, function(err, matched){
          if (matched) {
            if (!result.active) {
              res.json({
                error: "Account has been deactivated."
              });
            } else {
              res.json({
                email: result.email,
                token: jwt.sign({ id: result._id }, SECRET)
              });
            }
          } else {
            res.json({
              error: "Invalid password."
            });
          }
        })
      } else {
        res.json({
          error: "Account does not exist."
        });
      }
    }
  })
})

api.post('/verify', (req, res) => {
  jwt.verify(req.body.token, SECRET, function(err, decoded) {
    if (err) {
      res.json({
        error: "Invalid token."
      });
    } else {
      User.findById(decoded.id, function(err, user){
        if (err) {
          res.json({
            error: "Invalid token, no user."
          });
        } else if (!user.active) {
          res.json({
            error: "Account has been deactivated."
          })
        } else {
          res.json({
            authorized: true
          });
        }
      });
    }
  });
})

api.post('/reset', (req, res) => {
  isAuth(req.body.token, ALL_ROLES).then(function(user){
    bcrypt.compare(req.body.oldPassword, user.hash, function(err, matched){
      if (matched) {
        bcrypt.hash(req.body.newPassword, 10, function(err, hash){
          user.hash = hash;
          user.save(function(err){
            if (err) {
              res.json({
                error: "Database error."
              });
            } else {
              res.json({
                email: user.email,
                token: jwt.sign({ id: user._id }, SECRET)
              });
            }
          })
        })
      } else {
        res.json({
          error: "Invalid password."
        });
      }
    })
  }, function(err){
    res.json({
      error: err
    });
  })
})

api.post('/sendlink', (req, res) => {
  User.find({email: req.body.email}, function(err, docs){
    if (docs.length) {
      console.log("[ api.js - Sent a magic link to: " + req.body.email + " ]")
      res.json({
        email: req.body.email
      })
    } else {
      res.json({
        error: "Invalid email address."
      })
    }
  })
})

api.post('/user/getInfo', (req, res) => {
  isAuth(req.body.token, ALL_ROLES).then(function(user){
    res.json({
      user: _.omit(user.toObject(), ['hash'])
    });
  }, function(err){
    res.json({
      error: err
    })
  });
})

function isAuth(token, roles) {
  return new Promise(function(resolve, reject){
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        reject(err);
      } else {
        User.findById(decoded.id, function(err, user){
          if (err) {
            reject(err);
          } else if (!user.active) {
            reject("Account has been deactivated.");
          } else if (!roles.includes(user.role)) {
            reject("Unauthorized request.")
          } else {
            resolve(user);
          }
        });
      }
    });
  })
}

module.exports = api;
