import { supabase } from './supabase';
import { Country, City, Page } from '@/types/travel-journal';
import { v4 as uuidv4 } from 'uuid';

// Funções auxiliares para converter entre formatos de dados
const convertSupabaseCountryToLocal = (country: any, cities: City[] = []): Country => ({
  id: country.id,
  name: country.name,
  icon: country.icon,
  notes: country.notes,
  cities: cities,
  createdAt: country.created_at,
  updatedAt: country.updated_at,
});

const convertSupabaseCityToLocal = (city: any, pages: Page[] = []): City => ({
  id: city.id,
  name: city.name,
  pages: pages,
  createdAt: city.created_at,
});

const convertSupabasePageToLocal = (page: any): Page => ({
  id: page.id,
  title: page.title,
  content: page.content,
  createdAt: page.created_at,
  updatedAt: page.updated_at,
});

// Funções de API para países
export const fetchCountries = async (userId: string) => {
  const { data: countries, error } = await supabase
    .from('countries')
    .select('*')
    .eq('user_id', userId)
    .order('name');

  if (error) {
    console.error('Erro ao buscar países:', error);
    return [];
  }

  // Para cada país, buscar suas cidades
  const countriesWithCities = await Promise.all(
    countries.map(async (country) => {
      const cities = await fetchCitiesByCountry(country.id, userId);
      return convertSupabaseCountryToLocal(country, cities);
    })
  );

  return countriesWithCities;
};

export const createCountry = async (name: string, icon: string, userId: string) => {
  const id = uuidv4();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('countries')
    .insert({
      id,
      name,
      icon,
      notes: '',
      user_id: userId,
      created_at: now,
      updated_at: now,
    })
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar país:', error);
    throw error;
  }

  return convertSupabaseCountryToLocal(data, []);
};

export const updateCountryNotes = async (countryId: string, notes: string, userId: string) => {
  const now = new Date().toISOString();

  const { error } = await supabase
    .from('countries')
    .update({
      notes,
      updated_at: now,
    })
    .eq('id', countryId)
    .eq('user_id', userId);

  if (error) {
    console.error('Erro ao atualizar notas do país:', error);
    throw error;
  }
};

export const deleteCountry = async (countryId: string, userId: string) => {
  // Primeiro, deletar todas as páginas das cidades deste país
  const { data: cities } = await supabase
    .from('cities')
    .select('id')
    .eq('country_id', countryId)
    .eq('user_id', userId);

  if (cities && cities.length > 0) {
    const cityIds = cities.map(city => city.id);
    
    // Deletar todas as páginas dessas cidades
    await supabase
      .from('pages')
      .delete()
      .in('city_id', cityIds)
      .eq('user_id', userId);

    // Deletar as cidades
    await supabase
      .from('cities')
      .delete()
      .eq('country_id', countryId)
      .eq('user_id', userId);
  }

  // Finalmente, deletar o país
  const { error } = await supabase
    .from('countries')
    .delete()
    .eq('id', countryId)
    .eq('user_id', userId);

  if (error) {
    console.error('Erro ao deletar país:', error);
    throw error;
  }
};

// Funções de API para cidades
export const fetchCitiesByCountry = async (countryId: string, userId: string) => {
  const { data: cities, error } = await supabase
    .from('cities')
    .select('*')
    .eq('country_id', countryId)
    .eq('user_id', userId)
    .order('name');

  if (error) {
    console.error('Erro ao buscar cidades:', error);
    return [];
  }

  // Para cada cidade, buscar suas páginas
  const citiesWithPages = await Promise.all(
    cities.map(async (city) => {
      const pages = await fetchPagesByCity(city.id, userId);
      return convertSupabaseCityToLocal(city, pages);
    })
  );

  return citiesWithPages;
};

export const createCity = async (countryId: string, name: string, userId: string) => {
  const id = uuidv4();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('cities')
    .insert({
      id,
      name,
      country_id: countryId,
      user_id: userId,
      created_at: now,
    })
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar cidade:', error);
    throw error;
  }

  return convertSupabaseCityToLocal(data, []);
};

export const deleteCity = async (cityId: string, userId: string) => {
  // Primeiro, deletar todas as páginas desta cidade
  await supabase
    .from('pages')
    .delete()
    .eq('city_id', cityId)
    .eq('user_id', userId);

  // Depois, deletar a cidade
  const { error } = await supabase
    .from('cities')
    .delete()
    .eq('id', cityId)
    .eq('user_id', userId);

  if (error) {
    console.error('Erro ao deletar cidade:', error);
    throw error;
  }
};

// Funções de API para páginas
export const fetchPagesByCity = async (cityId: string, userId: string) => {
  const { data: pages, error } = await supabase
    .from('pages')
    .select('*')
    .eq('city_id', cityId)
    .eq('user_id', userId)
    .order('created_at');

  if (error) {
    console.error('Erro ao buscar páginas:', error);
    return [];
  }

  return pages.map(convertSupabasePageToLocal);
};

export const createPage = async (cityId: string, title: string, userId: string) => {
  const id = uuidv4();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('pages')
    .insert({
      id,
      title,
      content: '',
      city_id: cityId,
      user_id: userId,
      created_at: now,
      updated_at: now,
    })
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar página:', error);
    throw error;
  }

  return convertSupabasePageToLocal(data);
};

export const updatePage = async (pageId: string, content: string, userId: string) => {
  const now = new Date().toISOString();

  const { error } = await supabase
    .from('pages')
    .update({
      content,
      updated_at: now,
    })
    .eq('id', pageId)
    .eq('user_id', userId);

  if (error) {
    console.error('Erro ao atualizar página:', error);
    throw error;
  }
};

export const updatePageTitle = async (pageId: string, title: string, userId: string) => {
  const now = new Date().toISOString();

  const { error } = await supabase
    .from('pages')
    .update({
      title,
      updated_at: now,
    })
    .eq('id', pageId)
    .eq('user_id', userId);

  if (error) {
    console.error('Erro ao atualizar título da página:', error);
    throw error;
  }
};

export const deletePage = async (pageId: string, userId: string) => {
  const { error } = await supabase
    .from('pages')
    .delete()
    .eq('id', pageId)
    .eq('user_id', userId);

  if (error) {
    console.error('Erro ao deletar página:', error);
    throw error;
  }
}; 