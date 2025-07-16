# Gerencie-Comercio Backend

Este projeto utiliza Node.js com Express para fornecer uma API RESTful modular, conectada a um banco SQLite via ORM (Sequelize). Estrutura inicial para os módulos: financeiro, estoque, clientes e permutas/trocas.

## Como iniciar

1. Instale as dependências:
   ```zsh
   cd backend
   npm install
   ```
2. Inicie o servidor:
   ```zsh
   npm start
   ```

## Estrutura de Pastas
- src/
  - modules/
    - financeiro/
    - estoque/
    - clientes/
    - permutas/

## Tecnologias
- Node.js
- Express.js
- Sequelize (ORM)
- SQLite
- JWT (autenticação)

## Próximos passos
- Implementar modelos e rotas para cada módulo.
- Criar autenticação básica.
- Documentar endpoints.
