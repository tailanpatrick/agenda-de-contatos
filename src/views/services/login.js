import axios from 'axios'

export async function login(email, password, setError, setIsLoading) {
    try {
        const response = await axios.post('/api/login', {
          email: email,
          password: password
        });
  
        setError(''); // Limpar qualquer erro anterior após o sucesso
        
        window.location.href = '/';
        console.log(response.data.message)
      } catch (error) {
        
        if (error.response && error.response.status === 400) {
          setError(error.response.data.error || 'Erro ao fazer a requisição');
        } else {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
}