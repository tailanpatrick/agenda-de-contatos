import React from 'react';

const Input = ({ id, type, placeholder, autocomplete = true, required, label } ) => {

    return (
        <div className="mb-6">
            <label for={id} className="block text-gray-800 font-bold"
            > {label} </label
            >
            <input
                type={type}
                name={id}
                id={id}
                placeholder={placeholder}
                className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
                autoComplete={autocomplete}
                required={required}
                
            />
        </div>
    );
}

export default Input;