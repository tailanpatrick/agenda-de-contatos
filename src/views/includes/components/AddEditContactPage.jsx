import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import ContactForm from '../components/ContactForm';
import Navbar from './Navbar';

const AddEditContactPage = ({ onSave }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const contact = location.state ? location.state.contact : null;
    
    useEffect(() => {
        if(!loading && !user){
            navigate('/login')
        }
    },[user, loading, navigate] )
    

    const handleSave = async (contact) => {
        try {
            const savedContact = await onSave(contact);
            
            navigate(`/contact/${savedContact._id}`, { state: { contact: savedContact } });
        } catch (error) {
            console.error('Erro ao salvar o contato:', error);
        }
    };

    return (
        <>
            <Navbar auth={true} />
            <div className="h-full md:min-h-[450px] md:max-h-[450px] bg-gray-100 flex justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
                <div className="w-full md:w-[450px] py-6 px-10 h-full mt-20 bg-white rounded shadow-xl">
                    <ContactForm contact={contact} onSave={handleSave} />
                </div>
            </div>
        </>
    );
};

export default AddEditContactPage;
