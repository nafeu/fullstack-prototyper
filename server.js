const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const api = require('./components/api');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

let config;

try {
  config = require('./config');
} catch (err) {
  console.log('[ server.js ] Missing config file');
  config = {};
}

const env = process.env.NODE_ENV || 'dev';

console.log(`[ server.js ] Running app in ${env} environment`);

const port = config.SERVER_PORT || 8000;

server.listen(process.env.PORT || port, () => {
  console.log(`[ server.js ] Listening on port ${server.address().port}`);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
app.use('/api', api);

module.exports = server;