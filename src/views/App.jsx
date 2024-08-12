import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import axios from 'axios';

import Home from './home';
import Login from './login';
import Register from './register';
import ContactDetailPage from './includes/components/ContactDetailPage';
import AddEditContactPage from './includes/components/AddEditContactPage';
import { createEditContact } from './services/create-edit-contact';

function App() {
  const [contacts, setContacts] = useState([]);

  const handleSaveContact = async (contact) => {
    return await createEditContact(contact, setContacts);
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home contacts={contacts} setContacts={setContacts} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact/:id" element={<ContactDetailPage contacts={contacts} setContacts={setContacts} />} />
          <Route path="/add-contact" element={<AddEditContactPage onSave={handleSaveContact} />} />
          <Route path="/edit-contact/:id" element={<AddEditContactPage onSave={handleSaveContact} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
