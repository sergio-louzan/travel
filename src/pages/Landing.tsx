import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe, MapPin, Book, Image, Users, Star, ArrowRight } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm py-6 px-4 md:px-8 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Globe className="h-6 w-6 text-primary-600 mr-2" />
            <h1 className="text-2xl font-bold text-primary-600">Diário de Viagens</h1>
          </div>
          <Button 
            onClick={() => navigate('/login')}
            variant="default"
            size="sm"
            className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600"
          >
            Entrar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Documente suas viagens com estilo
              </h1>
              <p className="mt-6 text-xl text-gray-600">
                Registre, organize e reviva seus melhores momentos em diferentes cidades pelo mundo.
              </p>
              <div className="mt-10 space-x-4">
                <Button 
                  onClick={() => navigate('/login')}
                  className="bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/30 px-8 py-6 text-lg"
                >
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#9E7AFF] to-[#FE8BBB] rounded-lg blur-lg opacity-75"></div>
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Diário de viagens aberto" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Registre suas memórias pelo mundo</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow p-6 border border-gray-100">
              <div className="p-3 bg-primary-50 rounded-lg w-fit mb-4">
                <MapPin className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Organize por país e cidade</h3>
              <p className="text-gray-600">
                Categorize suas notas por países e cidades visitadas para fácil acesso.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow p-6 border border-gray-100">
              <div className="p-3 bg-primary-50 rounded-lg w-fit mb-4">
                <Book className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Notas detalhadas</h3>
              <p className="text-gray-600">
                Registre suas experiências, dicas, lugares favoritos e momentos inesquecíveis.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow p-6 border border-gray-100">
              <div className="p-3 bg-primary-50 rounded-lg w-fit mb-4">
                <Image className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Galerias de fotos</h3>
              <p className="text-gray-600">
                Adicione fotos às suas notas para recordar visualmente cada momento.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow p-6 border border-gray-100">
              <div className="p-3 bg-primary-50 rounded-lg w-fit mb-4">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Conta pessoal</h3>
              <p className="text-gray-600">
                Acesse suas notas de qualquer dispositivo com sua conta segura.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow p-6 border border-gray-100">
              <div className="p-3 bg-primary-50 rounded-lg w-fit mb-4">
                <Star className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Avaliações</h3>
              <p className="text-gray-600">
                Classifique e avalie lugares para lembrar suas experiências favoritas.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow p-6 border border-gray-100">
              <div className="p-3 bg-primary-50 rounded-lg w-fit mb-4">
                <Globe className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Histórico de viagens</h3>
              <p className="text-gray-600">
                Visualize todas suas viagens em um mapa interativo e linha do tempo.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial/Showcase Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative p-10 bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9E7AFF] to-[#FE8BBB]"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Suas memórias merecem um lugar especial</h2>
                <p className="text-gray-600 mb-6">
                  Organize todas as suas aventuras em um só lugar. Nunca mais esqueça aquele restaurante incrível, o hotel aconchegante ou a trilha com vista deslumbrante.
                </p>
                <Button 
                  onClick={() => navigate('/login')}
                  className="bg-gradient-to-r from-[#9E7AFF] to-[#FE8BBB] hover:opacity-90 text-white border-0 mt-4"
                >
                  Comece seu diário
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#9E7AFF]/10 to-[#FE8BBB]/10 rounded-lg"></div>
                <img 
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Exploração de viagem" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-primary-600 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para começar a documentar suas viagens?</h2>
          <p className="text-xl text-primary-100 mb-10 max-w-3xl mx-auto">
            Junte-se a milhares de viajantes que já estão criando memórias duradouras em nosso diário de viagens digital.
          </p>
          <Button 
            onClick={() => navigate('/login')}
            size="lg"
            className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-7 text-lg font-medium"
          >
            Criar sua conta agora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Globe className="h-6 w-6 text-primary-500 mr-2" />
              <h2 className="text-xl font-bold text-white">Diário de Viagens</h2>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white"
              >
                Sobre nós
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white"
              >
                Contato
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white"
              >
                Termos de uso
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white"
              >
                Privacidade
              </Button>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Diário de Viagens. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 