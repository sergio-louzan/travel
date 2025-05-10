# Configuração do Supabase para o Diário de Viagens

Este guia explica como configurar o Supabase para ser usado como backend do aplicativo Diário de Viagens.

## 1. Criando um projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e faça login.
2. Clique em "New Project" e selecione uma organização.
3. Dê um nome ao seu projeto e uma senha segura para o banco de dados.
4. Escolha a região mais próxima de você para o servidor.
5. Aguarde a criação do projeto (pode levar alguns minutos).

## 2. Configurando o banco de dados

1. Após a criação do projeto, vá para a seção "SQL Editor" no painel lateral.
2. Clique em "New Query" e cole o conteúdo do arquivo `supabase/schema.sql`.
3. Execute a query para criar as tabelas e políticas de segurança.

## 3. Configurando a autenticação

1. Vá para a seção "Authentication" > "Providers".
2. Certifique-se de que "Email" está habilitado.
3. Em "Authentication" > "Email Templates", você pode personalizar os emails de confirmação e recuperação de senha.
4. Opcionalmente, você pode configurar provedores adicionais como Google, Facebook, etc.

## 4. Obtendo as credenciais de API

1. Vá para a seção "Settings" > "API".
2. Anote o "URL" e a "anon public key" (chave anônima pública).
3. Crie um arquivo `.env.local` na raiz do projeto com:

```
NEXT_PUBLIC_SUPABASE_URL=sua-url-do-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-do-supabase
```

## 5. Testando a conexão

1. Inicie o servidor de desenvolvimento: `npm run dev`.
2. Acesse a aplicação no navegador e tente realizar o login/registro.
3. Verifique na seção "Authentication" > "Users" do Supabase se os usuários estão sendo registrados corretamente.

## 6. Migrando dados existentes (opcional)

Se você já possui dados armazenados localmente, eles serão automaticamente migrados para o Supabase na primeira vez que o usuário fizer login após a configuração.

## Recursos adicionais

- [Documentação do Supabase](https://supabase.com/docs)
- [Guia de autenticação](https://supabase.com/docs/guides/auth)
- [Guia de banco de dados](https://supabase.com/docs/guides/database)
- [Exemplos de código](https://github.com/supabase/supabase/tree/master/examples) 