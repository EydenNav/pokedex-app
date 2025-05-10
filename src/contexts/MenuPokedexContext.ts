import { createContext } from "react";

export enum EPokedexMenuOption {
  POKEDEX = 1,
  PACK = 2,
  EXIT = 3
}

export enum EPokedexScreen {
  MENU,
  POKEDEX = 1,
  PACK = 2,
  EXIT = 3
}

export type TMenuPokedexContext = {
  screen: EPokedexScreen;
  menuOption: EPokedexMenuOption;
  selectedPokemonIndex: number;
  selectedItemIndex: number;
  selectedEvolutionIndex: number;
  setScreen: (option: EPokedexScreen) => void;
  setMenuOption: (option: EPokedexMenuOption) => void;
  setSelectedPokemonIndex: (index: number) => void;
  setSelectedItemIndex: (index: number) => void;
  setSelectedEvolutionIndex: (index: number) => void;
}

export const MenuPokedexContext = createContext<TMenuPokedexContext>({
  screen: EPokedexScreen.MENU,
  menuOption: EPokedexMenuOption.POKEDEX,
  selectedPokemonIndex: 0,
  selectedItemIndex: 0,
  selectedEvolutionIndex: 0,
  setScreen: () => {},
  setMenuOption: () => {},
  setSelectedPokemonIndex: () => {},
  setSelectedItemIndex: () => {},
  setSelectedEvolutionIndex: () => {},
});