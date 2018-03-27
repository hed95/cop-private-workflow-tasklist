const port = process.env.PORT || 8080;

const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const proxy = require('http-proxy-middleware');


const respond = (req, res) => {
    res.send('OK');
};

process.title = 'borders-workflow-tasklist';

app.set('port', port);

app.use(express.static(__dirname + "/"));

app.get('/healthz', respond);
app.get('/readiness', respond);

console.log("prest name " + process.env.PREST_NAME);
console.log("workflow name " + process.env.WORKFLOW_NAME);
console.log("formio name " + process.env.FORM_IO_NAME);
console.log("bpmn modeler name " + process.env.WORKFLOW_MODELER);


const prestUrl = `${process.env[process.env.PREST_NAME + "_SERVICE_HOST"]}:${process.env[process.env.PREST_NAME + "_SERVICE_PORT"]}`;
const workflowUrl = `${process.env[process.env.WORKFLOW_NAME + "_SERVICE_HOST"]}:${process.env[process.env.WORKFLOW_NAME + "_SERVICE_PORT"]}`;
const formIOUrl = `${process.env[process.env.FORM_IO_NAME + "_SERVICE_HOST"]}:${process.env[process.env.FORM_IO_NAME + "_SERVICE_PORT"]}`;
const bpmnModeler =  `${process.env[process.env.WORKFLOW_MODELER + "_SERVICE_HOST"]}:${process.env[process.env.WORKFLOW_MODELER + "_SERVICE_PORT"]}`;


console.log("prestUrl " + prestUrl);
console.log("workflowUrl " + workflowUrl);
console.log("formIOUrl " + formIOUrl);
console.log("bpmnModeler " + bpmnModeler);

app.use('/api/reference-data', proxy({
    target: prestUrl,
    changeOrigin: true,
    pathRewrite: {"^/api/reference-data" : "/public"}
}));


app.use('/api/workflow', proxy({
    target: workflowUrl,
    changeOrigin: true
}));


app.use('/api/form', proxy({
    target: formIOUrl,
    changeOrigin: true,
    pathRewrite: {"^/api/form": "/form"}
}));

app.use('/form-builder', proxy({
    target: formIOUrl,
    changeOrigin: true,
    pathRewrite: {"^/form-builder": "/"}
}));


app.use('/bpmn-modeler', proxy({
    target: bpmnModeler,
    changeOrigin: true,
    pathRewrite: {"^/bpmn-modeler": "/"}
}));


app.get('/auth-config', (req,res) => {
   res.send({
       'REALM': process.env.REALM,
       'AUTH_URL': process.env.AUTH_URL,
       'CLIENT_ID': process.env.CLIENT_ID
   })
});

app.all('*', function (req, res) {
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


