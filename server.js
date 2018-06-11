const port = process.env.PORT || 8080;

const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const proxy = require('http-proxy-middleware');
const cors = require('cors')


const respond = (req, res) => {
    res.send('OK');
};

process.title = 'borders-workflow-tasklist';

app.set('port', port);

app.use(express.static(__dirname + "/"));

app.use(cors());

app.get('/healthz', respond);
app.get('/readiness', respond);

console.log("platform data name " + process.env.PLATFORM_DATA);
console.log("workflow name " + process.env.WORKFLOW_NAME);
console.log("formio name " + process.env.FORM_IO_NAME);
console.log("bpmn modeler name " + process.env.WORKFLOW_MODELER);
console.log("translation name" + process.env.TRANSLATION_SERVICE_NAME);


const domain = process.env.DOMAIN;

const platformData = process.env.PLATFORM_DATA;
const workflowName =process.env.WORKFLOW_NAME;
const formIOName = process.env.FORM_IO_NAME;
const bpmnModelerName = process.env.WORKFLOW_MODELER;
const translationServiceName =  process.env.TRANSLATION_SERVICE_NAME;
const reportingServiceName = process.env.REPORTING_SERVICE_NAME;
const intdomain = process.env.INT_DOMAIN;

const platformDataUrl = `https://${platformData}.${intdomain}`;
const workflowUrl = `https://${workflowName}.${intdomain}`;
const formIOUrl = `https://${formIOName}.${domain}`;
const bpmnModelerUrl =  `https://${bpmnModelerName}.${domain}`;
const translationServiceUrl = `https://${translationServiceName}.${intdomain}`;
const reportingServiceUrl = `https://${reportingServiceName}.${domain}`;

console.log("platformDataUrl " + platformDataUrl);
console.log("workflowUrl " + workflowUrl);
console.log("formIOUrl " + formIOUrl);
console.log("bpmnModeler " + bpmnModelerUrl);
console.log("translationServiceUrl " + translationServiceUrl);
console.log("reportingServiceUrl " + reportingServiceUrl);



app.use('/api/platform-data', proxy(
    {
        target: platformDataUrl,
        pathRewrite: {
            '^/api/platform-data/' : ''
        },
        onProxyReq: function onProxyReq(proxyReq, req, res) {
            console.log('Platform Data Proxy -->  ', req.method, req.path, '-->', platformDataUrl, proxyReq.path);
        },
        onError: function onError(err, req, res) {
            console.error(err);
            res.status(500);
            res.json({error: 'Error when connecting to remote server.'});
        },
        logLevel: 'debug',
        changeOrigin: true,
        secure: false
    }
));


app.use('/api/workflow', proxy({
    target: workflowUrl,
    onProxyReq: function onProxyReq(proxyReq, req, res) {
        console.log('Workflow Proxy -->  ', req.method, req.path, '-->', workflowUrl, proxyReq.path);
    },
    onError: function onError(err, req, res) {
        console.error(err);
        res.status(500);
        res.json({error: 'Error when connecting to remote server.'});
    },
    logLevel: 'debug',
    changeOrigin: true,
    secure: false
}));

app.use('/rest/camunda', proxy({
    target: workflowUrl,
    onProxyReq: function onProxyReq(proxyReq, req, res) {
        console.log('Workflow Proxy Camunda REST-->  ', req.method, req.path, '-->', workflowUrl, proxyReq.path);
    },
    onError: function onError(err, req, res) {
        console.error(err);
        res.status(500);
        res.json({error: 'Error when connecting to remote server.'});
    },
    logLevel: 'debug',
    changeOrigin: true,
    secure: false
}));

app.use('/api/form', proxy(
    {
        target: formIOUrl,
        pathRewrite: {
            '^/api/form' : '/form'
        },
        onProxyReq: function onProxyReq(proxyReq, req, res) {
            console.log('Form IO Proxy -->  ', req.method, req.path, '-->', formIOUrl, proxyReq.path);
        },
        onError: function onError(err, req, res) {
            console.error(err);
            res.status(500);
            res.json({error: 'Error when connecting to remote server.'});
        },
        logLevel: 'debug',
        changeOrigin: true,
        secure: false
    }
));

app.use('/api/translation', proxy(
    {
        target: translationServiceUrl,
        onProxyReq: function onProxyReq(proxyReq, req, res) {
            console.log('Translation Service Proxy -->  ', req.method, req.path, '-->', translationServiceUrl, proxyReq.path);
        },
        onError: function onError(err, req, res) {
            console.error(err);
            res.status(500);
            res.json({error: 'Error when connecting to remote server.'});
        },
        logLevel: 'debug',
        changeOrigin: true,
        secure: false
    }
));

app.use('/api/reports', proxy(
    {
        target: reportingServiceUrl,
        onProxyReq: function onProxyReq(proxyReq, req, res) {
            console.log('Reporting Service Proxy -->  ', req.method, req.path, '-->', reportingServiceUrl, proxyReq.path);
        },
        onError: function onError(err, req, res) {
            console.error(err);
            res.status(500);
            res.json({error: 'Error when connecting to remote server.'});
        },
        logLevel: 'debug',
        changeOrigin: true,
        secure: false
    }
));



app.get('/api/config', (req,res) => {
   res.send({
       'REALM': process.env.REALM,
       'AUTH_URL': process.env.AUTH_URL,
       'CLIENT_ID': process.env.CLIENT_ID,
       'MODELER_URL' : bpmnModelerUrl
   })
});

app.all('*', function (req, res) {
    console.log("Request to tasklist");
    res.sendFile(path.join(__dirname, 'index.html'));
});

const server = http.createServer(app).listen(app.get('port'), function () {
    console.log('TaskList Prod server listening on port ' + app.get('port'));
});

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
process.on('SIGQUIT', shutDown);

let connections = [];

server.on('connection', connection => {
    connections.push(connection);
    connection.on('close', () => connections = connections.filter(curr => curr !== connection));
});

function shutDown() {
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
}


