import { Dispatch, SetStateAction } from 'react';
import { Country, JournalState, City, Page } from '@/types/travel-journal';
import { toast } from '@/components/ui/use-toast';
import * as api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

export function useJournalActions(
  state: JournalState,
  setState: Dispatch<SetStateAction<JournalState>>
) {
  const { user } = useAuth();

  const createCountry = async (name: string, icon: string) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para criar um país.",
        variant: "destructive"
      });
      return;
    }

    if (!name.trim()) {
      toast({
        title: "Erro",
        description: "O nome do país não pode estar vazio.",
        variant: "destructive"
      });
      return;
    }

    try {
      const newCountry = await api.createCountry(name, icon || "🌎", user.id);

      setState((prev) => ({
        ...prev,
        countries: [...prev.countries, newCountry],
        activeCountry: newCountry.id,
        activeCity: null,
        activePage: null,
      }));

      toast({
        title: "Sucesso",
        description: `País "${name}" criado com sucesso.`
      });
    } catch (error) {
      console.error('Erro ao criar país:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o país. Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  };

  const updateCountryNotes = async (countryId: string, notes: string) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para atualizar as notas.",
        variant: "destructive"
      });
      return;
    }

    try {
      await api.updateCountryNotes(countryId, notes, user.id);

      setState((prev) => ({
        ...prev,
        countries: prev.countries.map((country) => {
          if (country.id === countryId) {
            return {
              ...country,
              notes,
              updatedAt: new Date().toISOString(),
            };
          }
          return country;
        }),
      }));
    } catch (error) {
      console.error('Erro ao atualizar notas do país:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar as notas. Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  };

  const createCity = async (countryId: string, name: string) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para criar uma cidade.",
        variant: "destructive"
      });
      return;
    }

    if (!name.trim()) {
      toast({
        title: "Erro",
        description: "O nome da cidade não pode estar vazio.",
        variant: "destructive"
      });
      return;
    }

    try {
      const newCity = await api.createCity(countryId, name, user.id);

      setState((prev) => ({
        ...prev,
        countries: prev.countries.map((country) => {
          if (country.id === countryId) {
            return {
              ...country,
              cities: [...country.cities, newCity],
              updatedAt: new Date().toISOString(),
            };
          }
          return country;
        }),
        activeCity: newCity.id,
        activePage: null,
      }));

      toast({
        title: "Sucesso",
        description: `Cidade "${name}" criada com sucesso.`
      });
    } catch (error) {
      console.error('Erro ao criar cidade:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar a cidade. Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  };

  const createPage = async (countryId: string, cityId: string, title: string) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para criar uma página.",
        variant: "destructive"
      });
      return;
    }

    if (!title.trim()) {
      toast({
        title: "Erro",
        description: "O título da página não pode estar vazio.",
        variant: "destructive"
      });
      return;
    }

    try {
      const newPage = await api.createPage(cityId, title, user.id);

      setState((prev) => ({
        ...prev,
        countries: prev.countries.map((country) => {
          if (country.id === countryId) {
            return {
              ...country,
              cities: country.cities.map((city) => {
                if (city.id === cityId) {
                  return {
                    ...city,
                    pages: [...city.pages, newPage],
                  };
                }
                return city;
              }),
              updatedAt: new Date().toISOString(),
            };
          }
          return country;
        }),
        activePage: newPage.id,
      }));

      toast({
        title: "Sucesso",
        description: `Página "${title}" criada com sucesso.`
      });
    } catch (error) {
      console.error('Erro ao criar página:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar a página. Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  };

  const updatePage = async (countryId: string, cityId: string, pageId: string, content: string) => {
    if (!user) return;

    setState((prev) => ({
      ...prev,
      countries: prev.countries.map((country) => {
        if (country.id === countryId) {
          return {
            ...country,
            cities: country.cities.map((city) => {
              if (city.id === cityId) {
                return {
                  ...city,
                  pages: city.pages.map((page) => {
                    if (page.id === pageId) {
                      return {
                        ...page,
                        content,
                        // Auto-save não atualiza o timestamp
                      };
                    }
                    return page;
                  }),
                };
              }
              return city;
            }),
          };
        }
        return country;
      }),
    }));

    try {
      await api.updatePage(pageId, content, user.id);
    } catch (error) {
      console.error('Erro ao atualizar página:', error);
    }
  };

  const savePage = async (countryId: string, cityId: string, pageId: string, content: string) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para salvar a página.",
        variant: "destructive"
      });
      return;
    }

    try {
      await api.updatePage(pageId, content, user.id);
      
      const now = new Date().toISOString();
      
      setState((prev) => ({
        ...prev,
        countries: prev.countries.map((country) => {
          if (country.id === countryId) {
            return {
              ...country,
              cities: country.cities.map((city) => {
                if (city.id === cityId) {
                  return {
                    ...city,
                    pages: city.pages.map((page) => {
                      if (page.id === pageId) {
                        return {
                          ...page,
                          content,
                          updatedAt: now, // Salvamento explícito atualiza o timestamp
                        };
                      }
                      return page;
                    }),
                  };
                }
                return city;
              }),
              updatedAt: now,
            };
          }
          return country;
        }),
      }));

      toast({
        title: "Salvo",
        description: "Suas alterações foram salvas."
      });
    } catch (error) {
      console.error('Erro ao salvar página:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar a página. Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  };

  const updatePageTitle = async (countryId: string, cityId: string, pageId: string, title: string) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para atualizar o título.",
        variant: "destructive"
      });
      return;
    }

    if (!title.trim()) {
      toast({
        title: "Erro",
        description: "O título da página não pode estar vazio.",
        variant: "destructive"
      });
      return;
    }

    try {
      await api.updatePageTitle(pageId, title, user.id);
      
      setState((prev) => ({
        ...prev,
        countries: prev.countries.map((country) => {
          if (country.id === countryId) {
            return {
              ...country,
              cities: country.cities.map((city) => {
                if (city.id === cityId) {
                  return {
                    ...city,
                    pages: city.pages.map((page) => {
                      if (page.id === pageId) {
                        return {
                          ...page,
                          title,
                          updatedAt: new Date().toISOString(),
                        };
                      }
                      return page;
                    }),
                  };
                }
                return city;
              }),
              updatedAt: new Date().toISOString(),
            };
          }
          return country;
        }),
      }));

      toast({
        title: "Sucesso",
        description: `Título atualizado para "${title}".`
      });
    } catch (error) {
      console.error('Erro ao atualizar título:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o título. Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  };

  const setActiveCountry = (countryId: string | null) => {
    setState((prev) => ({
      ...prev,
      activeCountry: countryId,
      activeCity: null,
      activePage: null,
    }));
  };

  const setActiveCity = (cityId: string | null) => {
    setState((prev) => ({
      ...prev,
      activeCity: cityId,
      activePage: null,
    }));
  };

  const setActivePage = (pageId: string | null) => {
    setState((prev) => ({
      ...prev,
      activePage: pageId,
    }));
  };

  const deleteCountry = async (countryId: string) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para excluir um país.",
        variant: "destructive"
      });
      return;
    }

    try {
      await api.deleteCountry(countryId, user.id);
      
      setState((prev) => {
        const updatedState = {
          ...prev,
          countries: prev.countries.filter((country) => country.id !== countryId),
        };
        
        // Resetar estados ativos se necessário
        if (prev.activeCountry === countryId) {
          updatedState.activeCountry = null;
          updatedState.activeCity = null;
          updatedState.activePage = null;
        }
        
        return updatedState;
      });

      toast({
        title: "País excluído",
        description: "O país e todas as suas cidades foram excluídos."
      });
    } catch (error) {
      console.error('Erro ao excluir país:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o país. Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  };

  const deleteCity = async (countryId: string, cityId: string) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para excluir uma cidade.",
        variant: "destructive"
      });
      return;
    }

    try {
      await api.deleteCity(cityId, user.id);
      
      setState((prev) => {
        const updatedState = {
          ...prev,
          countries: prev.countries.map((country) => {
            if (country.id === countryId) {
              return {
                ...country,
                cities: country.cities.filter((city) => city.id !== cityId),
                updatedAt: new Date().toISOString(),
              };
            }
            return country;
          }),
        };
        
        // Resetar estados ativos se necessário
        if (prev.activeCity === cityId) {
          updatedState.activeCity = null;
          updatedState.activePage = null;
        }
        
        return updatedState;
      });

      toast({
        title: "Cidade excluída",
        description: "A cidade e todas as suas memórias foram excluídas."
      });
    } catch (error) {
      console.error('Erro ao excluir cidade:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir a cidade. Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  };

  const deletePage = async (countryId: string, cityId: string, pageId: string) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para excluir uma página.",
        variant: "destructive"
      });
      return;
    }

    try {
      await api.deletePage(pageId, user.id);
      
      setState((prev) => {
        const updatedState = {
          ...prev,
          countries: prev.countries.map((country) => {
            if (country.id === countryId) {
              return {
                ...country,
                cities: country.cities.map((city) => {
                  if (city.id === cityId) {
                    return {
                      ...city,
                      pages: city.pages.filter((page) => page.id !== pageId),
                    };
                  }
                  return city;
                }),
                updatedAt: new Date().toISOString(),
              };
            }
            return country;
          }),
        };
        
        // Resetar página ativa se necessário
        if (prev.activePage === pageId) {
          updatedState.activePage = null;
        }
        
        return updatedState;
      });

      toast({
        title: "Página excluída",
        description: "A página foi excluída com sucesso."
      });
    } catch (error) {
      console.error('Erro ao excluir página:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir a página. Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  };

  return {
    createCountry,
    updateCountryNotes,
    createCity,
    createPage,
    updatePage,
    savePage,
    updatePageTitle,
    setActiveCountry,
    setActiveCity,
    setActivePage,
    deleteCountry,
    deleteCity,
    deletePage,
  };
}
