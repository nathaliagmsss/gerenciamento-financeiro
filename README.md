# 💼 Sistema de Gerenciamento de Clientes e Ativos Financeiros

Este projeto é uma aplicação fullstack desenvolvida para um escritório de investimentos. Ela permite o cadastro e a visualização de clientes, bem como a exibição de ativos financeiros alocados a cada cliente.

## 🧩 Tecnologias Utilizadas

### Backend
- Node.js + TypeScript
- Fastify (framework HTTP)
- Prisma ORM
- Zod (validação)
- MySQL (via Docker)
- Docker Compose

### Frontend
- Next.js + TypeScript
- React Query (busca de dados)
- React Hook Form + Zod (formulários e validações)
- ShadCN UI (interface)

---

## 🚀 Funcionalidades

### ✅ Clientes
- Cadastro, listagem e edição de clientes (nome, email, status ativo/inativo)

### ✅ Ativos
- Exibição de uma lista fixa de ativos financeiros (nome e valor)
- Visualização das alocações de ativos para cada cliente

---

## 🐳 Como rodar com Docker

### 1. Pré-requisitos
- Docker e Docker Compose instalados

### 2. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz com as variáveis:

```env
MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=
```

E um `.env` dentro da pasta `backend/` com:

```env
DATABASE_URL=mysql://{MYSQL_USER}:{MYSQL_PASSWORD}@db:3306/{MYSQL_DATABASE}
```

### 4. Subir os containers
```bash
docker-compose up --build
```

A aplicação backend estará rodando em: [http://localhost:3333](http://localhost:3333)  
O frontend (Next.js) estará em: [http://localhost:3000](http://localhost:3000) *(se iniciado manualmente com `npm run dev` dentro da pasta `frontend`)*

---

## 🛠 Scripts úteis

### Backend

Dentro da pasta `backend/`:

```bash
# Instalar dependências
npm install

# Aplicar migrações
npx prisma migrate dev

# Rodar servidor
npm run dev
```

### Frontend

Dentro da pasta `frontend/`:

```bash
# Instalar dependências
npm install

# Rodar frontend
npm run dev
```

---

## 📁 Estrutura de Pastas

```
.
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── Dockerfile
│   └── .env
├── frontend/
│   ├── app/
│   ├── components/
│   └── ...
├── docker-compose.yml
├── .env
└── README.md
```

---

## ✍️ Autoria

Desenvolvido por [Nathália Gomes](https://github.com/nathaliagmsss) como parte de um case técnico para estágio.

---

## 🧪 Requisitos atendidos

✅ Cadastro e listagem de clientes  
✅ Visualização de alocações por cliente  
✅ Exibição de ativos financeiros fixos  
✅ Uso de TypeScript em toda a aplicação  
✅ Interface funcional com ShadCN  
✅ Backend e banco via Docker Compose  
✅ Uso de Prisma, React Query, Zod, React Hook Form  
