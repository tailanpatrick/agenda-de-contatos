import React from 'react';

const ErrorMessage = ({children}) => {
    return ( 
        <p className="text-red-500 py-2">{children}</p>
     );
}
 
export default ErrorMessage;