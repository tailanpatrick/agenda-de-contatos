const express = require('express');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const route = express.Router();


route.get('*', (req, res) => {
    // Envia o arquivo HTML principal para todas as requisições
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});



module.exports = route;