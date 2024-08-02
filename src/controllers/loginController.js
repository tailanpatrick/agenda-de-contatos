const User = require('../models/User');

exports.login = async (req, res) => {
    try {
        const user = new User(req.body);

        await user.login();
        
        if(user.errors.length > 0) {
            
            return res.status(400).json({ error: user.errors})
        }
        
        req.session.user = user.user;

        return res.status(200).json({ message: 'Usuário logado com sucesso.'});    
    } catch(err){
        console.log('Erro no login do usuário:', err);
        res.status(500).json({ error: 'Erro interno do servidor'})
    }
}

exports.getSession = async (req, res) => {
    if(!req.session.user){
        return res.status(201).json({error: 'Não autorizado'})
    }

    const {password, ...userWithoutPasword } = req.session.user;

    res.json({
        user: userWithoutPasword
    })
}

exports.logOut = (req, res) => {
    req.session.destroy();
    res.json({message: 'Logout efetuado com sucesso'});
}