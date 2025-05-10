import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

// Usar chaves fixas para teste - você deve substituir por variáveis de ambiente em produção
const supabaseUrl = "https://uprrolhueshthnhnpsyk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwcnJvbGh1ZXNodGhuaG5wc3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4OTU3ODMsImV4cCI6MjA2MjQ3MTc4M30.-e7RJDpYpKrYiusmeZIeBsEC1A2e5Oj6HZAp1_nqtgc";

console.log("Inicializando cliente Supabase para testes");

// Criando o cliente do Supabase
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Tipos para o Supabase Auth
export type User = {
  id: string;
  email?: string;
  user_metadata?: {
    name?: string;
  };
}; 