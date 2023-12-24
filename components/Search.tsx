
import { useState, useEffect } from 'react';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

interface Props {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchPokemon({ setSearchTerm }: Props) {
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  // const handleSearch = () => {
  //   setSearchTerm(localSearchTerm);
  // };

  useEffect(() => {
    // Trigger the search when localSearchTerm changes
    setSearchTerm(localSearchTerm);
  }, [localSearchTerm, setSearchTerm]);

  return (
    <div className="flex w-full max-w-lg items-center space-x-2">
      <Input
        type="text"
        placeholder="Search pokemon"
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        className='border-[#64dbb2]'
      />
     
    </div>
  );
}
