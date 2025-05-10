
import React, { useState } from 'react';
import { useJournal } from '@/contexts/JournalContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Globe, ChevronRight, Flag } from 'lucide-react';
import EmojiPicker from './EmojiPicker';

const CountrySidebar: React.FC = () => {
  const { state, createCountry, setActiveCountry } = useJournal();
  const [isCreatingCountry, setIsCreatingCountry] = useState(false);
  const [newCountryName, setNewCountryName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🌎');

  const handleCreateCountry = () => {
    if (newCountryName.trim()) {
      createCountry(newCountryName, selectedEmoji);
      setNewCountryName('');
      setSelectedEmoji('🌎');
      setIsCreatingCountry(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4 transition-all hover:shadow-lg">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Países</h2>
          {!isCreatingCountry && (
            <Button 
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 hover:bg-primary-200"
              onClick={() => setIsCreatingCountry(true)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {isCreatingCountry ? (
        <div className="space-y-3 mb-4">
          <div className="flex gap-2">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md cursor-pointer">
              <span className="text-xl" onClick={() => setIsCreatingCountry(true)}>
                {selectedEmoji}
              </span>
            </div>
            <Input
              type="text"
              value={newCountryName}
              onChange={(e) => setNewCountryName(e.target.value)}
              placeholder="Nome do país"
              autoFocus
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreateCountry();
                } else if (e.key === 'Escape') {
                  setIsCreatingCountry(false);
                  setNewCountryName('');
                }
              }}
            />
          </div>
          
          <EmojiPicker onSelect={(emoji) => setSelectedEmoji(emoji)} />
          
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              onClick={handleCreateCountry}
              className="bg-primary-600 hover:bg-primary-700 flex-1"
            >
              Adicionar País
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setIsCreatingCountry(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </div>
      ) : null}

      <div className="space-y-2">
        {state.countries.length === 0 ? (
          <div className="text-center py-6">
            <div className="bg-primary-50 rounded-full p-4 inline-block mx-auto mb-3">
              <Globe className="h-6 w-6 text-primary-600" />
            </div>
            <p className="text-sm text-muted-foreground">
              Nenhum país registrado ainda.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Adicione seu primeiro país de viagem!
            </p>
          </div>
        ) : (
          state.countries.map((country) => (
            <div
              key={country.id}
              className={`group rounded-lg cursor-pointer transition-colors p-3 ${
                state.activeCountry === country.id 
                  ? 'bg-primary-50 border-l-4 border-primary-400' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setActiveCountry(country.id)}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{country.icon}</span>
                <span className="font-medium">{country.name}</span>
                <span className="text-xs text-gray-500 ml-1">({country.cities.length})</span>
              </div>
            </div>
          ))
        )}
      </div>
      
      {!isCreatingCountry && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-gray-700" 
            onClick={() => setIsCreatingCountry(true)}
          >
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4 text-gray-500" />
              <span>Novo País</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CountrySidebar;
