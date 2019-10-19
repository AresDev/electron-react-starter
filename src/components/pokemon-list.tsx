import * as React from 'react';

interface IAppProps {
}

interface IPokemon {
    name: string;
}

interface IPokemonListState {
    error: boolean,
    isLoading: boolean,
    pokemons: Array<IPokemon>
}

export default class PokemonList extends React.Component<IAppProps, IPokemonListState> {
    constructor(props: IAppProps) {
        super(props);

        this.state = {
            error: false,
            isLoading: false,
            pokemons: null
        }
    }

    componentDidMount() {
        this.loadPokemons();
    }

    async loadPokemons() {
        this.setState({ isLoading: true });
        try {
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=20`);
            let data = await response.json();
            if (data) {
                console.log(data);
                this.setState({
                    error: false,
                    pokemons: [...data.results]
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
        const { pokemons } = this.state;
        if (!pokemons) {
            return null;
        }
        return (
            pokemons.map((pokemon) => <div key={pokemon.name}>{pokemon.name}</div>)

        );
    }
}
