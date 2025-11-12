# ⚡ Guia Rápido de Execução

## 🚀 Início Rápido (5 passos)

### 1. Instalar .NET 8
```bash
# Verificar se já está instalado
dotnet --version
# Deve retornar: 8.0.x
```
Se não tiver, baixe em: https://dotnet.microsoft.com/download/dotnet/8.0

### 2. Configurar MySQL
```sql
-- No MySQL, execute:
CREATE DATABASE gs_soa_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Configurar conexão
Edite `appsettings.json` e configure sua senha do MySQL:
```json
"DefaultConnection": "Server=localhost;Port=3306;Database=gs_soa_db;Uid=root;Pwd=SUA_SENHA;"
```

### 4. Executar migrações
```bash
# No MySQL ou MySQL Workbench:
mysql -u root -p gs_soa_db < Migrations/V1__Initial_Schema.sql
mysql -u root -p gs_soa_db < Migrations/V2__Seed_Data.sql
```

### 5. Rodar o projeto
```bash
dotnet restore
dotnet run
```

Acesse: **http://localhost:5000**

---

## 📌 Comandos Úteis

```bash
# Restaurar dependências
dotnet restore

# Compilar
dotnet build

# Executar
dotnet run

# Executar com watch (recarrega automaticamente)
dotnet watch run

# Limpar build
dotnet clean
```

---

## 🧪 Teste Rápido

Após iniciar a aplicação, teste no navegador:

1. Abra: `http://localhost:5000`
2. No Swagger, teste o endpoint: `GET /api/usuarios`
3. Deve retornar 4 usuários de exemplo

---

## ❗ Problemas Comuns

### Erro de conexão com MySQL
✅ Verifique se o MySQL está rodando  
✅ Confira usuário e senha no `appsettings.json`  
✅ Certifique-se de que o banco `gs_soa_db` existe

### Porta já em uso
```bash
# Altere a porta em Properties/launchSettings.json
# Ou mate o processo na porta 5000:
netstat -ano | findstr :5000
taskkill /PID [número_do_pid] /F
```

### Dependências não encontradas
```bash
dotnet restore
dotnet build
```

---

## 📱 URLs Importantes

- **API Base**: http://localhost:5000
- **Swagger UI**: http://localhost:5000
- **Swagger JSON**: http://localhost:5000/swagger/v1/swagger.json

---

✅ **Pronto!** Sua API está funcionando!
