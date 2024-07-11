const express = require('express')
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController')

const route = express.Router();

// Rotas da home
route.get('/', homeController.paginaInicial);
route.post('/', homeController.trataPost);

// rotas login
route.get('/login', loginController.login);

// rotas cadastro
route.get('/register', registerController.register);


module.exports = route;