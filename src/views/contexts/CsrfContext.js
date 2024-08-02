import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Criar o contexto para CSRF
const CsrfContext = createContext();

// Hook para usar o contexto CSRF
export const useCsrf = () => {
    return useContext(CsrfContext);
};

// Provedor do contexto CSRF
export const CsrfProvider = ({ children }) => {
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        axios.get('api/__sec/__csrf-token')
            .then(response => setCsrfToken(response.data.csrfToken))

        
    }, []);

    return (
        <CsrfContext.Provider value={csrfToken}>
            {children}
        </CsrfContext.Provider>
    );
};
