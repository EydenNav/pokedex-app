import { useContext } from 'react';
import { EPokedexScreen, MenuPokedexContext, EPokedexMenuOption } from '../../contexts/MenuPokedexContext';

export const Cross = () => {
  const {
    screen,
    menuOption,
    setMenuOption,
    setScreen,
    selectedPokemonIndex,
    setSelectedPokemonIndex,
    selectedItemIndex,
    setSelectedItemIndex,
    selectedEvolutionIndex,
    setSelectedEvolutionIndex,
  } = useContext(MenuPokedexContext);

  const handleUp = () => {
    if (screen === EPokedexScreen.MENU) {
      const newOption = menuOption - 1 < 1 ? 3 : menuOption - 1;
      setMenuOption(newOption);
    } else if (screen === EPokedexScreen.POKEDEX) {
      setSelectedPokemonIndex(selectedPokemonIndex > 0 ? selectedPokemonIndex - 1 : 150); // Wrap to last Pokémon
    } else if (screen === EPokedexScreen.PACK) {
      setSelectedItemIndex(selectedItemIndex > 0 ? selectedItemIndex - 1 : 49); // Wrap to last item
    }
  };

  const handleDown = () => {
    if (screen === EPokedexScreen.MENU) {
      const newOption = menuOption + 1 > 3 ? 1 : menuOption + 1;
      setMenuOption(newOption);
    } else if (screen === EPokedexScreen.POKEDEX) {
      setSelectedPokemonIndex(selectedPokemonIndex < 150 ? selectedPokemonIndex + 1 : 0); // Wrap to first Pokémon
    } else if (screen === EPokedexScreen.PACK) {
      setSelectedItemIndex(selectedItemIndex < 49 ? selectedItemIndex + 1 : 0); // Wrap to first item
    }
  };

  const handleLeft = () => {
    if (screen === EPokedexScreen.POKEDEX) {
      setSelectedEvolutionIndex(selectedEvolutionIndex > 0 ? selectedEvolutionIndex - 1 : 0); // Stay at first evolution
    }
  };

  const handleRight = () => {
    if (screen === EPokedexScreen.POKEDEX) {
      // Max evolutions length is dynamic, but we don't have it here; assume max 2 for safety
      setSelectedEvolutionIndex(selectedEvolutionIndex < 2 ? selectedEvolutionIndex + 1 : 2);
    }
  };

  const handleSelect = () => {
    if (screen === EPokedexScreen.MENU) {
      setScreen(menuOption as unknown as EPokedexScreen);
    }
  };

  return (
    <div id="cross">
      <div id="leftcross" className="gameboy-button" onClick={handleLeft}>
        <div id="leftT"></div>
      </div>
      <div id="topcross" className="gameboy-button" onClick={handleUp}>
        <div id="upT"></div>
      </div>
      <div id="rightcross" className="gameboy-button" onClick={handleRight}>
        <div id="rightT"></div>
      </div>
      <div id="midcross" className="gameboy-button" onClick={handleSelect}>
        <div id="midCircle"></div>
      </div>
      <div id="botcross" className="gameboy-button" onClick={handleDown}>
        <div id="downT"></div>
      </div>
    </div>
  );
};