import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

import { z } from 'zod';

import { register } from './services/register';

import Navbar from './includes/components/Navbar';
import Input from './includes/components/Input';
import Button from './includes/components/Button';
import ErrorMessage from './includes/components/ErrorMessage';

const schema = z.object({
  email: z.string()
    .nonempty({ message: 'Digite um Email' })
    .email({ message: "Email inválido" }),

  password: z.string()
    .nonempty({ message: 'Digite uma Senha' })
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),

  re_password: z.string()
    .nonempty({ message: 'Repita sua Senha' })
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
}).refine(data => data.password === data.re_password, {
  message: "As senhas não coincidem",
  path: ["re_password"], 
});

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    re_password: ''
  });
  
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState('');

  const { user, loading } = useAuth();

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

    await register(
      formData.email,
      formData.password,
      formData.re_password, 
      setError,
      setIsLoading,
      navigate
    )
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="h-full bg-gray-100 flex justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <div className="w-full md:w-[450px] py-6 px-10 h-full mt-10 bg-white rounded shadow-xl">
          <h1 className="font-bold inline-block mb-4">Crie uma Conta:</h1>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              id="email"
              name="email"
              placeholder="email@provedor.com"
              label="Email:"
              autoComplete="true"
              onChange={handleChange}
              errors={fieldErrors}
            />
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Digite uma senha"
              label="Senha:"
              autoComplete="false"
              onChange={handleChange}
              errors={fieldErrors}
            />
            <Input
              type="password"
              id="re_password"
              name="re_password"
              placeholder="Repita a senha"
              label="Repita a Senha:"
              autoComplete="false"
              onChange={handleChange}
              errors={fieldErrors}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <Button type="submit" isLoading={isLoading}>
              Cadastrar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
