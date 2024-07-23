const React = require('react');

function Index({ element }) {
  return (
    <div class="container max-w-[880px] overflow-hidden mx-auto h-full">

        <div class="container mx-auto my-5">
              <h1 class="text-4xl text-center">Erro {errorCode}</h1>
              <p class="text-center text-lg">{errorMessage}</p>
          </div>
        
    </div>
  );
}

module.exports = Index;


