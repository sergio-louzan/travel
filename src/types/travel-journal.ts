
export interface Page {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface City {
  id: string;
  name: string;
  pages: Page[];
  createdAt: string;
}

export interface Country {
  id: string;
  name: string;
  icon: string; // Emoji flag for the country
  notes: string; // Notes about the country
  cities: City[];
  createdAt: string;
  updatedAt: string;
}

export interface JournalState {
  countries: Country[];
  activeCountry: string | null;
  activeCity: string | null;
  activePage: string | null;
}
