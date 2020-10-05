const express = require('express');
const routes = express.Router();

// Controllers
const loginController = require('./controllers/loginController');


// SignUp
routes.post("/signup", loginController.signup);

// SignIn
routes.post("/session", loginController.signin);


module.exports = routes;