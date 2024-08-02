const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

UserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const UserModel = mongoose.model('User', UserSchema)

class User {
    constructor(body) {
        this.body = body
        this.errors = []
        this.user = null
    }

    async register() {
        await this.validate();

        await this.userExists();

        if (this.errors.length > 0) return;


        this.user = await UserModel.create(this.body)

    }

    async login(){
        this.validate();
        
        if (this.errors.length > 0) return;

        this.user = await UserModel.findOne({ email: this.body.email }).select('+password');;

        if (!this.user) {
            this.errors.push('Usuário ou senha inválidos');
            return;
        }

        if (!bcrypt.compareSync(this.body.password, this.user.password)){
            this.errors.push('Usuário ou senha inválidos');
            this.user = null;
            return;
        }

    }

    async validate() {
        this.cleanUp();

        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');

        if (this.body.password.length < 6 || this.body.password.length > 50) {
            this.errors.push('A senha precisa ter entre 6 e 50 caracteres.')
        }
    }

    async userExists() {
        this.user = await UserModel.findOne({ email: this.body.email });
        if (this.user) this.errors.push('Email já cadastrado. Faça login, ou tente com outro email.');
    }
    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = User;