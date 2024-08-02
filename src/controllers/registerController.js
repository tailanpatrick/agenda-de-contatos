const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const user = new User(req.body);

        await user.register();
        
        if(user.errors.length > 0) {
            
            return res.status(400).json({ error: user.errors})
        }
        
        return res.status(200).json({ message: 'Usuário criado com sucesso. Faça seu login.'})
    } catch(err){
        console.log('Erro no registro do usuário:', err);
        res.status(500).json({ error: 'Erro interno do servidor'})
    }
}