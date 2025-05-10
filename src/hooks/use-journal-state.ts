
import { useState, useEffect } from 'react';
import { Country, JournalState, City, Page } from '@/types/travel-journal';
import { toast } from '@/components/ui/use-toast';

export function useJournalState() {
  const [state, setState] = useState<JournalState>({
    countries: [],
    activeCountry: null,
    activeCity: null,
    activePage: null,
  });

  useEffect(() => {
    // Migration logic from old format to new format
    const savedData = localStorage.getItem('travel-journal');
    if (savedData) {
      try {
        const oldData = JSON.parse(savedData);
        
        // Check if we need to migrate from old format
        if (oldData.folders && !oldData.countries) {
          // Convert old format to new format
          const countries: Country[] = [{
            id: Date.now().toString(),
            name: "My Travels",
            icon: "🌎", // Default icon
            notes: "",
            cities: oldData.folders.map((folder: any) => ({
              id: folder.id,
              name: folder.name,
              pages: folder.pages,
              createdAt: folder.createdAt
            })),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }];
          
          setState({
            countries,
            activeCountry: countries[0].id,
            activeCity: oldData.activeFolder,
            activePage: oldData.activePage
          });
        } else {
          // Already in new format
          setState(oldData);
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('travel-journal', JSON.stringify(state));
  }, [state]);

  // Find active entities
  const activeCountry = state.countries.find((country) => country.id === state.activeCountry) || null;
  
  const activeCity = activeCountry
    ? activeCountry.cities.find((city) => city.id === state.activeCity) || null
    : null;
  
  const activePage = activeCity && activeCountry
    ? activeCity.pages.find((page) => page.id === state.activePage) || null
    : null;

  return {
    state,
    setState,
    activeCountry,
    activeCity,
    activePage
  };
}
