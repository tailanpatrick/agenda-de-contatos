import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Input = ({ id, type, placeholder, autocomplete = true, required, label, onChange, errors, onBlur, value, maxLength }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-6 relative">
            <label htmlFor={id} className="block text-gray-800 font-bold">
                {label}
            </label>
            <input
                type={showPassword && type === 'password' ? 'text' : type}
                name={id}
                id={id}
                placeholder={placeholder}
                className={`w-full border ${errors && errors[id] ? 'border-red-500 border-2' : 'border-gray-300'} py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600`}
                autoComplete={autocomplete ? 'on' : 'off'}
                required={required}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                maxLength={maxLength}
            />
            {type === 'password' && (
                <div className="absolute top-10 right-3 pr-3 flex items-center text-2xl leading-5">
                    <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="text-gray-500 focus:outline-none"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            )}
            {errors && errors[id] && <p className='text-red-500'>{errors[id]._errors[0]}</p>}
        </div>
    );
}

export default Input;
