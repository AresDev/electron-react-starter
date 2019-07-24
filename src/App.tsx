import React from 'react';
import './App.css';
import PokemonSearch from './components/pokemon-search';

const App: React.FC = () => {
  return (
    <div className="App">
      <PokemonSearch name="Ash ketchup!" numberOfPokemons={2} />
    </div>
  );
}

export default App;