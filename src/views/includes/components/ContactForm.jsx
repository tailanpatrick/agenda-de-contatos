import React, { useState, useEffect } from 'react';
import Input from './Input';
import InputPhone from './InputPhone';
import Button from './Button';

const ContactForm = ({ contact, onSave }) => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        phone: ''
    });

    useEffect(() => {
        if (contact) {
            setFormData({
                id: contact.id || '',
                name: contact.name || '',
                phone: contact.phone || ''
            });
        }
    }, [contact]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            return await onSave(formData);
        } catch (error) {
            console.error('Erro ao salvar o contato:', error);
        }
    };

    return (
        <>
        <h2 className="text-2xl py-4">{contact?.id ? 'Editar Contato' : 'Criar novo Contato'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nome do Contato"
                label="Nome do Contato"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
            />
            <InputPhone
                id="phone"
                name="phone"
                value={formData.phone}
                
                placeholder="Telefone"
                label="Telefone"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
            />
            <div>
                <Button type="submit">Salvar</Button>
            </div>
        </form>
        </>
        
    );
};

export default ContactForm;
