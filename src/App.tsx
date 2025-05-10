import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import { JournalProvider } from "./contexts/JournalContext";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";

// Adicionar logs para depuração
console.log("App iniciando");
console.log("Variáveis de ambiente:", {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? "[REDACTED]" : "não definida"
});

const queryClient = new QueryClient();

const App = () => {
  console.log("Renderizando App");
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <JournalProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Landing page como página inicial */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route 
                  path="/app" 
                  element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  } 
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </JournalProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
