// "use client"

import Image from 'next/image';
import pokeColor from './pokeColor'
// import { motion } from 'framer-motion';

const getPokemonList = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=27&offset=0');
  const data = await res.json();
  return data.results;
};

const getPokemonDetails = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

// Helper function to format ID with leading zeros
const formatPokemonId = (id: number) => `#${id.toString().padStart(3, '0')}`;

const getRandomColor = () => {
  const randomColors = ['#64dbb2', '#f0776a', '#58abf6', '#facd4b', '#9f5bba', '#ca8179'];
  return randomColors[Math.floor(Math.random() * randomColors.length)];
};

export default async function Home() {
  // Fetch list of Pokemon
  const pokemonList = await getPokemonList();

  // Fetch details for each Pokemon
  const pokemonDetailsPromises = pokemonList.map((pokemon: { url: string; }) => getPokemonDetails(pokemon.url));
  const pokemonDetails = await Promise.all(pokemonDetailsPromises);

  return (
    <main className="grid grid-cols-fluid gap-4 p-3 md:p-12">
       {pokemonDetails.map((pokemon) => (
     <div
    //  whileHover={{ scale: 1.04 }}
     key={pokemon.id}
     className="border-black rounded-xl flex flex-col justify-around shadow-lg p-4 text-white "
     style={{
       backgroundColor: pokeColor[pokemon.name] || getRandomColor(),
       backgroundImage: "url('/logo.png')",
       backgroundSize: '160%',
       backgroundPosition: 'left top',
       height: '330px',
       transition: 'background-position 1s ease',
     }}
  
   >
      <div className='  flex items-center justify-between'>
            {/* Top Left: Name */}
        <div className="flex items-center mb-2">
          <p className="font-bold text-2xl cursor-default">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
        </div>

        {/* Top Right: ID */}
        <div className="flex items-center justify-end text-white text-opacity-70 hover:text-opacity-90 transition-colors duration-300 mb-2">
          <p className="font-bold text-xl cursor-default">{formatPokemonId(pokemon.id)}</p>
        </div>
      </div>
      
      <div className='  flex items-center justify-between'>
          {/* Bottom Left: Types */}
        <div className="mb-2">
          <div className="flex flex-col gap-2">
            {pokemon.types.map((type, index) => (
              <div key={index} className="rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition-colors duration-300 cursor-default px-3 py-1">
                {type.type.name}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Right: Image */}
        <div className="text-center hover:animate-float">
          <Image
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
            alt={pokemon.name}
            width={150}
            height={150}
          />
        </div>
      </div>
    </div>
  ))}
    </main>
  );
}
