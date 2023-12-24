"use client"

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonList } from '@/lib/actions/pokemon';
import Pokemoncards from '@/components/pokemonCards';

import SearchPokemon from '@/components/Search';
import TypeFilter from '@/components/TypeFilter';

interface RootState {
  pokemon: {
    pokemonList: {
      list: { name: string; url: string }[];
      details: any[];
      searchResults: any[];
    };
  };
}

export default function Home() {
 

  const [limit, setLimit] = useState<number>(200); // Initial limit
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const dispatch = useDispatch();
  const { list, details } = useSelector((state: RootState) => state.pokemon.pokemonList);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !loadingMore) {
      // User has scrolled to the bottom, load more Pokemon
      setLoadingMore(true);
      setLimit((prevLimit) => prevLimit + 200); // Increase the limit by 200
      dispatch(fetchPokemonList(limit)); // Fetch more Pokemon
    }
  };

  console.log('Pokemons', details)
  console.log('showtypes', typeFilter)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchPokemonList(limit));
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };

    fetchData();
  }, [dispatch, limit]);


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  if (!list || !details) {
    return(
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className="loader"></div>
    </div>
    )
  }

  const filteredBySearch = details.filter((pokemon) => {
    const matchesSearch =
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.id.toString().includes(searchTerm);
    return matchesSearch;
  });
  
  const filteredByType = details.filter((pokemon) => {
    const matchesType =
      typeFilter === 'all' ||
      pokemon.types.some((type: any) => type.type.name === typeFilter);
    return matchesType;
  });
  
  const filteredPokemon =
    searchTerm && typeFilter !== 'all'
      ? filteredBySearch.filter((pokemon) =>
          filteredByType.some((typeFiltered) => typeFiltered.id === pokemon.id)
        )
      : searchTerm
      ? filteredBySearch
      : typeFilter !== 'all'
      ? filteredByType
      : details;
  
  const renderFilteredPokemon =
    searchTerm || typeFilter !== 'all' ? filteredPokemon : details;
  


  const renderPokemonCards = (pokemonData: any[]) => (
    <div className='grid grid-cols-fluid gap-4'>
      {pokemonData.map((pokemon) => (
        <Pokemoncards key={pokemon.id} id={pokemon.id} name={pokemon.name} types={pokemon.types} stats={pokemon.stats} />
      ))}
    </div>
  );

  return (
    <main className="flex flex-col gap-8 p-4 md:p-12">
      <div className='flex flex-col md:flex-row gap-3 justify-between'>
        <SearchPokemon setSearchTerm={setSearchTerm} />
        <TypeFilter setTypeFilter={setTypeFilter} />
      </div>
      <div className='grid grid-cols-fluid gap-4'>
      {renderPokemonCards(renderFilteredPokemon)}
      </div>
    </main>
  );
}
