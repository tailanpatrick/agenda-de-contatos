// contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../includes/components/Loading';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verifica a sessão do usuário na inicialização
        axios.get('/api/__sec/__session')
            .then(response => {
                setUser(response.data.user);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    setUser(null);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const logout = async () => {
        try {
            await axios.get('/api/logout');
            setUser(null);
            window.location.href = '/login'
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    if (loading) {

        return <Loading />;
    }

    return (
        <AuthContext.Provider value={{ user, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
