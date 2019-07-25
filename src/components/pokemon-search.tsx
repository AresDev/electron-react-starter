import React, { Component } from 'react';

export interface IAppProps {
  name: string;
  numberOfPokemons?: number;
}

export interface ISearchState {
  error: boolean;
  isLoading: boolean;
  pokemon: IPokemon;
}

export interface IPokemon {
  name: string;
  numberOfAbilities: number;
  baseExperience: number;
  imageUrl: string;
}

export default class PokemonSearch extends Component<IAppProps, ISearchState> {
  pokemonRef: React.RefObject<HTMLInputElement>;
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      error: null,
      isLoading: false,
      pokemon: null
    };

    this.pokemonRef = React.createRef();
  }
  private onSearchClicked = () => {
    const inputValue = this.pokemonRef.current.value;
    this.searchPokemon(inputValue);
  };

  async searchPokemon(searchKey: string) {
    this.setState({ isLoading: true });
    try {
      let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchKey}`
      );
      let data = await response.json();
      if (data) {
        this.setState({
          error: false,
          pokemon: {
            name: data.name,
            numberOfAbilities: data.abilities.length,
            baseExperience: data.base_experience,
            imageUrl: data.sprites.front_default
          }
        });
      }
    } catch (error) {
      this.setState({ error: true });
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  public render() {
    const { name: trainerName, numberOfPokemons } = this.props;
    const { error, isLoading, pokemon } = this.state;

    let resultMarkup;
    if (error) {
      resultMarkup = <p>Pokemon not found, please try again</p>;
    } else if (pokemon) {
      resultMarkup = (
        <div>
          <img src={pokemon.imageUrl} alt="pokemon" className="pokemon-image" />
          <p>
            {pokemon.name} has {pokemon.numberOfAbilities} abilities and{' '}
            {pokemon.baseExperience} base experience points
          </p>
        </div>
      );
    }

    return (
      <div>
        <p>
          {trainerName}
          {numberOfPokemons && <span> Has {numberOfPokemons} pokemons!</span>}
        </p>
        <input type="text" ref={this.pokemonRef} />
        <button className="my-button" onClick={this.onSearchClicked}>
          Search
        </button>
        {resultMarkup}
      </div>
    );
  }
}
