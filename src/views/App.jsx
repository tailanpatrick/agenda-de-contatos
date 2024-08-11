import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import axios from 'axios';

import Home from './home';
import Login from './login';
import Register from './register';
import ContactDetailPage from './includes/components/ContactDetailPage';
import AddEditContactPage from './includes/components/AddEditContactPage';

function App() {
  const [contacts, setContacts] = useState([]);

  const handleSaveContact = async (contact) => {
    const isNewContact = !contact._id;
    const savedContact = { ...contact };

    try {
      if (isNewContact) {
        const response = await axios.post('/api/contact', {
          name: savedContact.name,
          phone: savedContact.phone
        });
        setContacts((prevContacts) => [...prevContacts, response.data]);
        return response.data.contact;
      } else {
        const response = await axios.put(`/api/contact/${contact._id}`, contact);
        setContacts((prevContacts) =>
          prevContacts.map((c) => (c._id === contact._id ? response.data : c))
        );

        return response.data.contact;
      }
    } catch (error) {
      console.error('Error saving contact:', error);
    }
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
