import React from 'react';
import { useJournal } from '@/contexts/JournalContext';
import CountrySidebar from './CountrySidebar';
import CitySidebar from './CitySidebar';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { activeCountry } = useJournal();

  // Mostrar o CitySidebar quando um país está selecionado e o CountrySidebar caso contrário
  return (
    <>
      {activeCountry ? (
        <CitySidebar onClose={onClose} />
      ) : (
        <CountrySidebar />
      )}
    </>
  );
};

export default Sidebar;
