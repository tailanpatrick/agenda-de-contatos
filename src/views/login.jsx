import React, { useState } from 'react';
import { z } from 'zod';
import Navbar from './includes/components/Navbar';
import Input from './includes/components/Input';
import Button from './includes/components/Button';

const schema = z.object({
	email: z.string()
	.nonempty({ message: 'Digite seu Email' })
	.email({ message: 'Email inválido' }),
	password: z.string()
	.nonempty({ message: 'Digite sua Senha' })
	.min(6, { message: 'Sua Senha é mínimo 6 caracteres' })
})

function Login() {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ formData, setFormData ] = useState({
		email:'',
		password: ''
	})

	const [ errors, setErrors ] = useState({});

	function handleChange(e){
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);

		const result = schema.safeParse(formData);

		if (!result.success){
			const fieldErrors = result.error.format();
			setErrors(fieldErrors);
			setIsLoading(false);
			return;
		}

		setTimeout(() => {
			setIsLoading(false);
		}, 3000)
	}

	return (
		<>
			<Navbar />

			<div className="h-full md:min-h-[450px] md:max-h-[450px] bg-gray-100 flex justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
				<div className="w-full md:w-[450px] py-6 px-10 h-full mt-20 bg-white rounded shadow-xl">
					<h1 className="font-bold inline-block mb-4">Faça Login em sua conta: </h1>
					<form onSubmit={handleSubmit} action="/login" method="POST">

						<Input type="text"
							id="email"
							placeholder="email@provedor.com"
							label="Email:"
							autocomplete={true}
							onChange={handleChange}
							errors={errors}
						/>

						<Input type="password"
							id="password"
							placeholder="Digite uma senha"
							label="Senha:"
							autocomplete={true}
							onChange={handleChange}
							errors={errors} />

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