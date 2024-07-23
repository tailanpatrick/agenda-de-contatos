const helmet = require('helmet');

exports.middlewareGlobal  = (req, res, next) => {
    next();
}

exports.csrfMidddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

// middleware que verifica erros de csrf
exports.checkError =  (err, req, res, next) => {
    if(err){
        let errorMessage = 'Erro interno do servidor';

        if (err.statusCode === 403) errorMessage = 'Operação não permitida';
        
        return res.render('error', {
            errorCode: err.statusCode || '', 
            errorMessage: errorMessage
        })
    }
    next();
};

exports.check404 = (req, res, next) => {
    res.status(404).render('error', {
        errorMessage: 'A página solicitada não existe',
        errorCode: 404
    });
    next()
}