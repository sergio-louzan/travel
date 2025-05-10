
import React from 'react';
import { City } from '@/types/travel-journal';
import { cn } from '@/lib/utils';
import { MapPin, X, Edit } from 'lucide-react';
import { useJournal } from '@/contexts/JournalContext';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface FolderItemProps {
  folder: City;
  countryId: string;
}

const FolderItem: React.FC<FolderItemProps> = ({ folder, countryId }) => {
  const { setActiveCity, state, deleteCity } = useJournal();
  const isActive = state.activeCity === folder.id;
  
  const handleClick = () => {
    setActiveCity(folder.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Deseja realmente excluir a cidade "${folder.name}" e todas as suas memórias?`)) {
      deleteCity(countryId, folder.id);
    }
  };

  // Gerar uma cor aleatória baseada no nome da pasta
  const getColorClass = () => {
    const colors = ['amber', 'emerald', 'blue', 'purple', 'pink'];
    const hash = folder.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };
  
  const colorName = getColorClass();
  const colorClasses: Record<string, { bg: string, text: string }> = {
    amber: { bg: 'text-amber-500', text: 'text-amber-800' },
    emerald: { bg: 'text-emerald-500', text: 'text-emerald-800' },
    blue: { bg: 'text-blue-500', text: 'text-blue-800' },
    purple: { bg: 'text-purple-500', text: 'text-purple-800' },
    pink: { bg: 'text-pink-500', text: 'text-pink-800' },
  };

  return (
    <div
      className={cn(
        'group rounded-lg cursor-pointer transition-colors',
        isActive 
          ? 'bg-travel-lightPurple border-l-4 border-travel-purple' 
          : 'hover:bg-gray-50'
      )}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <MapPin className={cn("h-5 w-5", colorClasses[colorName].bg)} />
          <span className="font-medium">{folder.name}</span>
          <span className="text-xs text-gray-500 ml-1">({folder.pages.length})</span>
        </div>
        {!isActive && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
              onClick={handleDelete}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
        {isActive && (
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
              onClick={handleDelete}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderItem;
