const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    }, 
    phone: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    }
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.contact = null;
    }

    async register() {
        await this.validate();

        if (this.errors.length > 0) return;

        this.contact = await ContactModel.create(this.body);
    }

    async edit(contactId){
        if(typeof contactId !== 'string') return;

        await this.validate();

        if(this.errors.length > 0 ) return;

        this.contact = await ContactModel.findByIdAndUpdate(contactId, this.body, {new : true});
    }

    async validate() {
        this.cleanUp();

        if (!this.body.name) this.errors.push('Nome é um campo obrigatório.');
        if (!this.body.phone) this.errors.push('Telefone é um campo obrigatório.');
        if (!this.body.user) this.errors.push('Usuário inválido.');
    }

    cleanUp() {
        
        this.body = {
            name: this.body.name.trim(),
            phone: this.body.phone.trim(),
            user: this.body.user 
        };
    }

    static async delete(contactId, userId){
        return await ContactModel.findByIdAndDelete(contactId);
    }

    static async getContactsFromUser(userId) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('ID de usuário inválido.');
        }

        return await ContactModel.find({ user: userId });
    }

    static async getContact(contactId) {

        if (!mongoose.Types.ObjectId.isValid(contactId)) {
            console.log(`ID inválido fornecido: ${contactId}`);
            throw new Error('ID do contato inválido.');
        }
    
        try {
            const contact = await ContactModel.findById(contactId);
    
            return contact || null;
        } catch (error) {
            console.error('Erro ao buscar o contato:', error.message);
            throw new Error('Erro ao buscar o contato no banco de dados.');
        }
    }

}

module.exports = Contact;
