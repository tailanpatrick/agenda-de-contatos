import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

import Navbar from './includes/components/Navbar'; // Verifique o caminho correto
import ContactListPage from './includes/components/ContactListPage'; // Verifique o caminho correto
import Loading from './includes/components/Loading';

function Home({ contacts }) {

  contacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  const navigate = useNavigate()
  const { user, loading } = useAuth();
  const auth = user && !loading;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Atualiza o estado local de carregamento com base no estado de autenticação
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar auth={auth} contacts={contacts} setFilteredContacts={setFilteredContacts} searchInput={true} /> {/* Passe o valor correto para auth se necessário */}
      <ContactListPage contacts={filteredContacts} />
    </>
  );
}

export default Home;
