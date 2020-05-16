const express = require('express');

// add our router
const loginRouter = express.Router();

// require the login controller
const loginController = require('../controllers/loginController.js');

// Handle the default path to GET the login page
loginRouter.get('/', (req, res) => loginController.getPage(req, res));
// Handle the path to GET the failed login page
loginRouter.get('/failed', (req, res) => loginController.getFailedPage(req, res));
// Handle the requests for login POSTS
loginRouter.post('/verify', (req, res) => loginController.login(req, res));
// Handle the creation of account POSTS
loginRouter.post('/create', (req, res) => loginController.createUser(req, res));

// export the router
module.exports = loginRouter;
