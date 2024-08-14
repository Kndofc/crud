import { createTheme } from '@mui/material/styles';
import { red, yellow, green, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: yellow[700],
    },
    secondary: {
      main: red[700],
    },
    success: {
      main: green[700],
    },
    warning: {
      main: purple[700],
    },
    background: {
      default: 'rgba(255, 255, 255, 0.8)',
      paper: 'rgba(255, 255, 255, 0.9)',
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#444',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#555',
    },
    body1: {
      fontSize: '1rem',
      color: '#333',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          borderRadius: '16px',
        },
      },
    },
  },
});

export default theme;
