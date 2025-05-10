import { JSX, ReactNode, useState } from "react";
import { EPokedexMenuOption, EPokedexScreen, MenuPokedexContext } from "./MenuPokedexContext";

export const MenuPokedexProvider = ({ children }: { children: ReactNode | JSX.Element | JSX.Element[] }) => {
  const [screen, setScreen] = useState(EPokedexScreen.MENU);
  const [menuOption, setMenuOption] = useState(EPokedexMenuOption.POKEDEX);
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(0);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [selectedEvolutionIndex, setSelectedEvolutionIndex] = useState(0);

  const setScreenOption = (option: EPokedexScreen) => {
    setScreen(option);
  };

  const getScreenOption = () => {
    return screen;
  };

  const setMenuOptionValue = (option: EPokedexMenuOption) => {
    setMenuOption(option);
  };

  const getMenuOption = () => {
    return menuOption;
  };

  return (
    <MenuPokedexContext.Provider
      value={{
        screen: getScreenOption(),
        setScreen: setScreenOption,
        menuOption: getMenuOption(),
        setMenuOption: setMenuOptionValue,
        selectedPokemonIndex,
        setSelectedPokemonIndex,
        selectedItemIndex,
        setSelectedItemIndex,
        selectedEvolutionIndex,
        setSelectedEvolutionIndex,
      }}
    >
      {children}
    </MenuPokedexContext.Provider>
  );
};