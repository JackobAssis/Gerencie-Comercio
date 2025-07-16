
# Gerencie-Comercio

Sistema de Gerenciamento para Comércio Informal

## Visão Geral
O Gerencie-Comercio é uma solução completa para empreendedores informais, permitindo o controle financeiro, gestão de estoque, relacionamento com clientes e gerenciamento inovador de permutas/trocas. O objetivo é simplificar a administração do negócio, otimizar recursos e facilitar decisões estratégicas.

## Estrutura do Projeto

- **backend/**: API RESTful em Node.js (Express, Sequelize, SQLite)
- **frontend/**: Aplicação web em React (PWA, responsiva)

## Módulos Principais

### 1. Gestão Financeira
- Registro de receitas e despesas
- Relatórios de fluxo de caixa, lucros e perdas
- Categorização e análise financeira

### 2. Gestão de Estoque
- Cadastro de produtos
- Controle de entradas, saídas e devoluções
- Alerta de estoque mínimo
- Inventário e relatórios de movimentação

### 3. Gestão de Clientes (CRM)
- Cadastro de clientes
- Histórico de compras
- Notas e preferências
- Comunicação facilitada

### 4. Permutas e Trocas
- Registro de permutas de produtos/serviços
- Valor equivalente para análise
- Histórico detalhado de trocas
- Impacto opcional no estoque e finanças

## Tecnologias Utilizadas
- **Backend:** Node.js, Express, Sequelize, SQLite, JWT
- **Frontend:** React, PWA, Fetch API
- **Banco de Dados:** SQLite (prototipagem)

## Como Executar

### Backend
```zsh
cd backend
npm install
npm start
```
O backend roda por padrão na porta 3001.

### Frontend
```zsh
cd frontend
npm install
npm start
```
Acesse http://localhost:3000 no navegador.

## Funcionalidades
- Autenticação JWT para segurança
- Interface intuitiva e responsiva
- Cadastro, consulta, edição e remoção de dados
- Relatórios básicos e navegação por módulos

## Estrutura de Pastas
- `/backend`: código da API, modelos, rotas, autenticação
- `/frontend`: código React, componentes, páginas dos módulos

## Requisitos Não Funcionais
- Usabilidade e acessibilidade
- Segurança dos dados
- Desempenho e confiabilidade
- Escalabilidade e manutenibilidade

## Contribuição
Pull requests são bem-vindos! Siga o padrão de código e documente suas alterações.

## Licença
MIT