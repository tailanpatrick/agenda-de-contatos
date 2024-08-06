import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonAddContact from './ButtonAddContact';

function ContactListPage({ contacts }) {
  const navigate = useNavigate();

  const handleContactClick = (contact) => {
    navigate(`/contact/${contact.id}`, { state: { contact } });
  };

  return (
    <div className="relative md:px-20 shadow md:bg-gray-100 h-auto" style={{ maxHeight: 'calc(100vh - 22vh)', minHeight: 'calc(100vh - 22vh)' }}>
      <div className="px-4 md:px-20 md:h-full overflow-y-scroll bg-white" style={{ maxHeight: 'calc(100vh - 22vh)' , minHeight: 'calc(100vh - 22vh)' }}>
        <ul id="contactList" role="list" className="divide-y divide-gray-200 border-b border-gray-200">
          {contacts.map((contact, index) => (
            <li key={index} className="py-3 sm:py-4 cursor-pointer" onClick={() => handleContactClick(contact)}>
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-[#0D7DC0] text-white rounded-full text-lg font-bold">
                  {`${contact.name.charAt(0)}${!!contact.name.split(' ')[1] ? contact.name.split(' ')[1].charAt(0) : ''} `}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{contact.name}</p>
                  <p className="text-sm text-gray-500 truncate">{contact.phone}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ButtonAddContact onClick={() => navigate('/add-contact')}/>
    </div>
  );
}

export default ContactListPage;
