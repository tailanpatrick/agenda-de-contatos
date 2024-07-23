const HomeModel = require('../models/HomeModel');

exports.index = (req, res, next) => {
    const auth = true;

    res.render('index', {
        titulo: 'Este será o título da página',
        auth: auth
    });

    return;
}
