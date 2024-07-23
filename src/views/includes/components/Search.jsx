import React from 'react';

function Search({ query, onChange }) {
  return (
    <div className="w-full md:w-[400px] md:absolute md:top-1 md:left-44">
      <label htmlFor="searchInput" className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Search
      </label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          id="searchInput"
          type="search"
          className="block p-4 pl-10 w-full text-sm text-gray-900 md:rounded-lg bg-gray-50 border border-gray-300 outline-none"
          placeholder="Pesquise nos Contatos..."
          value={query}
          onChange={onChange}
          required
        />
        <button
          id="searchButton"
          className="text-white absolute right-2.5 bottom-2.5 bg-[#0D7DC0] hover:bg-[#0AABF4] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          <img className="w-5" src="/assets/img/procurar.png" alt="Pesquisar" />
        </button>
      </div>
    </div>
  );
}

export default Search;
