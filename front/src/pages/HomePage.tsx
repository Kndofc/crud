import React from 'react';
import { Container, Typography } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Container sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Bem-vindo ao CRUD de Pessoas
      </Typography>
      <Typography variant="body1">
        Navegue para a página de pessoas para gerenciar os registros.
      </Typography>
    </Container>
  );
};

export default HomePage;
