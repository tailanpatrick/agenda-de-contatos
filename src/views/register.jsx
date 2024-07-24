import React, { useState } from 'react';
import Navbar from './includes/components/Navbar';
import Input from './includes/components/Input';
import Button from './includes/components/Button';

function Register() {
	const [ isLoading, setIsLoading ] = useState(false);

	function handleSubmit(e){
		e.preventDefault();
		setIsLoading(true);

		setTimeout(()=> {
			setIsLoading(false)
		}, 3000)
	}

	return (
		<>
			<Navbar />

			<div className="h-full bg-gray-100 flex justify-center" style={{minHeight: 'calc(100vh - 64px)'}}>
				<div className="w-full md:w-[450px] py-6 px-10 h-[420px] mt-20 bg-white rounded shadow-xl">
					<h1 className="font-bold inline-block mb-4">Crie uma Conta:</h1>
					<form onSubmit={handleSubmit} action="/register" method="POST">
						
						<Input type="email" id="email" placeholder="email@provedor.com" label="Email:"
						autocomplete={true}/>
 
						<Input type="password" id="password" placeholder="Digite uma senha" label="Senha:"
						autocomplete={false}/>

						<Input type="password" id="retype_password" placeholder="Repita a senha" label="Repita a Senha:"
						autocomplete={false}/>
						
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














