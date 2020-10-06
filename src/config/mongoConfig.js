// Dotenv
const path = require('path');
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? path.resolve('.env.test') : path.resolve('.env')
});


const mongoConfig = {
    connectionUrl: `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`
};

module.exports = mongoConfig;