const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const CONNECTION_STRING = process.env.MONGO_DB_CONECTION_STRING

mongoose.connect(CONNECTION_STRING)
    .then(() => {
        app.emit('pronto')

    })
    .catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkError, csrfMidddleware, check404 } = require('./src/middlewares/middleware')

const React = require('react');

// precisa usar o use express.urlencoded como true para receber o corpo da requisção POST
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));


const sessionOptions = session({
    secret: 'asdfgasdfg',
    store: MongoStore.create({
        mongoUrl: CONNECTION_STRING,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }

})

// usa o helmet
app.use(helmet());


// Configurando a CSP com Helmet
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://unpkg.com"],
        },
    })
)

// usa a sessao
app.use(sessionOptions);

app.use(flash());

// usa crsf
app.use(csrf());


//usa os middlewares global
app.use(middlewareGlobal);


// usa o middleware de injeção de token csrf
app.use(csrfMidddleware);

//usa o middleware da verificação de erro csrf
app.use(checkError);

// Configuração do diretório de views
app.set('views', path.join(__dirname, 'views'));

// Configuração do view engine
app.use(express.static(path.join(__dirname, 'public')));



// usando as rotas do arquivo routes
app.use(routes);


app.get('/raw-html', (req, res) => {
    res.render('index', {}, (err, html) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.send(`<pre>${html.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`);
      }
    });
  });

// !! IMPORTANTE !! - usar o middleware de 404 depois de usar as rotas
app.use(check404);

// verificando se conectado a base a partir de um emit chamado pronto
app.on('pronto', () => {
    // subindo o server
    app.listen(3000, () => {
        console.log('Servidor subiu na porta 3000')
    });
})


