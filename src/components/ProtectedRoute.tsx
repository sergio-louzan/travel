import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Mostrar algum indicador de carregamento enquanto verifica a autenticação
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    // Redirecionar para a página de login se não estiver autenticado
    return <Navigate to="/login" replace />;
  }

  // Renderizar o componente filho se estiver autenticado
  return <>{children}</>;
};

export default ProtectedRoute; 