import React, { useEffect } from 'react';
import { AuthForm } from '@/components/AuthForm';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { user, loading } = useAuth();

  // Se já estiver autenticado, redirecionar para a página principal
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600">Diário de Viagens</h1>
          <p className="mt-2 text-gray-600">Acesse sua conta para gerenciar suas memórias de viagem</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <AuthForm />
        )}
      </div>
    </div>
  );
};

export default Login; 