# 📝 Sistema de Gerenciamento de Notas Industriais

Sistema full-stack completo para gerenciamento de notas industriais com API RESTful e interface web moderna.

## 🚀 Tecnologias Utilizadas

### Backend
- **Laravel 11** - Framework PHP
- **PHP 8.3** - Linguagem de programação
- **SQLite** - Banco de dados
- **PHPUnit** - Testes automatizados

### Frontend
- **React 18** - Biblioteca JavaScript
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Axios** - Cliente HTTP
- **date-fns** - Manipulação de datas
- **jsPDF** - Geração de PDFs
- **Lucide React** - Ícones
- **React Hot Toast** - Notificações

### DevOps
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers
- **Git** - Controle de versão

---

## 📋 Funcionalidades

### Backend (API RESTful)
- ✅ CRUD completo de notas (Create, Read, Update, Delete)
- ✅ Filtros dinâmicos por site, equipamento e período de datas
- ✅ Paginação configurável (padrão: 5 itens por página)
- ✅ Validação robusta com mensagens em português
- ✅ Tratamento de erros HTTP adequado
- ✅ Seed automático de 100 registros do CSV
- ✅ Testes automatizados (13 testes, 69 assertions)

### Frontend (Interface Web)
- ✅ Interface profissional seguindo design system
- ✅ Sidebar de navegação
- ✅ Filtros em tempo real (site, equipamento, datas)
- ✅ Ordenação clicável por colunas
- ✅ CRUD completo com modais
- ✅ Notificações toast para feedback visual
- ✅ Exportação de dados (CSV, TXT, PDF)
- ✅ Paginação com navegação intuitiva
- ✅ Responsivo e acessível

---

## 🛠️ Instalação e Execução

### ⚠️ Nota sobre Dependências

Este projeto **inclui as pastas `vendor/` (backend) e `node_modules/` (frontend)** para facilitar a execução. Você pode executar o projeto **sem precisar instalar dependências**, seguindo a **Opção A** abaixo.

Caso as pastas não estejam presentes ou apresentem problemas, siga a **Opção B** para instalação completa.

---

### Opção A: Execução Rápida (com dependências incluídas)

#### Backend
```bash
# 1. Entrar na pasta backend
cd backend

# 2. Configurar ambiente
cp .env.example .env
php artisan key:generate

# 3. Iniciar servidor
php artisan serve
# Backend estará em: http://localhost:8000
```

#### Frontend
```bash
# 1. Em outro terminal, entrar na pasta frontend
cd frontend

# 2. Iniciar servidor
npm run dev
# Frontend estará em: http://localhost:5173
```

---

### Opção B: Instalação Completa (sem dependências incluídas)

#### Pré-requisitos
- PHP 8.3+
- Composer
- Node.js 20+
- npm ou yarn

#### ⚙️ Configuração do PHP (Windows com Laragon)

Se você estiver usando **Laragon** no Windows e o `composer install` falhar com erro sobre extensão ZIP:

**1. Habilitar extensão ZIP:**

Abra o arquivo `php.ini`:
```
C:\laragon\bin\php\php-8.3.30-Win32-vs16-x64\php.ini
```

Procure por `extension=zip` e **remova o ponto e vírgula** (`;`):
```ini
;extension=zip    ← ANTES
extension=zip     ← DEPOIS
```

Salve o arquivo e teste:
```bash
php -m | findstr zip
```
Deve aparecer: `zip`

**2. Token do GitHub (se necessário):**

O Composer baixa pacotes do GitHub, que limita requisições anônimas a **60/hora**. Se você exceder esse limite durante `composer install`, será necessário criar um token:

1. Acesse: https://github.com/settings/tokens/new?scopes=repo
2. Scroll até o final e clique **"Generate token"**
3. **Copie o token** (começa com `ghp_...`)
4. Configure no Composer:
```bash
composer config --global github-oauth.github.com SEU_TOKEN_AQUI
```

#### Backend
```bash
# 1. Entrar na pasta backend
cd backend

# 2. Instalar dependências (pode pedir token do GitHub)
composer install

# 3. Configurar ambiente
cp .env.example .env
php artisan key:generate

# 4. Criar banco e rodar migrations
touch database/database.sqlite
php artisan migrate

# 5. Popular banco com dados do CSV
php artisan db:seed

# 6. Iniciar servidor
php artisan serve
# Acesse: http://localhost:8000
```

#### Frontend
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

### Opção C: Com Docker
```bash
# Na raiz do projeto
docker-compose up -d

# Backend: http://localhost:8000
# Frontend: http://localhost:5173
```

Para parar os containers:
```bash
docker-compose down
```

---

## 🧪 Testes

### Rodar todos os testes
```bash
cd backend
php artisan test
```

### Rodar testes específicos
```bash
# Testes unitários
php artisan test --testsuite=Unit

# Testes de integração
php artisan test --testsuite=Feature
```

**Cobertura atual:** 13 testes, 69 assertions, 100% de aprovação

---

## 📡 Documentação da API

### Base URL
```
http://localhost:8000/api/v1
```

### Endpoints

#### 1. Listar Notas
```http
GET /notes
```

**Query Parameters:**
- `site` (string, opcional) - Filtro por site
- `equipment` (string, opcional) - Filtro por equipamento
- `startDate` (date, opcional) - Data inicial do período
- `endDate` (date, opcional) - Data final do período
- `page` (integer, opcional) - Número da página
- `per_page` (integer, opcional) - Itens por página (padrão: 5)

**Resposta (200):**
```json
{
  "data": [
    {
      "id": "9d4f2c8a-1234-5678-9abc-def012345678",
      "site": "Barros, Reis e Moraes",
      "equipment": "Gerador",
      "variable": "Tensão",
      "timestamp": "2024-01-15T10:30:00.000000Z",
      "author": "Gabriel Seratti",
      "message": "Verificação de rotina realizada com sucesso",
      "created_at": "2024-01-15T10:30:00.000000Z",
      "updated_at": "2024-01-15T10:30:00.000000Z"
    }
  ],
  "current_page": 1,
  "last_page": 20,
  "per_page": 5,
  "total": 100
}
```

#### 2. Buscar Nota Específica
```http
GET /notes/{id}
```

#### 3. Criar Nota
```http
POST /notes
```

**Body:**
```json
{
  "site": "Novo Site",
  "equipment": "Gerador",
  "variable": "Tensão",
  "timestamp": "2024-01-15T10:30:00",
  "author": "Gabriel Seratti",
  "message": "Descrição detalhada da nota"
}
```

**Validações:**
- `site`: obrigatório, string, min:3, max:255
- `equipment`: obrigatório, in:Gerador,Transformador,Multimedidor
- `variable`: obrigatório, in:Tensão,Corrente
- `timestamp`: obrigatório, date, before_or_equal:now
- `author`: obrigatório, string, min:3, max:255
- `message`: obrigatório, string, min:10, max:1000

#### 4. Atualizar Nota
```http
PUT /notes/{id}
```

#### 5. Deletar Nota
```http
DELETE /notes/{id}
```

---

## 📁 Estrutura do Projeto
```
.
├── backend/                    # Backend Laravel
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   └── Api/
│   │   │   │       └── NoteController.php
│   │   │   └── Requests/
│   │   │       ├── StoreNoteRequest.php
│   │   │       └── UpdateNoteRequest.php
│   │   └── Models/
│   │       └── Note.php
│   ├── database/
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
│   └── vendor/                 # Dependências incluídas
│
├── frontend/                   # Frontend React
│   ├── public/
│   │   └── *.svg              # Ícones SVG
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── FilterForm.tsx
│   │   │   ├── NotesTable.tsx
│   │   │   ├── CreateNoteModal.tsx
│   │   │   ├── EditNoteModal.tsx
│   │   │   ├── ConfirmModal.tsx
│   │   │   └── ExportButton.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── Note.ts
│   │   ├── utils/
│   │   │   └── exportUtils.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── main.tsx
│   ├── node_modules/           # Dependências incluídas
│   └── package.json
│
├── docker-compose.yml
├── prompts.txt
└── README.md
```

---

## 🎨 Design e UX

- Interface desenvolvida seguindo o design system fornecido
- Paleta de cores profissional (verde #42a566 como cor primária)
- Sidebar com navegação intuitiva
- Tabela responsiva com zebra striping
- Modais elegantes para CRUD
- Toasts para feedback visual imediato
- Ícones Lucide React para consistência visual
- Hover states em botões e elementos interativos

---

## 🔐 Segurança

- Validação de dados no backend e frontend
- Sanitização de inputs
- Proteção contra SQL Injection (uso de Eloquent ORM)
- CORS configurado adequadamente
- Mensagens de erro amigáveis sem expor detalhes técnicos

---

## 🧩 Padrões e Boas Práticas

### Backend
- Arquitetura MVC
- Repository Pattern via Eloquent
- Form Requests para validação
- Resource Controllers
- API Restful com verbos HTTP corretos
- Tratamento de erros consistente
- Testes automatizados

### Frontend
- Componentização React
- TypeScript para type safety
- Hooks personalizados
- Separação de responsabilidades
- API service layer
- Tratamento de estados de loading
- Feedback visual consistente

### Versionamento
- Conventional Commits Pattern
- Commits atômicos e descritivos
- Histórico limpo e organizado

---

## 📊 Status dos Requisitos

### Requisitos Obrigatórios
- ✅ Backend com API RESTful
- ✅ Banco de dados SQLite
- ✅ Seed do CSV com 100 registros
- ✅ GET /api/v1/notes com filtros
- ✅ POST /api/v1/notes
- ✅ Paginação
- ✅ Validação de dados
- ✅ Documentação da API
- ✅ Frontend React com TypeScript
- ✅ Interface seguindo design fornecido
- ✅ Filtros funcionais
- ✅ Criação de notas

### Requisitos Opcionais
- ✅ CRUD completo (PUT, DELETE)
- ✅ Docker e Docker Compose
- ✅ Testes automatizados (13 testes)
- ✅ Exportação de dados (CSV, TXT, PDF)

### Melhorias Adicionais
- ✅ Notificações toast
- ✅ Modais de confirmação
- ✅ Ordenação clicável nas colunas
- ✅ Filtros em tempo real
- ✅ Exportação de TODOS os registros filtrados

---

## 🐛 Troubleshooting

### Erro de CORS no frontend
Verifique se o backend está rodando e se `backend/config/cors.php` permite `http://localhost:5173`.

### Banco de dados vazio
Execute o seeder:
```bash
cd backend
php artisan db:seed
```

### Erro ao rodar `php artisan serve`
Verifique se o arquivo `.env` existe e se a `APP_KEY` foi gerada:
```bash
cp .env.example .env
php artisan key:generate
```

### Frontend não conecta com backend
Verifique se o backend está rodando em `http://localhost:8000` e se o arquivo `frontend/src/services/api.ts` está configurado corretamente.

---

## 👨‍💻 Autor

**Gabriel Seratti de Oliveira**

Desenvolvido como parte do processo seletivo para Desenvolvedor Full Stack.

---

## 📝 Uso de IA

Este projeto foi desenvolvido com auxílio de Inteligência Artificial (Claude - Anthropic) como ferramenta de consultoria técnica e aceleração de desenvolvimento.

Todos os prompts utilizados estão documentados no arquivo `prompts.txt` na raiz do projeto.

Todo código foi revisado, compreendido e testado extensivamente. A responsabilidade pela qualidade e funcionalidade é integralmente do desenvolvedor.

---

## 📄 Licença

Este projeto foi desenvolvido para fins de avaliação técnica.