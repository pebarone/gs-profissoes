# 📚 Índice de Navegação do Projeto

## 🎯 Por Onde Começar?

### 1️⃣ Primeira Vez Aqui?
👉 Leia: **[IMPORTANTE.md](IMPORTANTE.md)** - Notas essenciais antes de começar

### 2️⃣ Quer Executar Rápido?
👉 Siga: **[QUICKSTART.md](QUICKSTART.md)** - Apenas 5 passos para rodar

### 3️⃣ Precisa de Detalhes Completos?
👉 Leia: **[README.md](README.md)** - Documentação completa do projeto

### 4️⃣ Quer Ver a Arquitetura?
👉 Veja: **[ESTRUTURA.md](ESTRUTURA.md)** - Visão completa da estrutura

### 5️⃣ Vai Testar a API?
👉 Use: **[TESTES.md](TESTES.md)** - Exemplos prontos (cURL, PowerShell)

### 6️⃣ Precisa do Checklist?
👉 Confira: **[CHECKLIST.md](CHECKLIST.md)** - Verificação de requisitos

### 7️⃣ Quer Ver o Resumo?
👉 Leia: **[RESUMO_EXECUTIVO.md](RESUMO_EXECUTIVO.md)** - Visão geral do projeto

### 8️⃣ Informações da Equipe?
👉 Edite: **[INTEGRANTES.md](INTEGRANTES.md)** - Preencha com seus dados

---

## 📂 Estrutura de Pastas

### 🎯 Controllers (Endpoints REST)
```
Controllers/
├── UsuariosController.cs    → CRUD de Usuários
└── TrilhasController.cs     → CRUD de Trilhas
```

### 💼 Services (Regras de Negócio)
```
Services/
├── IUsuarioService.cs       → Interface
├── UsuarioService.cs        → Implementação
├── ITrilhaService.cs        → Interface
└── TrilhaService.cs         → Implementação
```

### 🗄️ Repositories (Acesso a Dados)
```
Repositories/
├── IUsuarioRepository.cs    → Interface
├── UsuarioRepository.cs     → Implementação
├── ITrilhaRepository.cs     → Interface
└── TrilhaRepository.cs      → Implementação
```

### 📊 Models (Entidades)
```
Models/
├── Usuario.cs               → Profissionais da plataforma
├── Trilha.cs                → Trilhas de aprendizagem
├── Competencia.cs           → Competências do futuro
├── TrilhaCompetencia.cs     → Relação N:N
└── Matricula.cs             → Inscrições em trilhas
```

### 📦 DTOs (Transfer Objects)
```
DTOs/
├── UsuarioCreateDto.cs      → Criar usuário
├── UsuarioUpdateDto.cs      → Atualizar usuário
├── UsuarioResponseDto.cs    → Retornar usuário
├── TrilhaCreateDto.cs       → Criar trilha
├── TrilhaUpdateDto.cs       → Atualizar trilha
└── TrilhaResponseDto.cs     → Retornar trilha
```

### 🗃️ Migrations (SQL Scripts)
```
Migrations/
├── V1__Initial_Schema.sql   → Criação de tabelas
└── V2__Seed_Data.sql        → Dados iniciais
```

---

## 🔗 Links Rápidos de Documentação

| Documento | Para que serve | Quando usar |
|-----------|----------------|-------------|
| [README.md](README.md) | Documentação completa | Entender o projeto todo |
| [IMPORTANTE.md](IMPORTANTE.md) | Notas críticas | ANTES de executar |
| [QUICKSTART.md](QUICKSTART.md) | Guia rápido | Executar rapidamente |
| [ESTRUTURA.md](ESTRUTURA.md) | Arquitetura | Entender a organização |
| [TESTES.md](TESTES.md) | Exemplos de teste | Testar os endpoints |
| [CHECKLIST.md](CHECKLIST.md) | Lista de verificação | Antes de entregar |
| [RESUMO_EXECUTIVO.md](RESUMO_EXECUTIVO.md) | Visão geral | Apresentação executiva |
| [INTEGRANTES.md](INTEGRANTES.md) | Dados da equipe | Preencher para entrega |

---

## 🎓 Fluxo Recomendado

### Para Desenvolvedores
```
1. IMPORTANTE.md      → Entender pré-requisitos
2. QUICKSTART.md      → Executar o projeto
3. ESTRUTURA.md       → Entender arquitetura
4. README.md          → Detalhes completos
5. TESTES.md          → Testar endpoints
```

### Para Avaliadores
```
1. RESUMO_EXECUTIVO.md → Visão geral
2. CHECKLIST.md        → Verificar requisitos
3. README.md           → Documentação completa
4. ESTRUTURA.md        → Arquitetura
5. Executar o projeto  → Testar funcionamento
```

### Para Apresentação
```
1. RESUMO_EXECUTIVO.md → Slides executivos
2. ESTRUTURA.md        → Diagramas de arquitetura
3. TESTES.md           → Demonstração ao vivo
4. README.md           → Documentação de apoio
```

---

## 🎯 Endpoints da API

### Base URL
```
http://localhost:5000
```

### Usuários
```
GET    /api/usuarios        → Listar todos
GET    /api/usuarios/{id}   → Buscar por ID
POST   /api/usuarios        → Criar novo
PUT    /api/usuarios/{id}   → Atualizar
DELETE /api/usuarios/{id}   → Deletar
```

### Trilhas
```
GET    /api/trilhas         → Listar todas
GET    /api/trilhas/{id}    → Buscar por ID
POST   /api/trilhas         → Criar nova
PUT    /api/trilhas/{id}    → Atualizar
DELETE /api/trilhas/{id}    → Deletar
```

---

## 🛠️ Ferramentas Incluídas

- **Swagger UI**: http://localhost:5000 (Documentação interativa)
- **Postman Collection**: `postman_collection.json` (Importar no Postman)
- **Scripts PowerShell**: Ver `TESTES.md`
- **Scripts cURL**: Ver `TESTES.md`

---

## 📞 Suporte Rápido

### Problema com Banco?
👉 Veja seção "Problemas Comuns" em [IMPORTANTE.md](IMPORTANTE.md)

### Erro ao Compilar?
👉 Verifique pré-requisitos em [QUICKSTART.md](QUICKSTART.md)

### Dúvidas sobre Arquitetura?
👉 Consulte diagramas em [ESTRUTURA.md](ESTRUTURA.md)

### Não sabe como testar?
👉 Exemplos completos em [TESTES.md](TESTES.md)

---

## ✅ Antes de Entregar

1. [ ] Preencher [INTEGRANTES.md](INTEGRANTES.md)
2. [ ] Verificar [CHECKLIST.md](CHECKLIST.md)
3. [ ] Testar todos os endpoints
4. [ ] Criar repositório Git
5. [ ] Fazer commit do código
6. [ ] Enviar link no Teams

---

## 🏆 Sobre o Projeto

**Nome**: API Plataforma de Upskilling/Reskilling 2030+  
**Tema**: O Futuro do Trabalho  
**Disciplina**: Arquitetura Orientada a Serviços (3ESPY)  
**Instituição**: FIAP  
**Ano**: 2025  

**Tecnologia Principal**: .NET 8 / C# 12  
**Banco de Dados**: MySQL 8.0  
**Arquitetura**: Camadas (Controller → Service → Repository → Data)  

---

**Navegue pelos documentos usando os links acima! 📚**
