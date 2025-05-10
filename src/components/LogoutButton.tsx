import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface LogoutButtonProps {
  className?: string;
  variant?: 'default' | 'ghost' | 'outline' | 'secondary' | 'destructive' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showIcon?: boolean;
  showText?: boolean;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  className = '',
  variant = 'ghost',
  size = 'default',
  showIcon = true,
  showText = true
}) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: 'Desconectado',
        description: 'Você foi desconectado com sucesso',
      });
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível desconectar. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Button 
      onClick={handleLogout} 
      variant={variant} 
      size={size}
      className={className}
    >
      {showIcon && <LogOut className="h-4 w-4 mr-2" />}
      {showText && 'Sair'}
    </Button>
  );
};

export default LogoutButton; 