import { Pessoa } from '../types';
import api from './apiconfig';

export const fetchPessoas = async () => {
  const response = await api.get<Pessoa[]>('/pessoas');
  return response.data;
};

export const createPessoa = async (pessoa: Pessoa) => {
  const response = await api.post('/pessoas', pessoa);
  return response.data;
};

export const updatePessoa = async (id: number, pessoa: Pessoa) => {
    const response = await api.put(`/pessoas/${id}`, pessoa);
    return response.data;
  };
export const deletePessoa = async (id: number) => {
  const response = await api.delete(`/pessoas/${id}`);
  return response.data;
};
