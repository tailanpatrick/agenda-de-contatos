import React from 'react';
import Input from './Input';

const PhoneInput = ({ className, onChange, name, id, ...props }) => {

  const handleChange = (e) => {
    
      let value = e.target.value;

      value = value.replace(/\D/g, '') // Remove tudo o que não é dígito
        .replace(/^(\d{2})(\d)/g, '($1) $2') // Coloca parênteses em torno dos dois primeiros dígitos
        .replace(/(\d{4,5})(\d{4})$/, '$1-$2'); // Insere um hífen após o quarto ou quinto dígito


        onChange({
          target: {
            name: name, // Passa o nome do campo
            value: value
          }
        });
  }

  return (
    <Input
      {...props}
      onChange={handleChange}
      className={className}
      id={id}
      name={name}
      maxLength={15}
    />
  );
};

export default PhoneInput;
