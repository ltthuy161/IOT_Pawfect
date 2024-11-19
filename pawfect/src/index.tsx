import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { theme } from './theme/theme.ts';
import { ThemeProvider } from '@mui/material';
import BreakpointsProvider from './providers/BreakpointsProvider.tsx';
import router from './routes/router.tsx';
import { AuthContextProvider } from './context/AuthContext.tsx'
import ProtectRouter from './routes/protectedRoute.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BreakpointsProvider>
          <AuthContextProvider>
              <ProtectRouter> 
                 <RouterProvider router={router} />
              </ProtectRouter>
          </AuthContextProvider>
      </BreakpointsProvider>
    </ThemeProvider>
  </React.StrictMode>,
  );
