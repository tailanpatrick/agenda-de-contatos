import React, { useState } from 'react';
import Navbar from './includes/components/Navbar'; // Verifique o caminho correto
import ContactListPage from './includes/components/ContactListPage'; // Verifique o caminho correto

const initialContacts = [
  { name: "Neil Sims", phone: "(31) 98807-6914" },
  { name: "Bob Smith", phone: "(31) 98807-6916" },
  { name: "Alice Johnson", phone: "(31) 98807-6915" },
  { name: "Alice Johnson", phone: "(31) 98807-6915" },
 
  // Adicione mais contatos conforme necessário
];

function Home() {
  const [contacts, setContacts] = useState(initialContacts);
  const [filteredContacts, setFilteredContacts] = useState(initialContacts);

  return (
    <>
      <Navbar auth={true} contacts={contacts} setFilteredContacts={setFilteredContacts} /> {/* Passe o valor correto para auth se necessário */}
      <ContactListPage contacts={filteredContacts} />
    </>
  );
}

export default Home;
