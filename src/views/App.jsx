import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {  CsrfProvider } from './contexts/CsrfContext';
import {  AuthProvider } from './contexts/AuthContext';
import Home from './home';
import Login from './login';
import Register from './register';
import ContactDetailPage from './includes/components/ContactDetailPage';
import AddEditContactPage from './includes/components/AddEditContactPage';


function App() {
  const initialContacts = [
    { id: '1', name: "Neil Sims", phone: "(31) 98807-6914" },
    { id: '2', name: "Bob Smith", phone: "(31) 98807-6916" },
    { id: '3', name: "Alice Johnson", phone: "(31) 98807-6915" },
    { id: '4', name: "Alice Johnson", phone: "(31) 98807-6915" },
    { id: '5', name: "Alice Johnson", phone: "(31) 98807-6915" },
    { id: '6', name: "Alice Johnson", phone: "(31) 98807-6915" },
    { id: '7', name: "Alice Johnson", phone: "(31) 98807-6915" },
    { id: '8', name: "Alice Johnson", phone: "(31) 98807-6915" },
    { id: '9', name: "Alice Johnson", phone: "(31) 98807-6915" },
    { id: '10', name: "Alice Johnson", phone: "(31) 98807-6915" },
    { id: '11', name: "Alice Johnson", phone: "(31) 98807-6915" },
    { id: '12', name: "Alice Johnson", phone: "(31) 98807-6915" },
    { id: '13', name: "Alice Johnson", phone: "(31) 98807-6915" },
  
    // Adicione mais contatos conforme necessário
  ];

  const [contacts, setContacts] = useState(initialContacts);


  const handleSaveContact = async (contact) => {
    const isNewContact = !contact.id;
    const savedContact = {
      ...contact,
      id: contact.id || new Date().getTime().toString(), // Gerar um ID se não existir
    };

    setContacts((prevContacts) => {
      if (isNewContact) {
        return [...prevContacts, savedContact];
      } else {
        return prevContacts.map((c) => (c.id === savedContact.id ? savedContact : c));
      }
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(savedContact);
      }, 1000);
    });
  };

  return (
    <CsrfProvider>
      <AuthProvider>

        <Router>
          <Routes>
            <Route path="/" element={<Home contacts={contacts}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact/:id" element={<ContactDetailPage />} />
            <Route path="/add-contact" element={<AddEditContactPage onSave={handleSaveContact} />} />
            <Route path="/edit-contact/:id" element={<AddEditContactPage onSave={handleSaveContact} />} />
          </Routes>
        </Router>
      </AuthProvider>

    </CsrfProvider>
  );
}

export default App;
