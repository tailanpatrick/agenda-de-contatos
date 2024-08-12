import axios from 'axios';

export async function createEditContact(contact, setContacts){
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
}