
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface PokemonDetailsModalProps {
  pokemon: any;
  toggleModal: () => void;
  backgroundColor: string;
}

const formatPokemonId = (id: number | undefined) => `#${(id ?? '').toString().padStart(3, '0')}`;

const PokemonDetailsModal: React.FC<PokemonDetailsModalProps> = ({ pokemon, toggleModal, backgroundColor }) => {

    const getRandomColor = () => {
        const randomColors = ['#64dbb2', '#f0776a', '#58abf6', '#facd4b', '#9f5bba', '#ca8179'];
        return randomColors[Math.floor(Math.random() * randomColors.length)];
      };

useEffect(() => {
   
    document.body.style.overflow = 'hidden';

  
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []); 
  return (
    <div 
        className="fixed px-4 inset-0 h-screen w-full flex items-center justify-center z-50"  
    >
      <div className="fixed inset-0 bg-black bg-opacity-60">
        <X className="md:hidden text-white absolute top-8 right-1/2"/>
      </div>
      <div
         
           className="border-black rounded-xl  flex flex-col gap-12 justify-around  shadow-lg p-4 md:p-12 text-white z-0"
           style={{
             backgroundColor: backgroundColor,
             backgroundImage: "url('/logo.png')",
             backgroundSize: '160%',
             backgroundPosition: 'left top',
             transition: 'background-position 1s ease',
           }}
       
         >
            <div className='  flex items-center justify-between'>
        
              <div className="flex items-center mb-2">
                <p className="font-bold text-4xl cursor-default">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
              </div>
      
    
              <div className="flex items-center justify-end text-white text-opacity-70 hover:text-opacity-90 transition-colors duration-300 mb-2">
              <p className="font-bold text-xl cursor-default">{formatPokemonId(pokemon.id)}</p>
              </div>
            </div>
            
            <div className=' relative flex flex-col md:flex-row items-center gap-12 md:gap-32 justify-between'>
      
            <div className="flex flex-col">
                {pokemon.stats.map((stat: any, index: number) => (
                    <div key={index} className="mb-2">
                    <div className="flex items-center">
                        <div className=" text-right text-lg w-[340px]"> {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}</div>
                        <div className="w-1/4 px-8 text-left">{stat.base_stat}</div>
                        <div className="w-full">
                            <div>
                                <span id={`ProgressLabel${index}`} className="sr-only">
                                {stat.stat.name.charAt(0).toUpperCase()}
                                </span>
                                <span
                                role="levelbar"
                                aria-labelledby={`ProgressLabel${index}`}
                                aria-valuenow={+stat.base_stat}
                                aria-valuemin={0}
                                aria-valuemax={255}
                                className="block rounded-md bg-gray-200"
                                >
                                <span
                                    className="block h-3 rounded-md bg-indigo-600"
                                    style={{
                                    width: `${(stat.base_stat / 255) * 100}%`,
                                    backgroundColor: getRandomColor(),
                                    }}
                                ></span>
                                </span>
                            </div>
                        </div>
                    </div>
                    </div>
                ))}
            </div>
              <div className="text-center float animate-float">
                <Image
                  src={pokemon.imageUrl}
                  alt={pokemon.name}
                  width={400}
                  height={400}
                  className=' w-[250px] h-[250px] md:w-[400px] md:h-[400px] '
                />
              </div>
            </div>
          </div>
      </div>
 
  );
};

export default PokemonDetailsModal;
