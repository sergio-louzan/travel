import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, User } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any, user: User | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  console.log("AuthProvider iniciado");
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider useEffect iniciado");
    // Verificar se há uma sessão ativa
    const getSession = async () => {
      setLoading(true);
      
      try {
        console.log("Tentando obter sessão do Supabase");
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Sessão obtida:", session ? "Existe uma sessão" : "Nenhuma sessão");
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Erro ao obter sessão:", error);
      } finally {
        setLoading(false);
      }

      try {
        // Configurar listener para alterações na autenticação
        console.log("Configurando listener de autenticação");
        const { data: { subscription } } = await supabase.auth.onAuthStateChange(
          (_event, session) => {
            console.log("Mudança no estado de autenticação:", _event);
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
          }
        );

        return () => {
          console.log("Cleanup do listener de autenticação");
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Erro ao configurar listener:", error);
      }
    };

    getSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log("Tentando fazer login com email:", email);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    console.log("Resultado do login:", error ? "Erro" : "Sucesso");
    return { error };
  };

  const signUp = async (email: string, password: string, name: string) => {
    console.log("Tentando registrar com email:", email);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
    
    console.log("Resultado do registro:", error ? "Erro" : "Sucesso");
    return { error, user: data?.user ?? null };
  };

  const signOut = async () => {
    console.log("Tentando fazer logout");
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    console.log("Tentando resetar senha para email:", email);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    console.log("Resultado do reset de senha:", error ? "Erro" : "Sucesso");
    return { error };
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 