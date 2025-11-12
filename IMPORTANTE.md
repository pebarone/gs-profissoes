# ⚠️ NOTAS IMPORTANTES - LEIA ANTES DE EXECUTAR

## 🎯 Passos Obrigatórios ANTES de Enviar

### ✅ 1. Preencher Informações da Equipe

Edite o arquivo `INTEGRANTES.md` e preencha:
- Nome completo dos 3 integrantes
- RM de cada integrante
- Número do trio (se aplicável)

### ✅ 2. Configurar o Banco de Dados

1. **Instalar MySQL 8.0+**
   - Download: https://dev.mysql.com/downloads/mysql/

2. **Criar o banco de dados**
   ```sql
   CREATE DATABASE gs_soa_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. **Configurar senha no appsettings.json**
   - Edite: `appsettings.json`
   - Linha: `"DefaultConnection": "Server=localhost;Port=3306;Database=gs_soa_db;Uid=root;Pwd=SUA_SENHA;"`
   - ⚠️ **Substitua `SUA_SENHA` pela senha do MySQL**

4. **Executar migrações**
   ```bash
   mysql -u root -p gs_soa_db < Migrations/V1__Initial_Schema.sql
   mysql -u root -p gs_soa_db < Migrations/V2__Seed_Data.sql
   ```

---

## 🚀 Como Executar o Projeto

### Método 1: Visual Studio Code
```bash
# 1. Abrir terminal no diretório do projeto
cd c:\Users\augus\Desktop\gs-soa

# 2. Restaurar dependências
dotnet restore

# 3. Executar
dotnet run
```

### Método 2: Visual Studio 2022
1. Abra o arquivo `gs-soa.sln`
2. Pressione F5 ou clique em "Executar"

### Método 3: Linha de Comando
```cmd
cd c:\Users\augus\Desktop\gs-soa
dotnet restore
dotnet build
dotnet run
```

Acesse: **http://localhost:5000**

---

## 🧪 Testar se está Funcionando

### Teste Rápido no Navegador
1. Execute o projeto
2. Abra: `http://localhost:5000`
3. Você verá a interface do Swagger
4. Teste o endpoint: `GET /api/usuarios`
5. Deve retornar 4 usuários

### Teste via PowerShell
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/usuarios" -Method Get
```

Deve retornar:
```json
[
  {
    "id": 1,
    "nome": "Ana Silva",
    "email": "ana.silva@email.com",
    ...
  },
  ...
]
```

---

## ❗ Problemas Comuns e Soluções

### 1. ❌ Erro: "Unable to connect to MySQL"

**Causa**: MySQL não está rodando ou senha incorreta

**Solução**:
1. Verifique se o MySQL está rodando
2. Teste a conexão:
   ```bash
   mysql -u root -p
   ```
3. Confirme a senha em `appsettings.json`

---

### 2. ❌ Erro: "Database 'gs_soa_db' does not exist"

**Causa**: Banco não foi criado

**Solução**:
```sql
-- No MySQL:
CREATE DATABASE gs_soa_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

### 3. ❌ Erro: "Table 'usuarios' doesn't exist"

**Causa**: Migrações não foram executadas

**Solução**:
```bash
mysql -u root -p gs_soa_db < Migrations/V1__Initial_Schema.sql
mysql -u root -p gs_soa_db < Migrations/V2__Seed_Data.sql
```

---

### 4. ❌ Erro: "Port 5000 is already in use"

**Causa**: Outra aplicação está usando a porta

**Solução 1 - Matar o processo**:
```cmd
netstat -ano | findstr :5000
taskkill /PID [número_do_pid] /F
```

**Solução 2 - Mudar a porta**:
Edite `Properties/launchSettings.json`:
```json
"applicationUrl": "http://localhost:5050"
```

---

### 5. ❌ Erro ao compilar (.NET não encontrado)

**Causa**: .NET 8 SDK não instalado

**Solução**:
1. Baixe: https://dotnet.microsoft.com/download/dotnet/8.0
2. Instale o SDK (não apenas o Runtime)
3. Verifique: `dotnet --version` (deve ser 8.0.x)

---

### 6. ❌ Erro: "Could not find a part of the path"

**Causa**: Caminho incorreto ou permissões

**Solução**:
1. Execute o terminal como Administrador
2. Navegue até a pasta correta:
   ```cmd
   cd c:\Users\augus\Desktop\gs-soa
   ```

---

## 📋 Checklist de Verificação Pré-Entrega

- [ ] MySQL instalado e rodando
- [ ] Banco `gs_soa_db` criado
- [ ] Migrações executadas (tabelas criadas)
- [ ] Seeds executados (dados inseridos)
- [ ] `appsettings.json` configurado com senha correta
- [ ] Projeto compila sem erros (`dotnet build`)
- [ ] Projeto executa sem erros (`dotnet run`)
- [ ] Swagger abre em `http://localhost:5000`
- [ ] Endpoint `GET /api/usuarios` retorna 4 usuários
- [ ] Endpoint `GET /api/trilhas` retorna 8 trilhas
- [ ] Arquivo `INTEGRANTES.md` preenchido
- [ ] Código commitado no Git
- [ ] Repositório criado no GitHub/GitLab
- [ ] Link do repositório pronto para envio

---

## 📤 Como Entregar

### 1. Criar Repositório Git

```bash
cd c:\Users\augus\Desktop\gs-soa
git init
git add .
git commit -m "Global Solution 2025 - Plataforma Upskilling/Reskilling"
```

### 2. Subir para GitHub

```bash
git remote add origin https://github.com/SEU_USUARIO/gs-soa.git
git branch -M main
git push -u origin main
```

### 3. Enviar no Teams

1. Copie o link do repositório
2. Acesse a atividade no Teams
3. Cole o link no campo de entrega
4. Anexe um arquivo TXT com:
   - Nome dos integrantes + RM
   - Link do repositório
   - Breve resumo (copie de INTEGRANTES.md)

---

## 📞 Contatos de Emergência

Se tiver problemas de última hora:
- Revise o `QUICKSTART.md`
- Consulte o `CHECKLIST.md`
- Veja exemplos no `TESTES.md`

---

## ⏰ Prazo de Entrega

**Data**: 19/11/2025  
**Horário**: 23:59  
**Plataforma**: Microsoft Teams

⚠️ **Não deixe para a última hora!**

---

## 🎯 Diferencial do Projeto

Este projeto se destaca por:
- ✅ Arquitetura profissional em camadas
- ✅ Documentação completa e detalhada
- ✅ Seeds com dados realistas do mercado
- ✅ Validações robustas
- ✅ Tratamento de erros centralizado
- ✅ Conexão clara com ODS e Futuro do Trabalho
- ✅ Código limpo e bem organizado
- ✅ Swagger para testes interativos

---

**Boa sorte na entrega! 🚀**

**Desenvolvido para Global Solution 2025 - FIAP**
