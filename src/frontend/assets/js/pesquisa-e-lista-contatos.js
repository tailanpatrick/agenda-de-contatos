document.addEventListener("DOMContentLoaded", () => {
    const contacts = [
        { name: "Neil Sims", phone: "(31) 98807-6914" },
        { name: "Bob Smith", phone: "(31) 98807-6916" },
        { name: "Alice Johnson", phone: "(31) 98807-6915" },
        { name: "Alice Johnson", phone: "(31) 98807-6915" },
        { name: "Alice Johnson", phone: "(31) 98807-6915" },
        { name: "Alice Johnson", phone: "(31) 98807-6915" },
        { name: "Alice Johnson", phone: "(31) 98807-6915" },
        { name: "Alice Johnson", phone: "(31) 98807-6915" },
        { name: "Alice Johnson", phone: "(31) 98807-6915" },
        { name: "Alice Johnson", phone: "(31) 98807-6915" },
        { name: "Alice Johnson", phone: "(31) 98807-6915" },
        { name: "Alice Johnson", phone: "(31) 98807-6915" },
        // Adicione mais contatos conforme necessário
    ];

    const searchInput = document.getElementById("searchInput");
    const contactList = document.getElementById("contactList");
    const searchButton = document.getElementById("searchButton");

    function renderContacts(filteredContacts) {
        contactList.innerHTML = "";
        filteredContacts.forEach(contact => {
            const li = document.createElement("li");
            li.className = "py-3 sm:py-4 cursor-pointer";
            li.innerHTML = `
                <div class="flex items-center space-x-4">
                    <div class="flex items-center justify-center w-10 h-10 bg-[#0D7DC0] text-white rounded-full text-lg font-bold">
                        ${`${contact.name.charAt(0)}${!!contact.name.split(' ')[1] ? contact.name.split(' ')[1].charAt(0) : ''} `}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate">${contact.name}</p>
                        <p class="text-sm text-gray-500 truncate">${contact.phone}</p>
                    </div>
                </div>
            `;
            contactList.appendChild(li);
        });
    }

    function filterContacts() {
        const query = searchInput.value.toLowerCase();
        const filteredContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(query)||
            contact.phone.replace(/\D/g, '').replace(' ', '').includes(query)
        );
        renderContacts(filteredContacts);
    }

    searchInput.addEventListener("input", filterContacts);
    searchButton.addEventListener("click", filterContacts);
    

    renderContacts(contacts);
});