exports.register = (req, res, next) => {
    res.render('register', {
        auth: false
    })
}

exports.postRegister = (req, res) => {
    
}