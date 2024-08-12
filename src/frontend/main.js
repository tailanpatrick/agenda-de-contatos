import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react';
import ReactDOM from 'react-dom';


import './assets/css/style.css';

//import './assets/js/pesquisa-e-lista-contatos';

import App from '../views/App.jsx';

ReactDOM.hydrate(<App />, document.getElementById('root'));

console.clear();
