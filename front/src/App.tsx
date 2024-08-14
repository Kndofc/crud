import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import PessoaPage from './pages/PessoaPage';
import { GlobalStyle } from './styles/globalStyles';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <PessoaPage />
    </ThemeProvider>
  );
};

export default App;