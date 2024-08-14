# CrudLar

Este projeto é uma aplicação completa de CRUD para gerenciar pessoas, com backend em .NET Core e frontend em React utilizando Material-UI para estilização. O sistema permite criar, ler, atualizar e deletar registros de pessoas, incluindo informações como nome, CPF, data de nascimento e números de telefone. A aplicação também inclui funcionalidades adicionais como pesquisa, filtros, paginação e confirmação de ações críticas.

## Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Testes](#testes)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Funcionalidades

- **CRUD Completo**: Gerenciamento de registros de pessoas.
- **Pesquisa e Filtros**: Pesquisa dinâmica por nome e filtros avançados.
- **Paginação**: Paginação robusta para lidar com grandes quantidades de dados.
- **Validação de Dados**: Validação no frontend e backend utilizando FluentValidation.
- **Confirmação de Ação**: Diálogos de confirmação para ações críticas como exclusão de registros.
- **Feedback Visual**: Mensagens de sucesso e erro para ações do usuário.
- **Responsividade**: Layout responsivo para diferentes tamanhos de tela e dispositivos.

## Tecnologias Utilizadas

### Backend
- **.NET Core 6+**: Framework principal do backend.
- **Entity Framework Core**: ORM utilizado para gerenciamento do banco de dados.
- **FluentValidation**: Validação de dados no backend.
- **AutoMapper**: Mapeamento de objetos.
- **XUnit**: Framework de testes unitários.
- **SQL Server**: Banco de dados utilizado.

### Frontend
- **React**: Biblioteca JavaScript para criação de interfaces de usuário.
- **Material-UI (MUI)**: Biblioteca de componentes para estilização.
- **Axios**: Cliente HTTP para realizar requisições à API.
- **TypeScript**: Linguagem utilizada para tipagem estática.

## Instalação

### Pré-requisitos

- [.NET Core SDK 6+](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) e npm (Node Package Manager)
- [SQL Server](https://www.microsoft.com/sql-server)

### Clonando o Repositório

```bash
git clone https://github.com/seu-usuario/CrudLar.git
cd CrudLar
```
## Configuração

### Backend

1. **Configuração do Banco de Dados**:
   - Atualize a string de conexão no arquivo `appsettings.json` localizado na pasta `CRUD` com suas credenciais do SQL Server.

   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=.;Database=CrudLarDB;Trusted_Connection=True;MultipleActiveResultSets=true"
     }
   }
   ```
   ### Frontend

2. **Instalar Dependências**:
   - Navegue até a pasta `frontend` e execute:

   ```bash
   npm install
``
3. **Configurar API**:
  - Navegue até a pasta `services` e altere a baseURL para a da sua API.

4. **Rodar**:
  - Para rodar será necessário executar o comando:
    ``
   npm start
``
