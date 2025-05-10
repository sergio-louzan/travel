import React, { useState } from 'react';
import { useJournal } from '@/contexts/JournalContext';
import RichTextEditor from './RichTextEditor';
import { Button } from '@/components/ui/button';
import { Save, Globe, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const CountryNotes: React.FC = () => {
  const { activeCountry, updateCountryNotes, setActiveCountry } = useJournal();
  const [notes, setNotes] = useState(activeCountry?.notes || '');
  const [isEdited, setIsEdited] = useState(false);

  if (!activeCountry) return null;

  const handleSaveNotes = () => {
    updateCountryNotes(activeCountry.id, notes);
    setIsEdited(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0 mr-2"
            onClick={() => setActiveCountry(null)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="text-2xl">{activeCountry.icon}</span>
          <h2 className="text-xl font-semibold">{activeCountry.name}</h2>
        </div>
        {isEdited && (
          <Button onClick={handleSaveNotes} className="bg-primary-600 hover:bg-primary-700">
            <Save className="h-4 w-4 mr-2" />
            Salvar Notas
          </Button>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary-600" />
          Notas do País
        </h3>
        <RichTextEditor 
          content={notes}
          onChange={(content) => {
            setNotes(content);
            setIsEdited(true);
          }}
        />
      </div>

      <p className="text-xs text-gray-500 mt-4 text-right">
        Última atualização: {format(new Date(activeCountry.updatedAt), 'PPpp', { locale: ptBR })}
      </p>
    </div>
  );
};

export default CountryNotes;
