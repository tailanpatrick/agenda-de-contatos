import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";


const Button = ({ type, children, isLoading }) => {

    return (
        <button
            className={`inline-flex items-center justify-center gap-2 cursor-pointer py-2 px-4 mt-2 bg-[#0D7DC0]
            text-white font-bold w-full text-center rounded
              ${isLoading ? "opacity-45 cursor-not-allowed " :  "hover:bg-[#0a8bf4]"}`}
            type={type}
            disabled={isLoading}
    
        >
            {isLoading && (<FaSpinner className="animate-spin mr-2 text-white"/>)} {children}
        </button>
    );
}

export default Button;