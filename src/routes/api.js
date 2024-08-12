const express = require('express');
const registerController = require('../controllers/registerController')
const loginController = require('../controllers/loginController')
const contactController = require('../controllers/contactController');

const route = express.Router();


route.get('/teste', (req, res) => {
    res.send('Hello World!')
});

route.get('/__sec/__session', loginController.getSession)

route.post('/register', registerController.register);
route.post('/login', loginController.login);


route.get('/logout', loginController.logOut);

route.get('/contacts', contactController.getContacts)

route.get('/contact/:id',contactController.getContact )

route.delete('/contact/:id', contactController.deleteContact);

route.put('/contact/:id', contactController.editContact);

route.post('/contact', contactController.register);

module.exports = route;