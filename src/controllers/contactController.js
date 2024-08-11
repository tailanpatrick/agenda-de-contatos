const Contact = require('../models/Contact');

exports.register = async (req, res) => {
    const userId = req.session.user._id
    
    const { name, phone } = req.body;

    const contact = new Contact({
        name: name,
        phone: phone,
        user: userId, 
    });

    await contact.register();

    if (contact.errors.lenght > 0 ){
        return res.status(400).json({ error: contact.errors})
    }

    return res.status(200).json({ contact: contact.contact}); 
}

exports.getContacts = async (req, res) => {
    const userId = req.session?.user?._id || '';
    
    try {
        
        const contacts = await Contact.getContactsFromUser(userId);
        return res.status(200).json({ contacts: contacts });
    } catch(err){
        return res.status(400).json({ message : 'Falha ao buscar contatos' })
    }

}

exports.getContact = async (req, res) => {
    const userId = req.session?.user?._id || '';
    try {
        const contact = await Contact.getContact(req.params.id);
        const contactUserId = contact.user._id.toString();

        return contactUserId === userId ? 
            res.status(200).json({ contact : contact }) :
            res.status(400).json( {message: 'Precisa estar logado com o usuário deste contato'} )
    } catch(err){
        return res.status(400).json({ message : 'Falha ao buscar contatos' })
    }

}