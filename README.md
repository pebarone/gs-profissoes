# GS SOA - API Plataforma de Upskilling/Reskilling

API RESTful para plataforma de capacitação profissional voltada ao futuro do trabalho 2030+.

## Tecnologias

- ASP.NET Core 8.0
- Entity Framework Core
- Oracle Database
- Swagger/OpenAPI

## Estrutura do Projeto

```
gs-soa/
├── src/
│   ├── Controllers/        # Endpoints da API
│   ├── Services/          # Lógica de negócio
│   ├── Repositories/      # Acesso a dados
│   ├── Models/            # Entidades do domínio
│   ├── DTOs/              # Objetos de transferência
│   ├── Data/              # Contexto do banco
│   ├── Middleware/        # Tratamento de exceções
│   └── Program.cs         # Configuração da aplicação
├── Migrations/            # Scripts SQL
├── static/                # Frontend SPA
└── postman_collection.json
```

## Configuração

### Pré-requisitos

- .NET 8.0 SDK
- Oracle Database

### String de Conexão

Configure a string de conexão no `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "User Id=seu_usuario;Password=sua_senha;Data Source=seu_host:1521/seu_service"
  }
}
```

### Executar Migrations

Execute os scripts SQL na pasta `Migrations/` em ordem:

```bash
# 1. Criar schema
sqlplus user/password@database @Migrations/V1__Initial_Schema_Oracle.sql

# 2. Popular dados
sqlplus user/password@database @Migrations/V2__Seed_Data_Oracle.sql
```

## Executar a Aplicação

```bash
cd src
dotnet restore
dotnet run
```

A aplicação estará disponível em:
- Frontend: http://localhost:5000
- API: http://localhost:5000/api
- Swagger: http://localhost:5000/api-docs

## Endpoints

### Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/usuarios` | Lista todos os usuários |
| GET | `/api/usuarios/{id}` | Busca usuário por ID |
| POST | `/api/usuarios` | Cria novo usuário |
| PUT | `/api/usuarios/{id}` | Atualiza usuário |
| DELETE | `/api/usuarios/{id}` | Remove usuário |

#### Modelo de Usuário

```json
{
  "nome": "string",
  "email": "string",
  "cpf": "string",
  "telefone": "string",
  "dataNascimento": "2025-01-01T00:00:00"
}
```

### Trilhas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/trilhas` | Lista todas as trilhas |
| GET | `/api/trilhas/{id}` | Busca trilha por ID |
| POST | `/api/trilhas` | Cria nova trilha |
| PUT | `/api/trilhas/{id}` | Atualiza trilha |
| DELETE | `/api/trilhas/{id}` | Remove trilha |

#### Modelo de Trilha

```json
{
  "nome": "string",
  "descricao": "string",
  "nivel": "string",
  "cargaHoraria": 0
}
```

## Frontend

A aplicação inclui um frontend SPA moderno desenvolvido com HTML, CSS e JavaScript vanilla.

### Características

- Single Page Application (SPA)
- Design minimalista inspirado em Apple
- Busca em tempo real
- Validação de formulários
- Máscaras de input (CPF, telefone)
- Notificações toast
- Totalmente responsivo

### Arquivos

- `static/index.html` - Estrutura principal
- `static/css/styles.css` - Estilos e design system
- `static/js/api.js` - Serviço de comunicação com API
- `static/js/components.js` - Componentes UI reutilizáveis
- `static/js/app.js` - Lógica da aplicação e gerenciamento de estado

## Tratamento de Erros

A API utiliza middleware customizado para tratamento global de exceções, retornando respostas padronizadas:

- `400 Bad Request` - Validação de dados
- `404 Not Found` - Recurso não encontrado
- `422 Unprocessable Entity` - Regras de negócio
- `500 Internal Server Error` - Erros não tratados

## Validações

### Usuário

- Nome: obrigatório, máximo 100 caracteres
- Email: obrigatório, formato válido, máximo 100 caracteres
- CPF: opcional, formato válido
- Telefone: opcional
- Data de Nascimento: opcional

### Trilha

- Nome: obrigatório, máximo 100 caracteres
- Descrição: obrigatório, máximo 500 caracteres
- Nível: opcional
- Carga Horária: opcional, valor positivo

## Testes

Utilize a collection do Postman incluída no projeto:

```bash
postman_collection.json
```

Importe no Postman para testar todos os endpoints disponíveis.

## Autores

Global Solution 2025

## Licença

Este projeto foi desenvolvido para fins acadêmicos.
