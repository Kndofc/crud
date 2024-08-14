import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';
import { Modal, Box, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import PessoaForm from '../components/PessoaForm';
import { Pessoa } from '../types';
import { fetchPessoas, deletePessoa } from '../services/pessoaService';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PessoaPage: React.FC = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [editPessoa, setEditPessoa] = useState<Pessoa | null>(null);
  const [open, setOpen] = useState(false);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchText, setSearchText] = useState('');
  const [filteredPessoas, setFilteredPessoas] = useState<Pessoa[]>([]);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditPessoa(null);
  };

  useEffect(() => {
    const getPessoas = async () => {
      const data = await fetchPessoas();
      setPessoas(data);
      setFilteredPessoas(data);
    };

    getPessoas();
  }, []);

  const handleSave = async () => {
    const data = await fetchPessoas();
    setPessoas(data);
    setFilteredPessoas(data);
    handleClose();
  };

  const handleDelete = async (id: number) => {
    setConfirmDeleteOpen(true);
    setSelectedRowId(id);
  };

  const confirmDelete = async () => {
    if (selectedRowId !== null) {
      await deletePessoa(selectedRowId);
      const updatedPessoas = pessoas.filter(pessoa => pessoa.id !== selectedRowId);
      setPessoas(updatedPessoas);
      setFilteredPessoas(updatedPessoas);
      setConfirmDeleteOpen(false);
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchText(searchValue);

    if (searchValue === '') {
      setFilteredPessoas(pessoas);
    } else {
      const filteredRows = pessoas.filter((row) => row.nome.toLowerCase().includes(searchValue));
      setFilteredPessoas(filteredRows);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nome', headerName: 'Nome', width: 200, editable: true },
    { field: 'cpf', headerName: 'CPF', width: 200 },
    {
      field: 'dataDeNascimento',
      headerName: 'Data de Nascimento',
      width: 200,
      type: 'date',
      valueGetter: (params: GridValueGetterParams) => new Date(params.row.dataDeNascimento),
    },
    { field: 'estaAtivo', headerName: 'Status', width: 120, type: 'boolean' },
    {
      field: 'telefones',
      headerName: 'Telefones',
      width: 400,
      renderCell: (params) => (
        <ul>
          {params.value.map((telefone: { id: number; tipo: string; numero: string }) => (
            <li key={telefone.id}>
              {telefone.tipo}: {telefone.numero}
            </li>
          ))}
        </ul>
      )
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<EditIcon />}
            onClick={() => { setEditPessoa(params.row); handleOpen(); }}
            sx={{
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#ff5252',
                transform: 'scale(1.05)',
              },
            }}
          >
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row.id)}
            sx={{
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#d32f2f',
                transform: 'scale(1.05)',
              },
              ml: 1,
            }}
          >
          </Button>
        </>
      )
    }
  ];

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Lista de Pessoas
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, width: '100%', maxWidth: '1200px' }}>
        <TextField
          label="Buscar por nome"
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
          sx={{ 
            flex: 1,
            backgroundColor: '#FFF',
            borderRadius: '8px',
            marginRight: '16px',
          }}
        />
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Adicionar Pessoa
        </Button>
      </Box>
      <div style={{ height: 700, width: '100%', maxWidth: '1200px' }}>
        <DataGrid
          rows={filteredPessoas}
          columns={columns}
          pagination
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          sx={{
            backgroundColor: 'white',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
            borderRadius: '16px',
            '& .MuiDataGrid-toolbarContainer': {
              backgroundColor: '#333',
              color: '#FFF',
              '& .MuiButton-root': {
                color: '#FFF',
                borderRadius: '8px',
              },
            },
          }}
        />
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 2, width: 400, margin: '0 auto', mt: 10 }}>
          <PessoaForm pessoaEditavel={editPessoa} onSave={handleSave} />
        </Box>
      </Modal>
      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle>Confirmação de Deleção</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja deletar este registro? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="error">
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PessoaPage;
