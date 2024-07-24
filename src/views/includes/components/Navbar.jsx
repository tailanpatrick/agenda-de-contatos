import React, { useState } from 'react';
import Search from './Search'; 
import { Link } from 'react-router-dom';

function Navbar({ auth, contacts, setFilteredContacts }) {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setQuery(query);
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(query) ||
      contact.phone.replace(/\D/g, '').replace(' ', '').includes(query)
    );
    setFilteredContacts(filteredContacts);
  };

  return (
    <nav className="relative">
      <div>
        <div className="flex justify-between h-16 px-10 shadow items-center">
          <div className="flex items-center space-x-8">
            <Link to="/">
              <h1 className="flex items-center text-md cursor-pointer">
                <img
                  className="w-12 md:w-13 mr-4"
                  src="/assets/img/Contacts_30028.webp"
                  alt="CONTATOS"
                  title="Meus Contatos"
                />
              </h1>
            </Link>
          </div>
          <div className="flex space-x-4 items-center">
            {auth ? (
              <Link
                to="/login"
                className="bg-[#0D7DC0] px-4 py-2 rounded text-white hover:bg-[#0AABF4] text-sm"
              >
                SAIR
              </Link>
            ) : (
              <>
                <Link to="/register" className="text-gray-800 text-sm">CADASTRO</Link>
                <Link
                  to="/login"
                  className="bg-[#0D7DC0] px-4 py-2 rounded text-white hover:bg-[#0AABF4] text-sm"
                >
                  LOGIN
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {auth && (
        <div className="w-full">
          <Search query={query} onChange={handleSearchChange} />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
