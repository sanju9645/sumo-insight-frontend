import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";

import './index.css';
import AppRoutes from './AppRoutes';
import { ThemeProvider } from "./components/theme/ThemeProvider";
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate';

/* 
* This configuration ensures that queries will not automatically refetch when the browser window regains focus, which can be useful to control unnecessary network requests.
*/
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderWithNavigate>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AppRoutes />
          </ThemeProvider>

          <Toaster visibleToasts={1} position="top-right" richColors />
        </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </Router>
  </StrictMode>,
)
