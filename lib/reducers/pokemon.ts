

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pokemonList: [],
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonList(state, action) {
      state.pokemonList = action.payload;
    },
  },
});

export const { setPokemonList } = pokemonSlice.actions;
export default pokemonSlice.reducer;
