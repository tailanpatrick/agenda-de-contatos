exports.middlewareGlobal = (req, res, next) => {
    next();
};

exports.csrfMidddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

// Middleware que verifica erros de CSRF
exports.checkError = (err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        // Erro de token CSRF
        return res.status(403).json({ error: 'Operação não permitida. Token CSRF inválido ou ausente.' });
    }

    // Outros erros
    res.status(500).json({ error: 'Erro interno do servidor' });
};


exports.check404 = (req, res, next) => {
    res.status(404).json({ error: 'A página solicitada não existe' });
};
