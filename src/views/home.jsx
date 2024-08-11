import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import axios from 'axios';

import Navbar from './includes/components/Navbar'; // Verifique o caminho correto
import ContactListPage from './includes/components/ContactListPage'; // Verifique o caminho correto
import Loading from './includes/components/Loading';

function Home({ contacts, setContacts }) {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const auth = user && !loading;
  const [isLoading, setIsLoading] = useState(true);
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/api/contacts');
  
        if (Array.isArray(response.data.contacts)) {
          const validContacts = response.data.contacts.filter(contact => contact && contact.name !== undefined);
      
          const sortedContacts = [...validContacts].sort((a, b) => {
            const nameA = a.name || '';
            const nameB = b.name || '';
            return nameA.localeCompare(nameB);
          });
          setContacts(sortedContacts);
          setFilteredContacts(sortedContacts);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, [setContacts]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar auth={auth} contacts={contacts} setFilteredContacts={setFilteredContacts} searchInput={true} />
      <ContactListPage contacts={filteredContacts} />
    </>
  );
}

export default Home;
