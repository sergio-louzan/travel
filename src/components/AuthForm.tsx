import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

type AuthMode = 'login' | 'register' | 'forgot-password';

export function AuthForm() {
  const { signIn, signUp, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password);
        if (error) throw error;
      } else if (mode === 'register') {
        const { error } = await signUp(email, password, name);
        if (error) throw error;
        
        toast({
          title: 'Conta criada com sucesso',
          description: 'Verifique seu e-mail para confirmar seu cadastro.',
        });
        
        setMode('login');
      } else if (mode === 'forgot-password') {
        const { error } = await resetPassword(email);
        if (error) throw error;
        
        toast({
          title: 'E-mail enviado',
          description: 'Verifique seu e-mail para redefinir sua senha.',
        });
        
        setMode('login');
      }
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Ocorreu um erro durante a autenticação.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {mode === 'login' ? 'Entrar' : mode === 'register' ? 'Criar Conta' : 'Recuperar Senha'}
        </CardTitle>
        <CardDescription className="text-center">
          {mode === 'login'
            ? 'Digite suas credenciais para acessar seu diário de viagens'
            : mode === 'register'
            ? 'Crie uma nova conta para começar seu diário de viagens'
            : 'Digite seu e-mail para receber instruções de recuperação de senha'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                required
                disabled={loading}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              disabled={loading}
            />
          </div>
          
          {mode !== 'forgot-password' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                {mode === 'login' && (
                  <Button 
                    type="button" 
                    variant="link" 
                    className="px-0 text-xs"
                    onClick={() => setMode('forgot-password')}
                    disabled={loading}
                  >
                    Esqueceu a senha?
                  </Button>
                )}
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                disabled={loading}
              />
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col">
          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Carregando...' : 
              mode === 'login' 
                ? 'Entrar' 
                : mode === 'register' 
                  ? 'Registrar' 
                  : 'Enviar instruções'}
          </Button>
          
          <div className="mt-4 text-center text-sm">
            {mode === 'login' ? (
              <span>
                Não tem uma conta?{' '}
                <Button 
                  type="button" 
                  variant="link" 
                  className="p-0" 
                  onClick={() => setMode('register')}
                  disabled={loading}
                >
                  Registre-se
                </Button>
              </span>
            ) : (
              <span>
                Já tem uma conta?{' '}
                <Button 
                  type="button" 
                  variant="link" 
                  className="p-0" 
                  onClick={() => setMode('login')}
                  disabled={loading}
                >
                  Entrar
                </Button>
              </span>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  );
} 