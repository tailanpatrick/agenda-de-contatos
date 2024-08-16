const Contact = require('../models/Contact');

exports.register = async (req, res) => {
    try {
        const userId = req.session.user._id

        const { name, phone } = req.body;

        const contact = new Contact({
            name: name,
            phone: phone,
            user: userId,
        });

        await contact.register();

        if (contact.errors.lenght > 0) {
            return res.status(400).json({ error: contact.errors })
        }

        return res.status(200).json({ contact: contact.contact });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar contato' })
    }
}

exports.getContacts = async (req, res) => {
    const userId = req.session?.user?._id || '';

    try {

        const contacts = await Contact.getContactsFromUser(userId);
        return res.status(200).json({ contacts: contacts });
    } catch (err) {
        return res.status(400).json({ message: 'Falha ao buscar contatos' })
    }

}

exports.getContact = async (req, res) => {
    const userId = req.session?.user?._id || '';
    const contactId = req.params.id;

    try {
        const contact = await Contact.getContact(contactId);

        if (!contact) {
            return res.status(404).json({ error: 'Contato não encontrado.' });
        }

        const contactUserId = contact.user._id.toString();

        if (contactUserId !== userId) {
            return res.status(403).json({ error: 'Você não tem permissão para acessar este contato.' });
        }

        return res.status(200).json({ contact });

    } catch (err) {
        console.error('Erro ao buscar o contato:', err.message);
        return res.status(400).json({ error: err.message });
    }
};



exports.deleteContact = async (req, res) => {
    const userId = req.session?.user?._id || '';
    const contactId = req.params.id;
    
    if(!contactId){
        return res.send(400).json({error: "Forneça o id do contato a ser editado"});
    }

    const contactExist = await Contact.getContact(contactId);
    const contactUserId = contactExist.user._id.toString();

    if(!contactUserId){
        return res.send(400).json({error: "Contato não existe"});
    }

    if (contactUserId !== userId) {
        return res.status(403).json({ error: 'Você não tem permissão para deletar este contato.' });
    }

    const contactDeleted = await Contact.delete(contactId);

    res.status(200).json({ contact: contactDeleted })
}


exports.editContact = async (req, res) => {
    const userId = req.session?.user?._id || '';
    const contactId = req.params.id;
    
    if(!contactId){
        return res.send(400).json({error: "Forneça o id do contato a ser editado"});
    }

    const contactExist = await Contact.getContact(contactId);
    const contactUserId = contactExist.user._id.toString();

    if (contactUserId !== userId) {
        return res.status(403).json({ error: 'Você não tem permissão para editar este contato.' });
    }

    const contact = new Contact({ ...req.body, user: userId });

    await contact.edit(contactId);

    if (contact.errors.lenght > 0) {
        return res.status(400).json({ error: contact.errors })
    }

    return res.status(200).json({contact: contact.contact});
}