const express = require('express');
const { getCsrfToken } = require('../controllers/CsrfController');
const registerController = require('../controllers/registerController')
const loginController = require('../controllers/loginController')

const route = express.Router();


route.get('/teste', (req, res) => {
    res.send('Hello World!')
});

route.get('/__sec/__csrf-token', getCsrfToken);
route.get('/__sec/__session', loginController.getSession)

route.post('/register', registerController.register);
route.post('/login', loginController.login);


route.get('/logout', loginController.logOut);

module.exports = route;