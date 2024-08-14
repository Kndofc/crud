import React, { useState, useEffect, ChangeEvent } from 'react';
import { TextField, Button, Box, InputAdornment, Select, MenuItem, Grid } from '@mui/material';
import { Pessoa } from '../types';
import { createPessoa, updatePessoa } from '../services/pessoaService';
import { SelectChangeEvent } from '@mui/material/Select';

interface Telefone {
  tipo: string;
  numero: string;
}

interface PessoaFormProps {
  pessoaEditavel: Pessoa | null;
  onSave: () => void;
}

const PessoaForm: React.FC<PessoaFormProps> = ({ pessoaEditavel, onSave }) => {
  const [pessoa, setPessoa] = useState<Pessoa>({
    nome: '',
    cpf: '',
    dataDeNascimento: '',
    estaAtivo: true,
    telefones: [{ tipo: 'Celular', numero: '' }],
  });

  useEffect(() => {
    if (pessoaEditavel) {
      setPessoa(pessoaEditavel);
    }
  }, [pessoaEditavel]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPessoa({
      ...pessoa,
      [e.target.name]: e.target.value,
    });
  };

  const handleTelefoneChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const newTelefones = [...pessoa.telefones];
    newTelefones[index] = {
      ...newTelefones[index],
      [e.target.name!]: e.target.value as string,
    };
    setPessoa({
      ...pessoa,
      telefones: newTelefones,
    });
  };

  const addTelefone = () => {
    setPessoa({
      ...pessoa,
      telefones: [...pessoa.telefones, { tipo: 'Celular', numero: '' }],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pessoa.id) {
      await updatePessoa(pessoa.id, pessoa);
    } else {
      await createPessoa(pessoa);
    }
    onSave();
  };

  const formatCPF = (cpf: string) => {
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Nome"
        name="nome"
        value={pessoa.nome}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="CPF"
        name="cpf"
        value={formatCPF(pessoa.cpf)}
        onChange={handleChange}
        required
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">CPF:</InputAdornment>,
        }}
      />
      <TextField
        label="Data de Nascimento"
        name="dataDeNascimento"
        type="date"
        value={pessoa.dataDeNascimento}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
        fullWidth
      />
      <Button type="button" onClick={addTelefone} variant="outlined" sx={{ mt: 2 }}>
        Adicionar Telefone
      </Button>
      {pessoa.telefones.map((telefone, index) => (
        <Grid container spacing={2} key={index} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Select
              label="Tipo"
              name="tipo"
              value={telefone.tipo}
              onChange={(e) => handleTelefoneChange(index, e)}
              required
              fullWidth
              variant="outlined"
            >
              <MenuItem value="Celular">Celular</MenuItem>
              <MenuItem value="Residencial">Residencial</MenuItem>
              <MenuItem value="Comercial">Comercial</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Número"
              name="numero"
              value={telefone.numero}
              onChange={(e) => handleTelefoneChange(index, e)}
              required
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
      ))}
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Salvar
      </Button>
    </Box>
  );
};

export default PessoaForm;
