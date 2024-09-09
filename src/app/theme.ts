'use client';
import { createTheme, ThemeOptions } from '@mui/material/styles';


const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#42b883',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
};

const theme = createTheme(themeOptions);

export default theme;
