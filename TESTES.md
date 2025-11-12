# 🧪 Exemplos de Testes da API

## 📌 Via cURL (Windows CMD)

### Usuários

```cmd
# Listar todos os usuários
curl http://localhost:5000/api/usuarios

# Buscar usuário por ID
curl http://localhost:5000/api/usuarios/1

# Criar novo usuário
curl -X POST http://localhost:5000/api/usuarios -H "Content-Type: application/json" -d "{\"nome\":\"Teste User\",\"email\":\"teste@email.com\",\"areaAtuacao\":\"TI\",\"nivelCarreira\":\"Junior\"}"

# Atualizar usuário
curl -X PUT http://localhost:5000/api/usuarios/1 -H "Content-Type: application/json" -d "{\"nome\":\"Teste Updated\",\"email\":\"teste@email.com\",\"areaAtuacao\":\"TI\",\"nivelCarreira\":\"Pleno\"}"

# Deletar usuário
curl -X DELETE http://localhost:5000/api/usuarios/1
```

### Trilhas

```cmd
# Listar todas as trilhas
curl http://localhost:5000/api/trilhas

# Buscar trilha por ID
curl http://localhost:5000/api/trilhas/1

# Criar nova trilha
curl -X POST http://localhost:5000/api/trilhas -H "Content-Type: application/json" -d "{\"nome\":\"Nova Trilha\",\"descricao\":\"Descrição\",\"nivel\":\"INICIANTE\",\"cargaHoraria\":40,\"focoPrincipal\":\"IA\"}"

# Atualizar trilha
curl -X PUT http://localhost:5000/api/trilhas/1 -H "Content-Type: application/json" -d "{\"nome\":\"Trilha Atualizada\",\"descricao\":\"Nova desc\",\"nivel\":\"INTERMEDIARIO\",\"cargaHoraria\":60,\"focoPrincipal\":\"Dados\"}"

# Deletar trilha
curl -X DELETE http://localhost:5000/api/trilhas/1
```

---

## 📌 Via PowerShell

### Usuários

```powershell
# Listar todos os usuários
Invoke-RestMethod -Uri "http://localhost:5000/api/usuarios" -Method Get

# Buscar usuário por ID
Invoke-RestMethod -Uri "http://localhost:5000/api/usuarios/1" -Method Get

# Criar novo usuário
$body = @{
    nome = "Teste User"
    email = "teste@email.com"
    areaAtuacao = "TI"
    nivelCarreira = "Junior"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/usuarios" -Method Post -Body $body -ContentType "application/json"

# Atualizar usuário
$body = @{
    nome = "Teste Updated"
    email = "teste@email.com"
    areaAtuacao = "TI"
    nivelCarreira = "Pleno"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/usuarios/1" -Method Put -Body $body -ContentType "application/json"

# Deletar usuário
Invoke-RestMethod -Uri "http://localhost:5000/api/usuarios/1" -Method Delete
```

### Trilhas

```powershell
# Listar todas as trilhas
Invoke-RestMethod -Uri "http://localhost:5000/api/trilhas" -Method Get

# Buscar trilha por ID
Invoke-RestMethod -Uri "http://localhost:5000/api/trilhas/1" -Method Get

# Criar nova trilha
$body = @{
    nome = "Nova Trilha"
    descricao = "Descrição da trilha"
    nivel = "INICIANTE"
    cargaHoraria = 40
    focoPrincipal = "IA"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/trilhas" -Method Post -Body $body -ContentType "application/json"

# Atualizar trilha
$body = @{
    nome = "Trilha Atualizada"
    descricao = "Nova descrição"
    nivel = "INTERMEDIARIO"
    cargaHoraria = 60
    focoPrincipal = "Dados"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/trilhas/1" -Method Put -Body $body -ContentType "application/json"

# Deletar trilha
Invoke-RestMethod -Uri "http://localhost:5000/api/trilhas/1" -Method Delete
```

---

## 📌 Cenários de Teste

### ✅ Teste 1: Criar e Listar Usuário

```powershell
# 1. Criar usuário
$novoUsuario = @{
    nome = "Maria Santos"
    email = "maria.santos@email.com"
    areaAtuacao = "Análise de Dados"
    nivelCarreira = "Junior"
} | ConvertTo-Json

$criado = Invoke-RestMethod -Uri "http://localhost:5000/api/usuarios" -Method Post -Body $novoUsuario -ContentType "application/json"

Write-Host "✅ Usuário criado com ID: $($criado.id)"

# 2. Listar todos
$todos = Invoke-RestMethod -Uri "http://localhost:5000/api/usuarios" -Method Get
Write-Host "📋 Total de usuários: $($todos.Count)"

# 3. Buscar o criado
$buscado = Invoke-RestMethod -Uri "http://localhost:5000/api/usuarios/$($criado.id)" -Method Get
Write-Host "🔍 Usuário encontrado: $($buscado.nome)"
```

### ✅ Teste 2: Validação de Email Inválido

```powershell
# Tentar criar com email inválido (deve retornar erro 400)
$invalido = @{
    nome = "Teste"
    email = "email-invalido"
    areaAtuacao = "TI"
    nivelCarreira = "Junior"
} | ConvertTo-Json

try {
    Invoke-RestMethod -Uri "http://localhost:5000/api/usuarios" -Method Post -Body $invalido -ContentType "application/json"
} catch {
    Write-Host "❌ Erro esperado: Email inválido"
    $_.ErrorDetails.Message
}
```

### ✅ Teste 3: Buscar Recurso Inexistente (404)

```powershell
# Tentar buscar ID que não existe
try {
    Invoke-RestMethod -Uri "http://localhost:5000/api/usuarios/99999" -Method Get
} catch {
    Write-Host "❌ Erro 404 esperado: Usuário não encontrado"
    $_.ErrorDetails.Message
}
```

### ✅ Teste 4: Criar Trilha e Validar Carga Horária

```powershell
# 1. Criar trilha válida
$trilhaValida = @{
    nome = "Introdução à IA"
    descricao = "Conceitos básicos de Inteligência Artificial"
    nivel = "INICIANTE"
    cargaHoraria = 40
    focoPrincipal = "IA"
} | ConvertTo-Json

$trilhaCriada = Invoke-RestMethod -Uri "http://localhost:5000/api/trilhas" -Method Post -Body $trilhaValida -ContentType "application/json"
Write-Host "✅ Trilha criada: $($trilhaCriada.nome)"

# 2. Tentar criar com carga horária menor que 4 (deve dar erro 422)
$trilhaInvalida = @{
    nome = "Trilha Inválida"
    descricao = "Teste"
    nivel = "INICIANTE"
    cargaHoraria = 2
    focoPrincipal = "Teste"
} | ConvertTo-Json

try {
    Invoke-RestMethod -Uri "http://localhost:5000/api/trilhas" -Method Post -Body $trilhaInvalida -ContentType "application/json"
} catch {
    Write-Host "❌ Erro 422 esperado: Carga horária mínima não atendida"
    $_.ErrorDetails.Message
}
```

### ✅ Teste 5: Atualizar e Verificar Mudanças

```powershell
# 1. Buscar trilha original
$original = Invoke-RestMethod -Uri "http://localhost:5000/api/trilhas/1" -Method Get
Write-Host "📖 Trilha original: $($original.nome) - Nível: $($original.nivel)"

# 2. Atualizar
$atualizada = @{
    nome = $original.nome
    descricao = "Descrição atualizada em $(Get-Date)"
    nivel = "AVANCADO"
    cargaHoraria = $original.cargaHoraria + 20
    focoPrincipal = $original.focoPrincipal
} | ConvertTo-Json

$resultado = Invoke-RestMethod -Uri "http://localhost:5000/api/trilhas/1" -Method Put -Body $atualizada -ContentType "application/json"
Write-Host "✅ Trilha atualizada: Nível agora é $($resultado.nivel)"

# 3. Verificar a mudança
$verificada = Invoke-RestMethod -Uri "http://localhost:5000/api/trilhas/1" -Method Get
Write-Host "🔍 Confirmado: Nível = $($verificada.nivel), Carga = $($verificada.cargaHoraria)h"
```

---

## 📌 Script de Teste Completo

```powershell
# Script completo para testar todos os endpoints

Write-Host "🚀 Iniciando testes da API..." -ForegroundColor Green
Write-Host ""

# Teste 1: Listar usuários existentes
Write-Host "📋 Teste 1: Listar usuários" -ForegroundColor Cyan
$usuarios = Invoke-RestMethod -Uri "http://localhost:5000/api/usuarios" -Method Get
Write-Host "   Encontrados: $($usuarios.Count) usuários" -ForegroundColor Yellow
Write-Host ""

# Teste 2: Listar trilhas existentes
Write-Host "📚 Teste 2: Listar trilhas" -ForegroundColor Cyan
$trilhas = Invoke-RestMethod -Uri "http://localhost:5000/api/trilhas" -Method Get
Write-Host "   Encontradas: $($trilhas.Count) trilhas" -ForegroundColor Yellow
Write-Host ""

# Teste 3: Buscar primeira trilha
Write-Host "🔍 Teste 3: Buscar trilha ID 1" -ForegroundColor Cyan
$trilha1 = Invoke-RestMethod -Uri "http://localhost:5000/api/trilhas/1" -Method Get
Write-Host "   Nome: $($trilha1.nome)" -ForegroundColor Yellow
Write-Host "   Nível: $($trilha1.nivel)" -ForegroundColor Yellow
Write-Host "   Carga Horária: $($trilha1.cargaHoraria)h" -ForegroundColor Yellow
Write-Host ""

# Teste 4: Buscar primeiro usuário
Write-Host "👤 Teste 4: Buscar usuário ID 1" -ForegroundColor Cyan
$usuario1 = Invoke-RestMethod -Uri "http://localhost:5000/api/usuarios/1" -Method Get
Write-Host "   Nome: $($usuario1.nome)" -ForegroundColor Yellow
Write-Host "   Email: $($usuario1.email)" -ForegroundColor Yellow
Write-Host "   Nível: $($usuario1.nivelCarreira)" -ForegroundColor Yellow
Write-Host ""

Write-Host "✅ Todos os testes concluídos!" -ForegroundColor Green
```

---

## 💡 Dicas

1. **Salve como .ps1**: Salve o script completo como `testar-api.ps1`
2. **Execute**: `.\testar-api.ps1` no PowerShell
3. **Permissões**: Se houver erro, execute: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`

---

## 🌐 Testar no Navegador

Abra diretamente no navegador:
- http://localhost:5000/api/usuarios
- http://localhost:5000/api/trilhas
- http://localhost:5000/api/usuarios/1
- http://localhost:5000/api/trilhas/1

---

**Boa sorte nos testes! 🚀**
