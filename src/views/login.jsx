import React from 'react';
import Navbar from './includes/components/Navbar';

function Login() {

	return (
		<>
			<Navbar />

			<div className="h-full md:min-h-[450px] md:max-h-[450px] bg-gray-100 flex justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
				<div className="w-full md:w-[450px] py-6 px-10 h-80 mt-20 bg-white rounded shadow-xl">
					<h1 className="font-bold inline-block mb-4">Faça Login em sua conta: </h1>
					<form action="">
						<div className="mb-6">
							<label for="name" className="block text-gray-800 font-bold"
							>E-Mail:</label
							>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="email@provedor.com"
								className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
								autocomplete="email"
								required
							/>
						</div>

						<div>
							<label for="password" className="block text-gray-800 font-bold"
							>Senha:</label
							>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="Digite sua senha"
								className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
								autocomplete="current-password"
								required
							/>

						</div>
						<button
							className="cursor-pointer py-2 px-4 block mt-6 bg-[#0D7DC0] text-white font-bold w-full text-center rounded"
						>Login</button>
					</form>
				</div>
			</div>
		</>

	);
}

export default Login;