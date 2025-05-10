import { useEffect, useState, useContext } from 'react';
import { MenuPokedexContext, EPokedexScreen } from '../contexts/MenuPokedexContext';
import axios from 'axios';
import './PokedexScreen.css';

interface Pokemon {
  id: number;
  name: string;
  sprites: { front_default: string };
  flavor_text: string;
}

interface Evolution {
  id: number;
  name: string;
  sprite: string;
}

export const PokedexScreen = () => {
  const { setScreen, selectedPokemonIndex, setSelectedPokemonIndex, selectedEvolutionIndex, setSelectedEvolutionIndex } = useContext(MenuPokedexContext);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [evolutions, setEvolutions] = useState<Evolution[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Pokémon list
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemonData = await Promise.all(
          response.data.results.map(async (poke: { name: string; url: string }, index: number) => {
            const pokeDetails = await axios.get(poke.url);
            const species = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${index + 1}`);
            let flavorText = species.data.flavor_text_entries.find(
              (entry: { language: { name: string } }) => entry.language.name === 'en'
            )?.flavor_text || 'No description available';
            // Truncate flavor text to ~100 characters to fit screen
            flavorText = flavorText.length > 100 ? flavorText.slice(0, 97) + '...' : flavorText;
            return {
              id: index + 1,
              name: poke.name,
              sprites: pokeDetails.data.sprites,
              flavor_text: flavorText,
            };
          })
        );
        setPokemonList(pokemonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  // Fetch evolutions for the selected Pokémon
  useEffect(() => {
    const fetchEvolutions = async () => {
      if (pokemonList.length === 0) return;
      try {
        const species = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonList[selectedPokemonIndex].id}`);
        const evolutionChain = await axios.get(species.data.evolution_chain.url);
        const chain = evolutionChain.data.chain;
        const evolutions: Evolution[] = [];

        const processChain = async (chain: any) => {
          const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${chain.species.name}`);
          evolutions.push({
            id: pokemon.data.id,
            name: chain.species.name,
            sprite: pokemon.data.sprites.front_default,
          });
          if (chain.evolves_to.length > 0) {
            for (const next of chain.evolves_to) {
              await processChain(next);
            }
          }
        };

        await processChain(chain);
        setEvolutions(evolutions);
        setSelectedEvolutionIndex(0); // Reset to first evolution
      } catch (error) {
        console.error('Error fetching evolutions:', error);
        setEvolutions([]);
      }
    };
    fetchEvolutions();
  }, [selectedPokemonIndex, pokemonList]);

  if (loading) {
    return <div className="font-pokemon text-center">Loading Pokémon...</div>;
  }

  const pokemon = pokemonList[selectedPokemonIndex];
  const evolution = evolutions[selectedEvolutionIndex] || pokemon;

  return (
    <div className="pokedex-screen font-pokemon text-xs">
      <div className="pokemon-list">
        <ul>
          {pokemonList.map((poke, index) => (
            <li
              key={poke.id}
              className={`pokemon-item ${index === selectedPokemonIndex ? 'selected' : ''}`}
            >
              {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
            </li>
          ))}
        </ul>
      </div>
      <div className="pokemon-details">
        <img src={evolution.sprite || pokemon.sprites.front_default} alt={evolution.name || pokemon.name} className="pokemon-image" />
        <h2>{(evolution.name || pokemon.name).charAt(0).toUpperCase() + (evolution.name || pokemon.name).slice(1)}</h2>
        <p>{pokemon.flavor_text}</p>
      </div>
    </div>
  );
};