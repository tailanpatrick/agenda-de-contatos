import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { FaRegEdit } from "react-icons/fa";

const ContactDetailPage = ({ contacts, setContacts }) => {
    const location = useLocation();
    const { contact } = location.state;
    const navigate = useNavigate();

    const handleEditClick = (contact) => {
        navigate(`/edit-contact/${contact.id}`, { state: { contact } });
    };

    const handleDeleteContact = async (contactToDelete) => {
        setContacts(
            contacts.filter(contact => contact.id !== contactToDelete.id)
        )
        navigate('/')
    }

    return (
        <>
            <Navbar auth={true} />
            <div className="relative md:px-20 shadow md:bg-gray-100 h-screen" style={{ maxHeight: 'calc(100vh - 13vh)', minHeight: 'calc(100vh - 13vh)' }}>
                <div className="flex flex-col h-screen items-center justify-center px-4 md:px-20 md:h-full overflow-y-scroll bg-gray-100" style={{ maxHeight: 'calc(100vh - 13vh)', minHeight: 'calc(100vh - 13vh)' }}>
                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                        <div className="w-full flex flex-col p-6 md:w-96 items-center justify-center">
                            <div className="flex justify-end w-full h-8 text-2xl">
                                <FaRegEdit className="cursor-pointer"
                                    onClick={() => handleEditClick(contact)} />
                            </div>
                            <div className="flex items-center justify-center w-20 h-20 bg-[#0D7DC0] text-white rounded-full text-2xl font-bold">
                                {`${contact.name.charAt(0)}${!!contact.name.split(' ')[1] ? contact.name.split(' ')[1].charAt(0) : ''} `}
                            </div>
                            <div className="px-10 py-4">
                                <div className="text-center mt-2">
                                    <h2 className="text-2xl font-semibold">{contact.name}</h2>
                                    <p className="text-xl text-gray-600">{contact.phone}</p>
                                </div>
                                <div className="flex justify-center mt-6">
                                    <button className="text-white px-4 py-2 rounded-full bg-red-500 hover:bg-red-400 focus:outline-none"
                                        onClick={() => handleDeleteContact(contact)}>
                                        Excluir Contato
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactDetailPage;
