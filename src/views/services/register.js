import axios from 'axios';


export async function register(email, password, re_password, setError, setIsLoading, navigate){

    try {
        const response = await axios.post('/api/register', {
          email: email,
          password: password,
          re_password: re_password
        });
    
        setError(''); 
        
        navigate('/login', { state: response.data.message });
      } catch (error) {
        setError(error.response?.data?.error || 'Erro ao fazer a requisição');
      } finally {
        setIsLoading(false);
      }
}