export interface Telefone {
  id?: number;
  tipo: string;
  numero: string;
  pessoaId?: number;
}

export interface Pessoa {
  id?: number;
  nome: string;
  cpf: string;
  dataDeNascimento: string;
  estaAtivo: boolean;
  telefones: Telefone[];
}
