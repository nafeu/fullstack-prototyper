const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const mongodb = require('mongodb');

const User = require('../models/user');

routes.use((req, res, next) => {
  const time = new Date().toTimeString();
  const {method, url} = req;
  const {statusCode} = res;

  console.log(`[ routes.js - ${statusCode} ] ${method} ${url} : ${time}`);
  next();
})

routes.get('/test', (req, res) => {
  res.status(200).send('OK');
})

routes.get('/login', (req, res) => {
  res.status(200).render('pages/login');
})

module.exports = routes;