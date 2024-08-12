import axios from 'axios';

export async function deleteContact(contactId) {
    await axios.delete(`/api/contact/${contactId}`);
}