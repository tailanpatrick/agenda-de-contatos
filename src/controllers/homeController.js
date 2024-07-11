const HomeModel = require('../models/HomeModel');

exports.paginaInicial = (req, res, next) => {
    const auth = true;

    res.render('index', {
        titulo: 'Este será o título da página',
        auth: auth
    });

    return;
}

exports.trataPost = (req, res, next) => {
    res.send(req.body);
}