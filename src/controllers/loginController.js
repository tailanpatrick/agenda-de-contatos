exports.login = (req, res) => {
    res.render('login', {
        auth: true
    })
}