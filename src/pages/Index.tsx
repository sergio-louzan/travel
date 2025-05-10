import React, { useState } from 'react';
import { JournalProvider } from '@/contexts/JournalContext';
import Sidebar from '@/components/Sidebar';
import ContentArea from '@/components/ContentArea';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Menu, Globe } from 'lucide-react';
import LogoutButton from '@/components/LogoutButton';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(false);
  const { user } = useAuth();

  return (
    <JournalProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <header className="bg-white shadow-sm py-6 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary-600">Diário de Viagens</h1>
              <p className="text-sm text-gray-600">Documente suas aventuras e memórias de diferentes cidades</p>
            </div>
            <div className="flex items-center gap-2">
              {user && (
                <div className="hidden md:flex items-center mr-4">
                  <span className="text-sm text-gray-600 mr-2">
                    {user.email}
                  </span>
                  <LogoutButton variant="outline" size="sm" />
                </div>
              )}
              {isMobile && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="md:hidden"
                  onClick={() => setShowSidebar(!showSidebar)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </header>
        
        <main className="flex-1 w-full mx-auto px-4 md:px-8 py-6 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar - escondido em mobile por padrão, exibido quando showSidebar é true */}
            {(isMobile && showSidebar) ? (
              <div className="fixed inset-0 z-50 bg-white">
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="font-semibold text-lg">Suas Viagens</h2>
                    <div className="flex items-center gap-2">
                      {user && <LogoutButton size="sm" variant="outline" className="mr-2" />}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setShowSidebar(false)}
                      >
                        ✕
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto p-4">
                    <Sidebar onClose={() => setShowSidebar(false)} />
                  </div>
                </div>
              </div>
            ) : !isMobile && (
              <div className="w-full md:w-1/4 lg:w-1/5 sticky top-4 self-start">
                <Sidebar />
              </div>
            )}
            
            <div className={`${isMobile ? 'w-full' : 'md:w-3/4 lg:w-4/5'}`}>
              <ContentArea />
            </div>
          </div>
        </main>

        <footer className="mt-6 py-4 text-center text-sm text-gray-500">
          <p>Diário de Viagens - Documente aventuras do mundo todo</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Globe className="h-4 w-4" />
            <span>Explore. Lembre. Compartilhe.</span>
          </div>
        </footer>
      </div>
    </JournalProvider>
  );
};

export default Index;
