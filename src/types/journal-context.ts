import { Country, City, Page, JournalState } from '@/types/travel-journal';

export interface JournalContextType {
  state: JournalState;
  createCountry: (name: string, icon: string) => void;
  updateCountryNotes: (countryId: string, notes: string) => void;
  createCity: (countryId: string, name: string) => void;
  createPage: (countryId: string, cityId: string, title: string) => void;
  updatePage: (countryId: string, cityId: string, pageId: string, content: string) => void;
  updatePageTitle: (countryId: string, cityId: string, pageId: string, title: string) => void;
  savePage: (countryId: string, cityId: string, pageId: string, content: string) => void;
  setActiveCountry: (countryId: string | null) => void;
  setActiveCity: (cityId: string | null) => void;
  setActivePage: (pageId: string | null) => void;
  deleteCountry: (countryId: string) => void;
  deleteCity: (countryId: string, cityId: string) => void;
  deletePage: (countryId: string, cityId: string, pageId: string) => void;
  activeCountry: Country | null;
  activeCity: City | null;
  activePage: Page | null;
  loading: boolean;
}
