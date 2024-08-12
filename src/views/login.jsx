import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { z } from 'zod';

import { login } from './services/login';

import Navbar from './includes/components/Navbar';
import Input from './includes/components/Input';
import Button from './includes/components/Button';
import ErrorMessage from './includes/components/ErrorMessage';
import SuccessMessage from './includes/components/SuccessMessage';
import { useAuth } from './contexts/AuthContext';

const schema = z.object({
  email: z.string()
    .nonempty({ message: 'Digite seu Email' })
    .email({ message: 'Email inválido' }),
  password: z.string()
    .nonempty({ message: 'Digite sua Senha' })
    .min(6, { message: 'Sua Senha é mínimo 6 caracteres' })
});

function Login() {
  const location = useLocation();
  const message = location.state;
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState('');

  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const result = schema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.format();
      setFieldErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    setFieldErrors({});

    await login(formData.email, formData.password, setError, setIsLoading);
  }

  return (
    <>
      <Navbar />

      <div className="h-full md:min-h-[450px] md:max-h-[450px] bg-gray-100 flex justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <div className="w-full md:w-[450px] py-6 px-10 h-full mt-20 bg-white rounded shadow-xl">
          {message && (<SuccessMessage>{message}</SuccessMessage>)}

          <h1 className="font-bold inline-block mb-4">Faça Login em sua conta:</h1>
          <form onSubmit={handleSubmit}>


            <Input type="text"
              id="email"
              name="email"
              placeholder="email@provedor.com"
              label="Email:"
              autoComplete="true"
              onChange={handleChange}
              errors={fieldErrors}
            />

            <Input type="password"
              id="password"
              name="password"
              placeholder="Digite uma senha"
              label="Senha:"
              autoComplete="true"
              onChange={handleChange}
              errors={fieldErrors}
            />
			
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Button type="submit" isLoading={isLoading}>
              Login
            </Button>

          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
