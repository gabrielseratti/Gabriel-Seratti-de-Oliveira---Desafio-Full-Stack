# 📚 Documentação da API - Notes System

Base URL: `http://localhost:8000/api/v1`

---

## 📋 Endpoints

### 1. Listar Notas (com filtros e paginação)

**GET** `/notes`

#### Query Parameters (Opcionais):
- `site` (string) - Filtro parcial por nome do site
- `equipment` (string) - Filtro parcial por equipamento
- `startDate` (date) - Data inicial (formato: YYYY-MM-DD)
- `endDate` (date) - Data final (formato: YYYY-MM-DD)
- `page` (integer) - Número da página (padrão: 1)

#### Exemplo de Requisição:
```bash
GET /api/v1/notes?site=Barros&equipment=Gerador&page=1
```

#### Resposta (200 OK):
```json
{
  "current_page": 1,
  "data": [
    {
      "id": "019c5a3b-7a5b-7154-b95a-660396d2cccb",
      "site": "Barros, Reis e Moraes",
      "equipment": "Gerador",
      "variable": "Tensão",
      "timestamp": "2024-08-01T18:48:37.000000Z",
      "author": "Márcia Albuquerque",
      "message": "Ratione doloremque quidem...",
      "created_at": "2026-02-14T03:39:33.000000Z",
      "updated_at": "2026-02-14T03:39:33.000000Z"
    }
  ],
  "total": 100,
  "per_page": 10,
  "last_page": 10
}
```

---

### 2. Criar Nova Nota

**POST** `/notes`

#### Body (JSON):
```json
{
  "site": "Barros, Reis e Moraes",
  "equipment": "Gerador",
  "variable": "Tensão",
  "timestamp": "2024-08-01T18:48:37Z",
  "author": "João Silva",
  "message": "Observação sobre o equipamento"
}
```

#### Validações:
- `site`: obrigatório, string, mín: 3, máx: 255
- `equipment`: obrigatório, deve ser: Gerador, Transformador ou Multimedidor
- `variable`: obrigatório, deve ser: Tensão ou Corrente
- `timestamp`: obrigatório, data válida, não pode ser futura
- `author`: obrigatório, string, mín: 3, máx: 255
- `message`: obrigatório, string, mín: 10, máx: 1000

#### Resposta (201 Created):
```json
{
  "success": true,
  "message": "Nota criada com sucesso",
  "data": {
    "id": "019c5a3b-7a5b-7154-b95a-660396d2cccb",
    "site": "Barros, Reis e Moraes",
    ...
  }
}
```

#### Erro de Validação (422):
```json
{
  "success": false,
  "message": "Erro de validação",
  "errors": {
    "site": ["O campo site é obrigatório."],
    "message": ["A mensagem deve ter no mínimo 10 caracteres."]
  }
}
```

---

### 3. Buscar Nota Específica

**GET** `/notes/{id}`

#### Resposta (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "019c5a3b-7a5b-7154-b95a-660396d2cccb",
    "site": "Barros, Reis e Moraes",
    ...
  }
}
```

#### Erro (404):
```json
{
  "success": false,
  "message": "Nota não encontrada"
}
```

---

### 4. Atualizar Nota

**PUT/PATCH** `/notes/{id}`

#### Body (JSON - todos opcionais):
```json
{
  "site": "Novo site",
  "message": "Mensagem atualizada"
}
```

#### Resposta (200 OK):
```json
{
  "success": true,
  "message": "Nota atualizada com sucesso",
  "data": { ... }
}
```

---

### 5. Deletar Nota

**DELETE** `/notes/{id}`

#### Resposta (200 OK):
```json
{
  "success": true,
  "message": "Nota deletada com sucesso"
}
```

---

## 🚨 Códigos de Status HTTP

- `200` - OK (sucesso)
- `201` - Created (criado com sucesso)
- `404` - Not Found (recurso não encontrado)
- `422` - Unprocessable Entity (erro de validação)
- `500` - Internal Server Error (erro do servidor)

---

## 🔧 Exemplos com cURL

### Listar notas:
```bash
curl -X GET "http://localhost:8000/api/v1/notes?site=Barros&page=1"
```

### Criar nota:
```bash
curl -X POST "http://localhost:8000/api/v1/notes" \
  -H "Content-Type: application/json" \
  -d '{
    "site": "Test Site",
    "equipment": "Gerador",
    "variable": "Tensão",
    "timestamp": "2024-08-01T10:00:00Z",
    "author": "Test Author",
    "message": "This is a test message with more than 10 characters"
  }'
```

### Atualizar nota:
```bash
curl -X PUT "http://localhost:8000/api/v1/notes/{id}" \
  -H "Content-Type: application/json" \
  -d '{"message": "Updated message with sufficient length"}'
```

### Deletar nota:
```bash
curl -X DELETE "http://localhost:8000/api/v1/notes/{id}"
```