
// reducers/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import pokemonReducer from './pokemon';

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
