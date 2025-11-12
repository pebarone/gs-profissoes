# 📂 Estrutura Completa do Projeto

```
gs-soa/
│
├── 📄 .gitignore                          # Arquivos ignorados pelo Git
├── 📄 appsettings.json                    # Configurações da aplicação (connection string)
├── 📄 appsettings.Development.json        # Configurações de desenvolvimento
├── 📄 gs-soa.csproj                       # Arquivo do projeto .NET
├── 📄 README.md                           # Documentação principal ⭐
├── 📄 postman_collection.json             # Coleção Postman para testes
│
├── � Properties/
│   └── launchSettings.json                # Configurações de execução
│
├── � src/                                # 📦 CÓDIGO-FONTE DA APLICAÇÃO
│   │
│   ├── 📄 Program.cs                      # Ponto de entrada da aplicação
│   │
│   ├── 📁 Controllers/                    # 🎯 Camada de Controle (Endpoints REST)
│   │   ├── UsuariosController.cs          # CRUD de Usuários
│   │   └── TrilhasController.cs           # CRUD de Trilhas
│   │
│   ├── 📁 Services/                       # 💼 Camada de Serviço (Lógica de Negócio)
│   │   ├── IUsuarioService.cs             # Interface do serviço de usuários
│   │   ├── UsuarioService.cs              # Implementação do serviço de usuários
│   │   ├── ITrilhaService.cs              # Interface do serviço de trilhas
│   │   └── TrilhaService.cs               # Implementação do serviço de trilhas
│   │
│   ├── 📁 Repositories/                   # 🗄️ Camada de Repositório (Acesso a Dados)
│   │   ├── IUsuarioRepository.cs          # Interface do repositório de usuários
│   │   ├── UsuarioRepository.cs           # Implementação do repositório de usuários
│   │   ├── ITrilhaRepository.cs           # Interface do repositório de trilhas
│   │   └── TrilhaRepository.cs            # Implementação do repositório de trilhas
│   │
│   ├── 📁 Models/                         # 📊 Entidades do Domínio
│   │   ├── Usuario.cs                     # Entidade Usuário
│   │   ├── Trilha.cs                      # Entidade Trilha
│   │   ├── Competencia.cs                 # Entidade Competência
│   │   ├── TrilhaCompetencia.cs           # Relação N:N Trilha-Competência
│   │   └── Matricula.cs                   # Entidade Matrícula
│   │
│   ├── 📁 DTOs/                           # 📦 Data Transfer Objects
│   │   ├── UsuarioCreateDto.cs            # DTO para criação de usuário
│   │   ├── UsuarioUpdateDto.cs            # DTO para atualização de usuário
│   │   ├── UsuarioResponseDto.cs          # DTO de resposta de usuário
│   │   ├── TrilhaCreateDto.cs             # DTO para criação de trilha
│   │   ├── TrilhaUpdateDto.cs             # DTO para atualização de trilha
│   │   └── TrilhaResponseDto.cs           # DTO de resposta de trilha
│   │
│   ├── 📁 Data/                           # 🔗 Contexto do Banco de Dados
│   │   └── AppDbContext.cs                # DbContext do Entity Framework Core
│   │
│   ├── 📁 Exceptions/                     # ⚠️ Exceções Customizadas
│   │   ├── ResourceNotFoundException.cs   # Exceção para recurso não encontrado (404)
│   │   └── BusinessException.cs           # Exceção para regras de negócio (422)
│   │
│   └── 📁 Middleware/                     # 🛡️ Middlewares
│       └── ExceptionHandlingMiddleware.cs # Middleware de tratamento de exceções
│
├── 📁 docs/                               # 📚 DOCUMENTAÇÃO DO PROJETO
│   ├── INDEX.md                           # Índice de navegação
│   ├── QUICKSTART.md                      # Guia rápido (5 passos)
│   ├── IMPORTANTE.md                      # Notas importantes
│   ├── CHECKLIST.md                       # Verificação de requisitos
│   ├── TESTES.md                          # Exemplos de testes
│   ├── ESTRUTURA.md                       # Este arquivo (Arquitetura)
│   ├── RESUMO_EXECUTIVO.md                # Resumo do projeto
│   └── INTEGRANTES.md                     # Informações da equipe
│
└── 📁 Migrations/                         # 🗃️ Scripts SQL de Migração
    ├── V1__Initial_Schema.sql             # Criação de tabelas
    └── V2__Seed_Data.sql                  # Dados iniciais (seeds)
```

---

## 📊 Arquitetura em Camadas

```
┌──────────────────────────────────────────────────┐
│              HTTP Requests / Responses            │
└───────────────────┬──────────────────────────────┘
                    │
    ┌───────────────▼────────────────┐
    │   CONTROLLERS LAYER            │  ← UsuariosController, TrilhasController
    │   (HTTP Endpoints)             │     Recebe requisições REST
    └───────────────┬────────────────┘
                    │
    ┌───────────────▼────────────────┐
    │   SERVICES LAYER               │  ← UsuarioService, TrilhaService
    │   (Business Logic)             │     Validações e regras de negócio
    └───────────────┬────────────────┘
                    │
    ┌───────────────▼────────────────┐
    │   REPOSITORIES LAYER           │  ← UsuarioRepository, TrilhaRepository
    │   (Data Access)                │     Operações com o banco
    └───────────────┬────────────────┘
                    │
    ┌───────────────▼────────────────┐
    │   DATA LAYER                   │  ← AppDbContext (EF Core)
    │   (ORM)                        │     Entity Framework Core
    └───────────────┬────────────────┘
                    │
    ┌───────────────▼────────────────┐
    │   DATABASE                     │  ← MySQL 8.0
    │   (MySQL)                      │     Armazenamento persistente
    └────────────────────────────────┘
```

---

## 🔄 Fluxo de uma Requisição

### Exemplo: GET /api/usuarios/1

```
1. Cliente HTTP
   │
   ├─> GET /api/usuarios/1
   │
2. UsuariosController
   │
   ├─> GetById(1)
   │   │
   │   └─> Chama UsuarioService.GetByIdAsync(1)
   │
3. UsuarioService
   │
   ├─> Chama UsuarioRepository.GetByIdAsync(1)
   │
4. UsuarioRepository
   │
   ├─> Executa query no banco via EF Core
   │   │
   │   └─> SELECT * FROM usuarios WHERE id = 1
   │
5. AppDbContext (EF Core)
   │
   ├─> Mapeia resultado para objeto Usuario
   │
6. UsuarioService
   │
   ├─> Converte Usuario → UsuarioResponseDto
   │
7. UsuariosController
   │
   ├─> Retorna 200 OK + JSON do UsuarioResponseDto
   │
8. Cliente HTTP
   │
   └─> Recebe resposta JSON
```

---

## 📈 Estatísticas do Projeto

| Componente | Quantidade |
|------------|-----------|
| **Controllers** | 2 |
| **Services** | 2 interfaces + 2 implementações |
| **Repositories** | 2 interfaces + 2 implementações |
| **Models** | 5 entidades |
| **DTOs** | 6 classes |
| **Exceptions** | 2 customizadas |
| **Middlewares** | 1 |
| **Migrações SQL** | 2 scripts |
| **Endpoints** | 10 (5 por CRUD) |
| **Arquivos de Doc** | 5 (README, QUICKSTART, etc.) |

---

## 🎯 CRUDs Implementados

### CRUD 1: Usuários
```
POST   /api/usuarios        → Criar
GET    /api/usuarios        → Listar todos
GET    /api/usuarios/{id}   → Buscar por ID
PUT    /api/usuarios/{id}   → Atualizar
DELETE /api/usuarios/{id}   → Deletar
```

### CRUD 2: Trilhas
```
POST   /api/trilhas         → Criar
GET    /api/trilhas         → Listar todas
GET    /api/trilhas/{id}    → Buscar por ID
PUT    /api/trilhas/{id}    → Atualizar
DELETE /api/trilhas/{id}    → Deletar
```

---

## 🛠️ Tecnologias por Camada

| Camada | Tecnologia |
|--------|-----------|
| **Controllers** | ASP.NET Core Web API, Swagger |
| **Services** | C# 12, LINQ |
| **Repositories** | Entity Framework Core |
| **Data** | EF Core, Pomelo MySQL Provider |
| **Validações** | Data Annotations |
| **Exceptions** | Middleware customizado |
| **Database** | MySQL 8.0 |

---

## ✅ Status

**Total de Arquivos**: 40+  
**Linhas de Código**: ~2000+  
**Arquitetura**: ✅ Em camadas  
**CRUDs**: ✅ 2 completos  
**Validações**: ✅ Implementadas  
**Exceções**: ✅ Tratamento centralizado  
**Documentação**: ✅ Completa  
**Seeds**: ✅ 12 competências + 8 trilhas  

---

**Projeto pronto para entrega! 🚀**
