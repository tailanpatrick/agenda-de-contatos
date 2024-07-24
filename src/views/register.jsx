import React, { useState } from 'react';
import Navbar from './includes/components/Navbar';
import Input from './includes/components/Input';
import Button from './includes/components/Button';
import { z } from 'zod';

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
  path: ["re_password"], // path of error
});

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    re_password: ''
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const result = schema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.format();
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    setErrors({});
    // Simular uma requisição assíncrona
    setTimeout(() => {
      setIsLoading(false);
      // Resetar o formulário e os erros
      setFormData({
        email: '',
        password: '',
        re_password: ''
      });
      setErrors({});
    }, 3000);
  }

  return (
    <>
      <Navbar />

      <div className="h-full bg-gray-100 flex justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <div className="w-full md:w-[450px] py-6 px-10 h-full mt-10 bg-white rounded shadow-xl">
          <h1 className="font-bold inline-block mb-4">Crie uma Conta:</h1>
          <form onSubmit={handleSubmit}>
            <Input
              type="text'"
              id="email"
              placeholder="email@provedor.com"
              label="Email:"
              autocomplete={true}
              onChange={handleChange}
              errors={errors}
            />
            <Input
              type="password"
              id="password"
              placeholder="Digite uma senha"
              label="Senha:"
              autocomplete={false}
              onChange={handleChange}
              errors={errors}
            />
            <Input
              type="password"
              id="re_password"
              placeholder="Repita a senha"
              label="Repita a Senha:"
              autocomplete={false}
              onChange={handleChange}
              errors={errors}
            />
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
