import { createRoot } from 'react-dom/client';
import './index.css';
import { router } from './router/router';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { CssBaseline } from '@mui/material';

createRoot(document.getElementById('root')!).render(
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<RouterProvider router={router} />
	</ThemeProvider>
);
