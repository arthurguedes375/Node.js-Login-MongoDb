const express = require('express');
const routes = express.Router();

// Controllers
const loginController = require('./controllers/loginController');


// SignUp
routes.post("/signup", loginController.signup);


module.exports = routes;