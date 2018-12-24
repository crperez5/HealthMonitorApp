const http = require('http');
const express = require('express');
const { createTerminus, HealthCheckError } = require('@godaddy/terminus');
const { createHealthCheck } = require('./healthCheckFactory.js');

const PORT = process.argv[2] || 3000;
const APP_NAME = process.argv[3] || 'TestApp';
const APP_VERSION = process.argv[4] || '1.0';

const app = express();

function onSignal () {
  console.log('server is starting cleanup');
  return Promise.all([
    // your clean logic, like closing database connections
  ]);
}

function onShutdown () {
  console.log('cleanup finished, server is shutting down');
}

async function healthCheck () {
  const errors = []
  return Promise.all([
    createHealthCheck('sql'),
    createHealthCheck('smtp'),
    createHealthCheck('ftp'),
    createHealthCheck('permissions'),
    createHealthCheck('service')
  ].map(p => p.catch((error) => {
    // silently collecting all the errors
    errors.push(error)
    return undefined
  }))).then(() => {
    if (errors.length) {
      throw new HealthCheckError('healtcheck failed', errors)
    }
  })
}

const server = http.createServer(app);

const options = {
  // healtcheck options
  healthChecks: {
    '/healthcheck': healthCheck    // a promise returning function indicating service health
  },

  // cleanup options
  timeout: 1000,                   // [optional = 1000] number of milliseconds before forcefull exiting
  onSignal,                        // [optional] cleanup function, returning a promise (used to be onSigterm)
  onShutdown,                      // [optional] called right before exiting
};


createTerminus(server, options);

server.addListener('request', (req, res) => {
  if (req.url == '/healthcheck') {
    res.setHeader('Version', APP_VERSION);
    res.setHeader('Component', APP_NAME);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Expose-Headers', 'Version, Component');
  }
})

server.listen(PORT);