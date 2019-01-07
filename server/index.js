'use strict';

const port = process.env.PORT || 8080;

const express = require('express');
const https = require('https');
const http = require('http');

const app = express();
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const compression = require('compression');

if (process.env.NODE_ENV === 'production') {
    console.log('Setting ca bundle');
    const trustedCa = [
        '/etc/ssl/certs/ca-bundle.crt'
    ];

    https.globalAgent.options.ca = [];
    http.globalAgent.options.ca = [];
    for (const ca of trustedCa) {
        https.globalAgent.options.ca.push(fs.readFileSync(ca));
        http.globalAgent.options.ca.push(fs.readFileSync(ca));
    }
    console.log('ca bundle set...');
}

const respond = (req, res) => {
    res.send('OK');
};

process.title = 'cop-private-ui';

app.set('port', port);
app.use(compression());

app.use(express.static(__dirname + "/"));

app.use(cors());

app.get('/healthz', respond);
app.get('/readiness', respond);


const domain = process.env.DOMAIN;
const bpmnModelerName = process.env.WORKFLOW_MODELER;
const bpmnModelerUrl = `https://${bpmnModelerName}.${domain}`;
console.log("bpmnModeler " + bpmnModelerUrl);

app.get('/api/config', (req, res) => {
    res.send({
        'REALM': process.env.AUTH_REALM,
        'AUTH_URL': process.env.AUTH_URL,
        'CLIENT_ID': process.env.AUTH_CLIENT_ID,
        'MODELER_URL': bpmnModelerUrl,
        "UI_VERSION": process.env.UI_VERSION,
        "UI_ENVIRONMENT" : process.env.UI_ENVIRONMENT,
        "AUTH_ACCESS_ROLE" : process.env.AUTH_ACCESS_ROLE
    })
});

const appendBrToContentType = (req, res, next) => {
  req.url = req.url + '.br';
  res.set('Content-Encoding', 'br');
  next();
};

app.get('*.js', appendBrToContentType);

app.get('*.css', appendBrToContentType);

app.all('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const server = http.createServer(app).listen(app.get('port'), function () {
    console.log('TaskList Prod server listening on port ' + app.get('port'));
});


const shutDown = () => {
  console.log('Received kill signal, shutting down gracefully');
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);

  connections.forEach(curr => curr.end());
  setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
};

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
process.on('SIGQUIT', shutDown);

let connections = [];

server.on('connection', connection => {
    connections.push(connection);
    connection.on('close', () => connections = connections.filter(curr => curr !== connection));
});


