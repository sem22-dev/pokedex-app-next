
import { createAsyncThunk, createAction, createSlice } from '@reduxjs/toolkit';


const fetchPokemonListAPI = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=649');
  const data = await res.json();
  return data.results;
};


const fetchPokemonDetailsAPI = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};



export const fetchPokemonList = createAsyncThunk('pokemon/fetchPokemonList', async (_, { dispatch, getState }) => {
  try {
    const pokemonList = await fetchPokemonListAPI(); // Call the API function


    const pokemonDetailsPromises = pokemonList.map((pokemon: { url: string; }) => fetchPokemonDetailsAPI(pokemon.url));
    const pokemonDetails = await Promise.all(pokemonDetailsPromises);

    dispatch(setPokemonList({ list: pokemonList, details: pokemonDetails }));

  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw error; 
  }
}) as any;



export const setPokemonList = createAction<{ list: any[]; details: any[] }>('pokemon/setPokemonList');


// Create a slice with reducers and initial state
const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {

    setPokemonList: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemonList.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default pokemonSlice.reducer;