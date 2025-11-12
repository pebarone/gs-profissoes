# 🚀 API Plataforma de Upskilling/Reskilling 2030+

**Global Solution 2025 - O Futuro do Trabalho**  
*FIAP - 3ESPY - Arquitetura Orientada a Serviços*

---

## 📑 Documentação do Projeto

> 👉 **[Veja o INDEX.md](INDEX.md)** para navegação completa de todos os documentos

- 📖 **[QUICKSTART.md](QUICKSTART.md)** - Guia rápido de execução (5 passos)
- ⚠️ **[IMPORTANTE.md](IMPORTANTE.md)** - Leia antes de executar!
- ✅ **[CHECKLIST.md](CHECKLIST.md)** - Verificação de requisitos
- 🧪 **[TESTES.md](TESTES.md)** - Exemplos de testes (cURL, PowerShell)
- 📂 **[ESTRUTURA.md](ESTRUTURA.md)** - Visão completa da arquitetura
- 📊 **[RESUMO_EXECUTIVO.md](RESUMO_EXECUTIVO.md)** - Resumo do projeto
- 👥 **[INTEGRANTES.md](INTEGRANTES.md)** - Informações da equipe

---

## �📋 Sobre o Projeto

Esta API RESTful foi desenvolvida para uma plataforma de **Upskilling/Reskilling** voltada ao futuro do trabalho em 2030+. A solução permite que profissionais:

- 📝 Se cadastrem na plataforma
- 🎓 Acessem trilhas de aprendizagem focadas em competências do futuro
- 📚 Se inscrevam em trilhas para requalificação profissional

### 🎯 Conexão com ODS (Objetivos de Desenvolvimento Sustentável)

- **ODS 4** - Educação de Qualidade: acesso à educação contínua e qualificação profissional
- **ODS 8** - Trabalho Decente e Crescimento Econômico: preparação para empregos do futuro
- **ODS 9** - Indústria, Inovação e Infraestrutura: capacitação em tecnologias emergentes
- **ODS 10** - Redução das Desigualdades: democratização do acesso ao conhecimento

---

## 🏗️ Arquitetura do Projeto

O projeto segue a **arquitetura em camadas**:

```
┌─────────────────────────────────────┐
│         Controllers Layer           │  ← Endpoints REST (HTTP)
├─────────────────────────────────────┤
│          Services Layer             │  ← Regras de negócio
├─────────────────────────────────────┤
│        Repositories Layer           │  ← Acesso a dados
├─────────────────────────────────────┤
│          Data Layer (EF)            │  ← Entity Framework Core
├─────────────────────────────────────┤
│        Database (MySQL)             │  ← Banco de dados
└─────────────────────────────────────┘
```

### 📁 Estrutura de Pastas

```
gs-soa/
├── Controllers/          # Endpoints da API
│   ├── UsuariosController.cs
│   └── TrilhasController.cs
├── Services/             # Lógica de negócio
│   ├── IUsuarioService.cs
│   ├── UsuarioService.cs
│   ├── ITrilhaService.cs
│   └── TrilhaService.cs
├── Repositories/         # Acesso aos dados
│   ├── IUsuarioRepository.cs
│   ├── UsuarioRepository.cs
│   ├── ITrilhaRepository.cs
│   └── TrilhaRepository.cs
├── Models/               # Entidades do domínio
│   ├── Usuario.cs
│   ├── Trilha.cs
│   ├── Competencia.cs
│   ├── TrilhaCompetencia.cs
│   └── Matricula.cs
├── DTOs/                 # Data Transfer Objects
│   ├── UsuarioCreateDto.cs
│   ├── UsuarioUpdateDto.cs
│   ├── UsuarioResponseDto.cs
│   ├── TrilhaCreateDto.cs
│   ├── TrilhaUpdateDto.cs
│   └── TrilhaResponseDto.cs
├── Data/                 # Contexto do banco
│   └── AppDbContext.cs
├── Exceptions/           # Exceções customizadas
│   ├── ResourceNotFoundException.cs
│   └── BusinessException.cs
├── Middleware/           # Middlewares
│   └── ExceptionHandlingMiddleware.cs
├── Migrations/           # Scripts SQL
│   ├── V1__Initial_Schema.sql
│   └── V2__Seed_Data.sql
└── Program.cs            # Configuração da aplicação
```

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **.NET** | 8.0 | Framework principal |
| **C#** | 12.0 | Linguagem de programação |
| **Entity Framework Core** | 8.0.0 | ORM para acesso a dados |
| **MySQL** | 8.0+ | Banco de dados relacional |
| **Pomelo.EntityFrameworkCore.MySql** | 8.0.0 | Provider MySQL para EF Core |
| **Swagger/OpenAPI** | 6.5.0 | Documentação da API |
| **FluentValidation** | 11.3.0 | Validação de dados |

---

## 📦 Instalação e Configuração

### Pré-requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) instalado
- [MySQL 8.0+](https://dev.mysql.com/downloads/mysql/) instalado e em execução
- Git (opcional)

### 1️⃣ Clone o repositório

```bash
git clone <url-do-repositorio>
cd gs-soa
```

### 2️⃣ Configure a conexão com o banco de dados

Edite o arquivo `appsettings.json` e configure a string de conexão:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Port=3306;Database=gs_soa_db;Uid=root;Pwd=SUA_SENHA_AQUI;"
  }
}
```

> ⚠️ **Importante**: Substitua `SUA_SENHA_AQUI` pela senha do seu usuário MySQL.

### 3️⃣ Crie o banco de dados

Conecte-se ao MySQL e execute:

```sql
CREATE DATABASE gs_soa_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4️⃣ Execute as migrações

Execute os scripts SQL na ordem:

```bash
# No MySQL Workbench ou via linha de comando:
mysql -u root -p gs_soa_db < Migrations/V1__Initial_Schema.sql
mysql -u root -p gs_soa_db < Migrations/V2__Seed_Data.sql
```

Ou copie e cole o conteúdo dos arquivos SQL diretamente no MySQL Workbench.

### 5️⃣ Restaure as dependências

```bash
dotnet restore
```

### 6️⃣ Execute a aplicação

```bash
dotnet run
```

A API estará disponível em:
- **HTTP**: `http://localhost:5000`
- **HTTPS**: `https://localhost:5001`
- **Swagger UI**: `http://localhost:5000` ou `https://localhost:5001`

---

## 🔌 Endpoints da API

### 👥 Usuários (`/api/usuarios`)

| Método | Endpoint | Descrição | Status Code |
|--------|----------|-----------|-------------|
| `GET` | `/api/usuarios` | Lista todos os usuários | 200 OK |
| `GET` | `/api/usuarios/{id}` | Busca usuário por ID | 200 OK / 404 Not Found |
| `POST` | `/api/usuarios` | Cria novo usuário | 201 Created |
| `PUT` | `/api/usuarios/{id}` | Atualiza usuário | 200 OK / 404 Not Found |
| `DELETE` | `/api/usuarios/{id}` | Remove usuário | 204 No Content / 404 Not Found |

### 📚 Trilhas (`/api/trilhas`)

| Método | Endpoint | Descrição | Status Code |
|--------|----------|-----------|-------------|
| `GET` | `/api/trilhas` | Lista todas as trilhas | 200 OK |
| `GET` | `/api/trilhas/{id}` | Busca trilha por ID | 200 OK / 404 Not Found |
| `POST` | `/api/trilhas` | Cria nova trilha | 201 Created |
| `PUT` | `/api/trilhas/{id}` | Atualiza trilha | 200 OK / 404 Not Found |
| `DELETE` | `/api/trilhas/{id}` | Remove trilha | 204 No Content / 404 Not Found |

---

## 📝 Exemplos de Requisições

### ➕ Criar Usuário

**Requisição:**
```http
POST /api/usuarios
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "areaAtuacao": "Tecnologia da Informação",
  "nivelCarreira": "Pleno"
}
```

**Resposta (201 Created):**
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "areaAtuacao": "Tecnologia da Informação",
  "nivelCarreira": "Pleno",
  "dataCadastro": "2025-11-11T10:30:00"
}
```

### 📋 Listar Todos os Usuários

**Requisição:**
```http
GET /api/usuarios
```

**Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "nome": "Ana Silva",
    "email": "ana.silva@email.com",
    "areaAtuacao": "Tecnologia da Informação",
    "nivelCarreira": "Pleno",
    "dataCadastro": "2025-01-15T00:00:00"
  },
  {
    "id": 2,
    "nome": "Carlos Santos",
    "email": "carlos.santos@email.com",
    "areaAtuacao": "Gestão de Projetos",
    "nivelCarreira": "Senior",
    "dataCadastro": "2025-02-10T00:00:00"
  }
]
```

### ➕ Criar Trilha

**Requisição:**
```http
POST /api/trilhas
Content-Type: application/json

{
  "nome": "Python para Data Science",
  "descricao": "Aprenda Python aplicado à análise de dados",
  "nivel": "INTERMEDIARIO",
  "cargaHoraria": 80,
  "focoPrincipal": "Dados"
}
```

**Resposta (201 Created):**
```json
{
  "id": 9,
  "nome": "Python para Data Science",
  "descricao": "Aprenda Python aplicado à análise de dados",
  "nivel": "INTERMEDIARIO",
  "cargaHoraria": 80,
  "focoPrincipal": "Dados"
}
```

### ✏️ Atualizar Trilha

**Requisição:**
```http
PUT /api/trilhas/9
Content-Type: application/json

{
  "nome": "Python Avançado para Data Science",
  "descricao": "Domine Python para análise avançada de dados",
  "nivel": "AVANCADO",
  "cargaHoraria": 120,
  "focoPrincipal": "Dados"
}
```

**Resposta (200 OK):**
```json
{
  "id": 9,
  "nome": "Python Avançado para Data Science",
  "descricao": "Domine Python para análise avançada de dados",
  "nivel": "AVANCADO",
  "cargaHoraria": 120,
  "focoPrincipal": "Dados"
}
```

### 🔍 Buscar Trilha por ID

**Requisição:**
```http
GET /api/trilhas/1
```

**Resposta (200 OK):**
```json
{
  "id": 1,
  "nome": "IA Generativa para Profissionais",
  "descricao": "Aprenda a utilizar ferramentas de IA generativa no dia a dia profissional",
  "nivel": "INICIANTE",
  "cargaHoraria": 40,
  "focoPrincipal": "IA"
}
```

### ❌ Deletar Usuário

**Requisição:**
```http
DELETE /api/usuarios/5
```

**Resposta (204 No Content):**
```
(sem corpo na resposta)
```

---

## ✅ Validações Implementadas

### Usuários
- ✔️ Nome: obrigatório, máximo 100 caracteres
- ✔️ Email: obrigatório, formato válido, único na base, máximo 150 caracteres
- ✔️ Área de Atuação: opcional, máximo 100 caracteres
- ✔️ Nível de Carreira: opcional, máximo 50 caracteres

### Trilhas
- ✔️ Nome: obrigatório, máximo 150 caracteres
- ✔️ Descrição: opcional
- ✔️ Nível: obrigatório, valores permitidos: `INICIANTE`, `INTERMEDIARIO`, `AVANCADO`
- ✔️ Carga Horária: obrigatória, deve ser maior que zero (mínimo 4 horas - regra de negócio)
- ✔️ Foco Principal: opcional, máximo 100 caracteres

---

## 🚨 Tratamento de Erros

A API possui um middleware centralizado de tratamento de exceções que retorna respostas padronizadas:

### Recurso não encontrado (404)
```json
{
  "statusCode": 404,
  "message": "Usuário com ID 999 não foi encontrado(a)",
  "timestamp": "2025-11-11T10:30:00Z"
}
```

### Erro de validação de negócio (422)
```json
{
  "statusCode": 422,
  "message": "Já existe um usuário cadastrado com o email teste@email.com",
  "timestamp": "2025-11-11T10:30:00Z"
}
```

### Erro de validação de dados (400)
```json
{
  "errors": {
    "Email": ["Email em formato inválido"],
    "CargaHoraria": ["A carga horária deve ser maior que zero"]
  }
}
```

### Erro interno do servidor (500)
```json
{
  "statusCode": 500,
  "message": "Ocorreu um erro interno no servidor",
  "timestamp": "2025-11-11T10:30:00Z"
}
```

---

## 🧪 Testando a API

### Usando Swagger UI

Acesse `http://localhost:5000` no navegador e utilize a interface interativa do Swagger para testar todos os endpoints.

### Usando cURL

```bash
# Listar usuários
curl -X GET http://localhost:5000/api/usuarios

# Criar usuário
curl -X POST http://localhost:5000/api/usuarios \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"Teste\",\"email\":\"teste@email.com\",\"areaAtuacao\":\"TI\",\"nivelCarreira\":\"Junior\"}"

# Buscar usuário por ID
curl -X GET http://localhost:5000/api/usuarios/1

# Atualizar usuário
curl -X PUT http://localhost:5000/api/usuarios/1 \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"Teste Atualizado\",\"email\":\"teste@email.com\",\"areaAtuacao\":\"TI\",\"nivelCarreira\":\"Pleno\"}"

# Deletar usuário
curl -X DELETE http://localhost:5000/api/usuarios/1
```

### Usando Postman ou Insomnia

1. Importe a coleção do Swagger: `http://localhost:5000/swagger/v1/swagger.json`
2. Configure a URL base: `http://localhost:5000`
3. Teste os endpoints conforme os exemplos acima

---

## 📊 Modelo de Dados

### Diagrama ER Simplificado

```
┌─────────────┐       ┌──────────────┐       ┌──────────────┐
│  USUARIOS   │       │  MATRICULAS  │       │   TRILHAS    │
├─────────────┤       ├──────────────┤       ├──────────────┤
│ id (PK)     │───┐   │ id (PK)      │   ┌───│ id (PK)      │
│ nome        │   └──<│ usuario_id   │   │   │ nome         │
│ email       │       │ trilha_id    │>──┘   │ descricao    │
│ area_atuacao│       │ data_insc... │       │ nivel        │
│ nivel_car...│       │ status       │       │ carga_horaria│
│ data_cad... │       └──────────────┘       │ foco_princ...│
└─────────────┘                              └──────────────┘
                                                     │
                      ┌──────────────────────────────┘
                      │
               ┌──────▼───────┐       ┌──────────────┐
               │TRILHA_COMP...│       │ COMPETENCIAS │
               ├──────────────┤       ├──────────────┤
               │ trilha_id    │>──────│ id (PK)      │
               │ competencia..│       │ nome         │
               └──────────────┘       │ categoria    │
                                      │ descricao    │
                                      └──────────────┘
```

---

## 🎓 Dados de Exemplo (Seeds)

Ao executar a migração `V2__Seed_Data.sql`, os seguintes dados são inseridos:

### Competências (12 competências)
- Inteligência Artificial
- Análise de Dados
- Cloud Computing
- Cibersegurança
- Desenvolvimento Sustentável
- Pensamento Crítico
- Criatividade
- Inteligência Emocional
- Colaboração
- Adaptabilidade
- Gestão de Projetos Ágeis
- Liderança Digital

### Trilhas (8 trilhas)
1. IA Generativa para Profissionais (INICIANTE, 40h)
2. Cientista de Dados 2030 (AVANCADO, 200h)
3. Cloud Engineer Essentials (INTERMEDIARIO, 80h)
4. Cibersegurança para o Futuro (INTERMEDIARIO, 120h)
5. Soft Skills para Líderes Digitais (INICIANTE, 60h)
6. Green Tech e Sustentabilidade (INICIANTE, 50h)
7. Transformação Digital Completa (AVANCADO, 160h)
8. Desenvolvimento Ágil de Software (INTERMEDIARIO, 100h)

### Usuários (4 usuários de exemplo)
- Ana Silva (Pleno - TI)
- Carlos Santos (Senior - Gestão)
- Maria Oliveira (Junior - Marketing)
- João Pereira (Em transição - Análise de Dados)

---

## 🔐 Boas Práticas Implementadas

✅ **Arquitetura em Camadas**: separação clara de responsabilidades  
✅ **Injeção de Dependência**: uso nativo do .NET para IoC  
✅ **DTOs**: separação entre modelos de domínio e contratos da API  
✅ **Validações**: Data Annotations e validações de negócio  
✅ **Tratamento de Exceções**: middleware centralizado  
✅ **Status HTTP Adequados**: uso correto de códigos de resposta  
✅ **Documentação**: Swagger/OpenAPI integrado  
✅ **Async/Await**: operações assíncronas para melhor performance  
✅ **Repository Pattern**: abstração do acesso a dados  
✅ **Service Layer**: encapsulamento de lógica de negócio  

---

## 👥 Equipe

**Trio:**
- [Nome Completo 1] - RM: [número]
- [Nome Completo 2] - RM: [número]
- [Nome Completo 3] - RM: [número]

---

## 📚 Referências

- [Documentação .NET 8](https://learn.microsoft.com/dotnet/)
- [Entity Framework Core](https://learn.microsoft.com/ef/core/)
- [ASP.NET Core Web API](https://learn.microsoft.com/aspnet/core/web-api/)
- [ODS - Objetivos de Desenvolvimento Sustentável](https://brasil.un.org/pt-br/sdgs)
- [Futuro do Trabalho - World Economic Forum](https://www.weforum.org/agenda/archive/future-of-work/)

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte da Global Solution 2025 - FIAP.

---

## 🚀 Próximos Passos (Melhorias Futuras)

- [ ] Implementar autenticação JWT
- [ ] Adicionar paginação nos endpoints de listagem
- [ ] Criar endpoint para matrícula de usuários em trilhas
- [ ] Implementar filtros e busca avançada
- [ ] Adicionar testes unitários e de integração
- [ ] Configurar CI/CD
- [ ] Implementar cache com Redis
- [ ] Adicionar logs estruturados (Serilog)
- [ ] Criar dashboard de progresso do usuário
- [ ] Implementar recomendação de trilhas baseada em IA

---

**Desenvolvido com ❤️ para a Global Solution 2025 - O Futuro do Trabalho**
