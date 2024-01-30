

import { motion } from "framer-motion"
import Image from "next/image"
import pokeColor from "@/components/pokeColor";
import { useState } from "react";
import PokemonDetailsModal from "./pokemonDetailsModal";

interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  stats: { type: { name: string } }[];
}

export default function Pokemoncards({ id, name, types, stats }: Pokemon) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const formatPokemonId = (id: number | undefined) => `#${(id ?? '').toString().padStart(3, '0')}`;

  const getRandomColor = () => {
    const randomColors = ['#64dbb2', '#f0776a', '#58abf6', '#facd4b', '#9f5bba', '#ca8179'];
    return randomColors[Math.floor(Math.random() * randomColors.length)];
  };

  const imageUrl = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`;

  return (
    <main
      onClick={toggleModal}>
      <motion.div
        whileHover={{ scale: 1.04 }}
        key={id}
        className="border-black rounded-xl flex flex-col justify-around shadow-lg p-4 text-white lg:max-w-[500px] z-0 cursor-pointer"
        style={{
          backgroundColor: pokeColor[name as keyof typeof pokeColor] || getRandomColor(),
          backgroundImage: "url('/logo.png')",
          backgroundSize: '160%',
          backgroundPosition: 'left top',
          transition: 'background-position 1s ease',
        }}
      >
        <div className='  flex items-center justify-between'>
          {/* Top Left: Name */}
          <div className="flex items-center mb-2">
            <p className="font-bold text-2xl">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
          </div>

          {/* Top Right: ID */}
          <div className="flex items-center justify-end text-white text-opacity-70 hover:text-opacity-90 transition-colors duration-300 mb-2">
            <p className="font-bold text-xl">{formatPokemonId(id)}</p>
          </div>
        </div>

        <div className='  flex items-center justify-between'>
          {/* Bottom Left: Types */}
          <div className="mb-2">
            <div className="flex flex-col gap-2">
              {types.map((type: any, index: number) => (
                <div key={index} className="rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition-colors duration-300 px-3 py-1">
                  {type.type.name}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Right: Image */}
          <div className="text-center hover:animate-float">
            <Image
              src={imageUrl}
              alt={name}
              width={170}
              height={170}
              className='w-[170px] h-[170px]'
              loading="lazy" // Lazy loading attribute
            />
          </div>
        </div>
      </motion.div>
      {isModalOpen && (
        <PokemonDetailsModal
          pokemon={{ id, name, types, stats, imageUrl }}
          toggleModal={toggleModal}
          backgroundColor={pokeColor[name as keyof typeof pokeColor] || getRandomColor()}
        />
      )}
    </main>
  )
}
