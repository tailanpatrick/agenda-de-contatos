import React, { useState } from 'react';
import Navbar from './includes/components/Navbar';
import Input from './includes/components/Input';
import Button from './includes/components/Button';

function Login() {
	const [ isLoading, setIsLoading ] = useState(false);

	function handleSubmit(e)  {
		e.preventDefault();
		setIsLoading(true);

		setTimeout(()=> {
			setIsLoading(false);
		}, 3000)
	}

	return (
		<>
			<Navbar />

			<div className="h-full md:min-h-[450px] md:max-h-[450px] bg-gray-100 flex justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
				<div className="w-full md:w-[450px] py-6 px-10 h-80 mt-20 bg-white rounded shadow-xl">
					<h1 className="font-bold inline-block mb-4">Faça Login em sua conta: </h1>
					<form onSubmit={handleSubmit} action="/login" method="POST">

						<Input type="email" id="email" placeholder="email@provedor.com" label="Email:" />

						<Input type="password" id="password" placeholder="Digite sua senha" label="Senha:" />

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