
import React, { useState, useEffect } from 'react';
import { useJournal } from '@/contexts/JournalContext';
import PageItem from './PageItem';
import RichTextEditor from './RichTextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Save, Edit, ArrowLeft, MapPin, Calendar, X } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import CountryNotes from './CountryNotes';

const ContentArea: React.FC = () => {
  const { 
    activeCountry, activeCity, activePage, 
    createPage, savePage, updatePage, 
    updatePageTitle, setActiveCity, setActivePage 
  } = useJournal();
  
  const [newPageTitle, setNewPageTitle] = useState('');
  const [isCreatingPage, setIsCreatingPage] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [showPagesList, setShowPagesList] = useState(true);
  const [pageContent, setPageContent] = useState('');
  const [isEdited, setIsEdited] = useState(false);
  const isMobile = useIsMobile();

  // Update pageContent when activePage changes
  useEffect(() => {
    if (activePage) {
      setPageContent(activePage.content);
      setIsEdited(false);
    }
  }, [activePage]);

  const handleCreatePage = () => {
    if (!activeCountry || !activeCity) return;
    createPage(activeCountry.id, activeCity.id, newPageTitle);
    setNewPageTitle('');
    setIsCreatingPage(false);
    if (isMobile) setShowPagesList(false);
  };

  const handleUpdateTitle = () => {
    if (!activeCountry || !activeCity || !activePage) return;
    updatePageTitle(activeCountry.id, activeCity.id, activePage.id, editedTitle);
    setIsEditingTitle(false);
  };

  const handleSavePage = () => {
    if (!activeCountry || !activeCity || !activePage) return;
    savePage(activeCountry.id, activeCity.id, activePage.id, pageContent);
    setIsEdited(false);
  };

  const startEditingTitle = () => {
    if (!activePage) return;
    setEditedTitle(activePage.title);
    setIsEditingTitle(true);
  };

  const handlePageSelect = (pageId: string) => {
    setActivePage(pageId);
    if (isMobile) {
      setShowPagesList(false);
    }
  };

  const handleBackToPages = () => {
    if (isMobile) {
      setShowPagesList(true);
    }
  };

  // Welcome screen when no country is selected
  if (!activeCountry) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <Card className="p-6 max-w-md text-center shadow-lg">
          <div className="bg-primary-50 rounded-full p-6 inline-block mx-auto mb-4">
            <span className="text-primary-600 text-3xl">✈️</span>
          </div>
          <h2 className="text-xl font-semibold mb-4 text-primary-600">Bem-vindo ao seu Diário de Viagens</h2>
          <p className="text-muted-foreground mb-6">
            Selecione um país existente ou crie um novo para começar a registrar suas memórias de viagem.
          </p>
          <p className="text-sm text-muted-foreground">
            Todas as suas anotações são salvas automaticamente no navegador.
          </p>
        </Card>
      </div>
    );
  }

  // Display country notes when no city is selected
  if (!activeCity) {
    return <CountryNotes />;
  }
  
  // Generate a color based on city name
  const getColorClass = () => {
    const colors = ['amber', 'emerald', 'blue', 'purple', 'pink'];
    const hash = activeCity.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
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

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4">
        {showPagesList ? (
          <>
            <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 w-8 p-0 mr-2"
                    onClick={() => {
                      setActiveCity(null);
                    }}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-2">
                    <MapPin className={cn(colorClasses[colorName].bg, "h-5 w-5")} />
                    <h2 className="text-xl font-semibold">{activeCity.name}</h2>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
                    onClick={() => {
                      if (confirm(`Deseja realmente excluir a cidade "${activeCity.name}" e todas as suas memórias?`)) {
                        // Lógica de exclusão
                      }
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">Notas e memórias da sua viagem para {activeCity.name}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Criado: {format(new Date(activeCity.createdAt), 'PP', { locale: ptBR })}</span>
                </div>
                <Button 
                  onClick={() => setIsCreatingPage(true)} 
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Nova Memória</span>
                </Button>
              </div>
            </div>

            {isCreatingPage && (
              <div className="bg-white rounded-xl shadow-md p-4 mb-4">
                <h3 className="font-medium mb-2">Criar Nova Memória</h3>
                <Input
                  type="text"
                  value={newPageTitle}
                  onChange={(e) => setNewPageTitle(e.target.value)}
                  placeholder="Título da memória"
                  autoFocus
                  className="mb-3"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCreatePage();
                    else if (e.key === 'Escape') {
                      setIsCreatingPage(false);
                      setNewPageTitle('');
                    }
                  }}
                />
                <div className="flex space-x-2">
                  <Button onClick={handleCreatePage} className="bg-primary-600 hover:bg-primary-700 flex-1">
                    Criar
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCreatingPage(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 gap-4">
              {activeCity.pages.length === 0 ? (
                <div className="text-center p-8 bg-white rounded-xl shadow-md">
                  <div className="bg-primary-50 rounded-full p-6 inline-block mx-auto mb-4">
                    <span className="text-primary-600 text-3xl">📝</span>
                  </div>
                  <h3 className="font-medium mb-2">Nenhuma memória ainda</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Comece a criar memórias da sua viagem para {activeCity.name}.
                  </p>
                  <Button 
                    onClick={() => setIsCreatingPage(true)}
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Nova Memória
                  </Button>
                </div>
              ) : (
                activeCity.pages.map((page) => (
                  <PageItem 
                    key={page.id} 
                    page={page} 
                    countryId={activeCountry.id}
                    cityId={activeCity.id} 
                    onClick={() => handlePageSelect(page.id)}
                  />
                ))
              )}
            </div>
          </>
        ) : (
          // Página de conteúdo em mobile
          <>
            {activePage ? (
              <>
                <div className="bg-white rounded-xl shadow-md p-4 mb-4 flex items-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleBackToPages}
                    className="mr-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  {isEditingTitle ? (
                    <div className="flex flex-1 space-x-2">
                      <Input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        autoFocus
                        className="flex-1"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleUpdateTitle();
                          else if (e.key === 'Escape') setIsEditingTitle(false);
                        }}
                      />
                      <Button size="sm" onClick={handleUpdateTitle}>
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-lg font-semibold flex-1 truncate">{activePage.title}</h2>
                      <Button variant="ghost" size="sm" onClick={startEditingTitle}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>

                <div className="bg-white rounded-xl shadow-md p-4">
                  <RichTextEditor
                    content={pageContent}
                    onChange={(content) => {
                      setPageContent(content);
                      setIsEdited(true);
                      updatePage(activeCountry.id, activeCity.id, activePage.id, content);
                    }}
                  />
                  
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-xs text-gray-500">
                      Última atualização: {format(new Date(activePage.updatedAt), 'PPpp', { locale: ptBR })}
                    </p>
                    
                    {isEdited && (
                      <Button 
                        size="sm" 
                        onClick={handleSavePage}
                        className="bg-primary-600 hover:bg-primary-700"
                      >
                        <Save className="h-4 w-4 mr-1" /> Salvar
                      </Button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleBackToPages}
                  className="self-start mb-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
                </Button>
                <div className="bg-primary-50 rounded-full p-6 inline-block mx-auto mb-4">
                  <span className="text-primary-600 text-3xl">📝</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Nenhuma página selecionada</h3>
                <p className="text-gray-500 mb-4">
                  Selecione uma memória existente ou crie uma nova para começar a escrever.
                </p>
                <Button onClick={() => setIsCreatingPage(true)} className="bg-primary-600 hover:bg-primary-700">
                  <Plus className="h-4 w-4 mr-2" /> Nova Memória
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // Versão desktop
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0 mr-2"
              onClick={() => {
                setActiveCity(null);
              }}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <MapPin className={cn(colorClasses[colorName].bg, "h-5 w-5")} />
              <h2 className="text-xl font-semibold">{activeCity.name}</h2>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="ghost"
              size="sm"
              className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
              onClick={() => {
                if (confirm(`Deseja realmente excluir a cidade "${activeCity.name}" e todas as suas memórias?`)) {
                  // Lógica de exclusão
                }
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">Notas e memórias da sua viagem para {activeCity.name}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>Criado: {format(new Date(activeCity.createdAt), 'PP', { locale: ptBR })}</span>
          </div>
          <Button 
            onClick={() => setIsCreatingPage(true)} 
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            <span>Nova Memória</span>
          </Button>
        </div>
      </div>

      {isCreatingPage && (
        <div className="bg-white rounded-xl shadow-md p-4 mb-4">
          <h3 className="font-medium mb-2">Criar Nova Memória</h3>
          <Input
            type="text"
            value={newPageTitle}
            onChange={(e) => setNewPageTitle(e.target.value)}
            placeholder="Título da memória"
            autoFocus
            className="mb-3"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreatePage();
              else if (e.key === 'Escape') {
                setIsCreatingPage(false);
                setNewPageTitle('');
              }
            }}
          />
          <div className="flex space-x-2">
            <Button onClick={handleCreatePage} className="bg-primary-600 hover:bg-primary-700 flex-1">
              Criar
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsCreatingPage(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {activePage ? (
        <div className="bg-white rounded-xl shadow-md p-6 mb-4">
          <div className="flex items-center justify-between mb-6">
            {isEditingTitle ? (
              <div className="flex flex-1 space-x-2">
                <Input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  autoFocus
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleUpdateTitle();
                    else if (e.key === 'Escape') setIsEditingTitle(false);
                  }}
                />
                <Button onClick={handleUpdateTitle}>
                  <Save className="h-4 w-4 mr-2" /> Salvar
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold">{activePage.title}</h2>
                <Button variant="ghost" size="sm" onClick={startEditingTitle}>
                  <Edit className="h-4 w-4 mr-1" /> Editar título
                </Button>
              </>
            )}
          </div>

          <RichTextEditor
            content={pageContent}
            onChange={(content) => {
              setPageContent(content);
              setIsEdited(true);
              updatePage(activeCountry.id, activeCity.id, activePage.id, content);
            }}
          />
          
          <div className="flex justify-between items-center mt-4">
            <p className="text-xs text-gray-500">
              Última atualização: {format(new Date(activePage.updatedAt), 'PPpp', { locale: ptBR })}
            </p>
            
            {isEdited && (
              <Button 
                onClick={handleSavePage}
                className="bg-primary-600 hover:bg-primary-700"
              >
                <Save className="h-4 w-4 mr-2" /> Salvar Alterações
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeCity.pages.length === 0 ? (
            <div className="col-span-full text-center p-8 bg-white rounded-xl shadow-md">
              <div className="bg-primary-50 rounded-full p-6 inline-block mx-auto mb-4">
                <span className="text-primary-600 text-3xl">📝</span>
              </div>
              <h3 className="font-medium mb-2">Nenhuma memória ainda</h3>
              <p className="text-sm text-gray-500 mb-4">
                Comece a criar memórias da sua viagem para {activeCity.name}.
              </p>
              <Button 
                onClick={() => setIsCreatingPage(true)}
                className="bg-primary-600 hover:bg-primary-700"
              >
                <Plus className="h-4 w-4 mr-2" /> Nova Memória
              </Button>
            </div>
          ) : (
            activeCity.pages.map((page) => (
              <PageItem 
                key={page.id} 
                page={page} 
                countryId={activeCountry.id}
                cityId={activeCity.id} 
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ContentArea;

// Função de utilitário que é usada no componente
const cn = (...classes: any[]) => {
  return classes.filter(Boolean).join(' ');
};
