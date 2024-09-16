// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import './index.css';
import { CssBaseline } from '@mui/material';
import AppProvider from './router/router';
import { Provider } from 'react-redux';
import store from './store/store';


createRoot(document.getElementById('root')!).render(
  
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <AppProvider />
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  
);
