// Dotenv
const path = require('path');
require('dotenv').config({ path: path.resolve('.env') });


// Cluster
const cluster = require('cluster');


// Express
const express = require('express');
const app = express();


// Middlewares
const morgan = require('morgan');


// Routes
const routes = require('./routes');


// Mids
app.use(express.json());
app.use(morgan('dev'));


// Routes
app.use(routes);


if (cluster.isMaster) {

    const numCPUs = require('os').cpus().length;

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

} else {
    app.listen(process.env.HTTP_PORT || 3333);
}