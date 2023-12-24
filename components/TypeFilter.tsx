

// TypeFilter.tsx
import { useState } from "react";

const pokemonTypes = [
  "all",
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];


interface TypeFilterProps {
  setTypeFilter: (type: string) => void;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ setTypeFilter }) => {

  const [selectedType, setSelectedType] = useState('');

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedType(value);
    setTypeFilter(value);
  };

  console.log('TypeFilter rendered');

  return (
    <select
      id="types"
      className="bg-gray-50 border border-gray-300 text-gray-900 px-2.5 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[180px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={selectedType}
      onChange={handleTypeChange}
    >
      <option value="" disabled hidden className="text-gray-400">
        Choose a type
      </option>
      {pokemonTypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default TypeFilter;