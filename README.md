# 📝 Notes System - Desafio Full Stack

Sistema completo de gerenciamento de notas com API RESTful (Laravel) e interface web (React + TypeScript).

---

## 🚀 Tecnologias Utilizadas

### Backend
- **PHP 8.3** com **Laravel 11**
- **SQLite** (banco de dados)
- **Eloquent ORM**
- **PHPUnit** (testes automatizados)

### Frontend
- **React 18** com **TypeScript**
- **Vite** (build tool)
- **Axios** (requisições HTTP)
- **date-fns** (manipulação de datas)
- **CSS3** (estilização customizada)

### DevOps
- **Docker** e **Docker Compose**
- **Git** com **Conventional Commits**

---

## 📦 Instalação e Execução

### Opção 1: Com Docker (Recomendado)
```bash
# 1. Clonar o repositório
git clone <url-do-repositorio>
cd "Gabriel Seratti de Oliveira - Desafio Full Stack"

# 2. Subir os containers
docker-compose up --build

# 3. Acessar
# Frontend: http://localhost:5173
# Backend:  http://localhost:8000
```

### Opção 2: Sem Docker

#### Backend (Laravel)
```bash
# 1. Entrar na pasta backend
cd backend

# 2. Instalar dependências
composer install

# 3. Configurar ambiente
cp .env.example .env
php artisan key:generate

# 4. Configurar banco de dados (SQLite)
# O arquivo .env já está configurado para SQLite

# 5. Criar banco e rodar migrations
touch database/database.sqlite
php artisan migrate

# 6. Popular banco com dados do CSV
php artisan db:seed --class=NotesSeeder

# 7. Iniciar servidor
php artisan serve
# Acesse: http://localhost:8000
```

#### Frontend (React)
```bash
# 1. Entrar na pasta frontend
cd frontend

# 2. Instalar dependências
npm install

# 3. Iniciar servidor de desenvolvimento
npm run dev
# Acesse: http://localhost:5173
```

---

## 📚 Documentação da API

A documentação completa da API está disponível em:
- **Arquivo**: [`backend/API_DOCUMENTATION.md`](backend/API_DOCUMENTATION.md)

### Endpoints Principais

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/v1/notes` | Listar notas (com filtros e paginação) |
| POST | `/api/v1/notes` | Criar nova nota |
| GET | `/api/v1/notes/{id}` | Buscar nota específica |
| PUT | `/api/v1/notes/{id}` | Atualizar nota |
| DELETE | `/api/v1/notes/{id}` | Deletar nota |

### Filtros Disponíveis

- `?site=nome` - Filtro parcial por site
- `?equipment=tipo` - Filtro parcial por equipamento
- `?startDate=YYYY-MM-DD` - Data inicial
- `?endDate=YYYY-MM-DD` - Data final
- `?page=N` - Paginação

**Exemplo:**
```bash
GET /api/v1/notes?site=Barros&equipment=Gerador&page=1
```

---

## 🧪 Testes Automatizados

O projeto conta com **13 testes automatizados** (unitários e de integração).
```bash
# Rodar todos os testes
cd backend
php artisan test

# Resultado esperado:
# Tests: 13 passed (69 assertions)
```

### Cobertura de Testes

- ✅ Testes unitários do Model (UUID, casts, fillable)
- ✅ Listagem de notas
- ✅ Filtros (site, equipment, datas)
- ✅ Criação com validação
- ✅ Atualização de notas
- ✅ Deleção de notas
- ✅ Tratamento de erros (404, 422)

---

## ✨ Funcionalidades Implementadas

### Backend
- ✅ CRUD completo de notas
- ✅ Filtros por site, equipamento e período
- ✅ Paginação (10 itens por página)
- ✅ Validação robusta com mensagens customizadas
- ✅ Seed automático do CSV
- ✅ Tratamento de erros
- ✅ CORS configurado
- ✅ Testes automatizados

### Frontend
- ✅ Listagem de notas com paginação
- ✅ Filtros interativos
- ✅ Criação de novas notas
- ✅ Edição de notas existentes
- ✅ Deleção de notas
- ✅ Interface responsiva
- ✅ Sidebar de navegação
- ✅ Validação de formulários
- ✅ Feedback visual (loading, confirmações)

---

## 📂 Estrutura do Projeto
```
.
├── backend/                    # API Laravel
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/
│   │   │   │   └── NoteController.php
│   │   │   └── Requests/
│   │   │       ├── StoreNoteRequest.php
│   │   │       └── UpdateNoteRequest.php
│   │   └── Models/
│   │       └── Note.php
│   ├── database/
│   │   ├── factories/
│   │   │   └── NoteFactory.php
│   │   ├── migrations/
│   │   ├── seeders/
│   │   │   ├── NotesSeeder.php
│   │   │   └── notes.csv
│   │   └── database.sqlite
│   ├── routes/
│   │   └── api.php
│   ├── tests/
│   │   ├── Feature/
│   │   │   └── NoteApiTest.php
│   │   └── Unit/
│   │       └── NoteModelTest.php
│   ├── API_DOCUMENTATION.md
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── frontend/                   # Interface React
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── FilterForm.tsx
│   │   │   ├── NotesTable.tsx
│   │   │   ├── CreateNoteModal.tsx
│   │   │   └── EditNoteModal.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── Note.ts
│   │   ├── App.tsx
│   │   └── App.css
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## 🎨 Screenshots

### Tela Principal
- Listagem de notas com filtros
- Paginação
- Botões de editar e deletar

### Modal de Criação/Edição
- Formulário com validação
- Campos: Site, Equipamento, Variável, Data, Autor, Mensagem

---

## 🔧 Comandos Úteis

### Backend
```bash
# Rodar migrations
php artisan migrate

# Popular banco de dados
php artisan db:seed --class=NotesSeeder

# Limpar cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Rodar testes
php artisan test

# Ver rotas
php artisan route:list
```

### Frontend
```bash
# Instalar dependências
npm install

# Rodar dev server
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

### Docker
```bash
# Subir containers
docker-compose up

# Subir em background
docker-compose up -d

# Parar containers
docker-compose down

# Ver logs
docker-compose logs

# Rebuild
docker-compose up --build
```

---

## 📝 Validações Implementadas

### Criação de Nota

- **site**: obrigatório, mínimo 3 caracteres
- **equipment**: obrigatório, valores: Gerador | Transformador | Multimedidor
- **variable**: obrigatório, valores: Tensão | Corrente
- **timestamp**: obrigatório, não pode ser data futura
- **author**: obrigatório, mínimo 3 caracteres
- **message**: obrigatório, entre 10 e 1000 caracteres

---

## 🐛 Troubleshooting

### Erro de CORS no frontend

Verifique se o backend está rodando e se `config/cors.php` permite `http://localhost:5173`.

### Banco de dados vazio

Execute o seeder:
```bash
php artisan db:seed --class=NotesSeeder
```

### Erro ao criar nota

Verifique as validações. Todos os campos são obrigatórios e devem seguir as regras especificadas.

---

## 👨‍💻 Autor

**Gabriel Seratti de Oliveira**

---

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico.