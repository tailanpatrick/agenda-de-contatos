import React from 'react';

const SuccessMessage = ({children}) => {
    return ( 
        <div className="text-white bg-[#0D7DC0] border border-blue-950 my-2 rounded-md p-1">{children}</div>
     );
}
 
export default SuccessMessage;