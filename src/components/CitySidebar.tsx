import React, { useState } from 'react';
import { useJournal } from '@/contexts/JournalContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Map, ChevronRight, MapPin, ArrowLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface CitySidebarProps {
  onClose?: () => void;
}

const CitySidebar: React.FC<CitySidebarProps> = ({ onClose }) => {
  const { activeCountry, createCity, setActiveCity, setActiveCountry, state } = useJournal();
  const [newCityName, setNewCityName] = useState('');
  const [isCreatingCity, setIsCreatingCity] = useState(false);
  const isMobile = useIsMobile();

  const handleCreateCity = () => {
    if (!activeCountry) return;
    
    if (newCityName.trim()) {
      createCity(activeCountry.id, newCityName);
      setNewCityName('');
      setIsCreatingCity(false);
      if (onClose && isMobile) {
        onClose();
      }
    }
  };

  const handleBackButton = () => {
    // Volta para a lista de países
    setActiveCountry(null);
  };

  if (!activeCountry) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 transition-all hover:shadow-lg">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleBackButton}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-xl">{activeCountry.icon}</span>
              <h2 className="text-xl font-semibold">{activeCountry.name}</h2>
            </div>
          </div>
          
          {!isCreatingCity && (
            <Button 
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 hover:bg-primary-200"
              onClick={() => setIsCreatingCity(true)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {isCreatingCity ? (
        <div className="space-y-2 mb-4">
          <Input
            type="text"
            value={newCityName}
            onChange={(e) => setNewCityName(e.target.value)}
            placeholder="Nome da cidade"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCreateCity();
              } else if (e.key === 'Escape') {
                setIsCreatingCity(false);
                setNewCityName('');
              }
            }}
          />
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              onClick={handleCreateCity}
              className="bg-primary-600 hover:bg-primary-700 flex-1"
            >
              Adicionar Cidade
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setIsCreatingCity(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </div>
      ) : null}

      <div className="space-y-2">
        {activeCountry.cities.length === 0 ? (
          <div className="text-center py-6">
            <div className="bg-primary-50 rounded-full p-4 inline-block mx-auto mb-3">
              <Map className="h-6 w-6 text-primary-600" />
            </div>
            <p className="text-sm text-muted-foreground">
              Nenhuma cidade registrada ainda.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Adicione sua primeira cidade para {activeCountry.name}!
            </p>
          </div>
        ) : (
          activeCountry.cities.map((city) => (
            <div
              key={city.id}
              className={`group rounded-lg cursor-pointer transition-colors ${
                state.activeCity === city.id 
                  ? 'bg-primary-50 border-l-4 border-primary-400' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setActiveCity(city.id)}
            >
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-amber-500" />
                  <span className="font-medium">{city.name}</span>
                  <span className="text-xs text-gray-500 ml-1">({city.pages.length})</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {!isCreatingCity && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-gray-700" 
            onClick={() => setIsCreatingCity(true)}
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>Nova Cidade</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CitySidebar;
