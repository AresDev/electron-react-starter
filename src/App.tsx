import React from 'react';
import './App.css';
import PokemonSearch from './components/pokemon-search';
import PokemonList from './components/pokemon-list';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="list-container">
        <PokemonSearch name="Ash ketchup!" numberOfPokemons={2} />
      </div>
      <div className="detail-container">
        <PokemonSearch name="Ash ketchup!" numberOfPokemons={2} />
      </div>
      <PokemonList></PokemonList>
      <div className="detail-container">
        <PokemonSearch name="Misty!" numberOfPokemons={5} />
      </div>
    </div>
  );
};

export default App;
