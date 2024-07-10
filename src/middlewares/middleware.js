exports.middlewareGlobal  = (req, res, next) => {
    res.locals.umaVariavelLocal = 'Este é o valor da variavel local'
    next();
}

// middleware que verifica erros de csrf
exports.checkCsrfError =  (err, req, res, next) => {
    if(err && err.code === 'EBADCSRFTOKEN'){
        return res.render('includes/error', {
            code: err.statusCode
        })
    }
};

exports.csrfMidddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}