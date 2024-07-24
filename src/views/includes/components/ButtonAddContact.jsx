const React = require('react');

function ButtonAddContact() {
    return (

        <div className="absolute bottom-10 right-5 md:right-28 bg-[#0D7DC0] text-center px-2 py-2 rounded-full text-white hover:bg-[#0AABF4] text-lg cursor-pointer">
            <img className="w-10" src="/assets/img/mais.png"/>
        </div>

    );
}

module.exports = ButtonAddContact;