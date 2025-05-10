import React, { createContext, useContext, useEffect, useState } from 'react';
import { JournalContextType } from '@/types/journal-context';
import { useJournalState } from '@/hooks/use-journal-state';
import { useJournalActions } from '@/hooks/use-journal-actions';
import { useAuth } from './AuthContext';
import * as api from '@/lib/api';
import { Country, JournalState } from '@/types/travel-journal';

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state, setState, activeCountry, activeCity, activePage } = useJournalState();
  const actions = useJournalActions(state, setState);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // Carregar dados do Supabase quando o usuário estiver autenticado
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setLoading(true);
        try {
          const countries = await api.fetchCountries(user.id);
          setState((prev) => ({
            ...prev,
            countries,
            // Resetar ativos após carregar novos dados
            activeCountry: null,
            activeCity: null,
            activePage: null,
          }));
        } catch (error) {
          console.error('Erro ao carregar dados:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user, setState]);

  const contextValue: JournalContextType = {
    state,
    activeCountry,
    activeCity,
    activePage,
    loading,
    ...actions,
  };

  return (
    <JournalContext.Provider value={contextValue}>
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};
