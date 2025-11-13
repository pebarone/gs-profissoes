# ========================================
# Stage 1: Build
# ========================================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

# Copiar apenas arquivos de projeto primeiro (melhor cache)
COPY ["gs-profissoes.csproj", "./"]

# Restaurar dependências
RUN dotnet restore "gs-profissoes.csproj"

# Copiar o restante do código
COPY . .

# Build e Publish em um único comando
RUN dotnet publish "gs-profissoes.csproj" -c Release -o /app/publish \
    --no-restore \
    /p:UseAppHost=false

# ========================================
# Stage 2: Runtime (Final)
# ========================================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

# Instalar certificados CA atualizados
RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Criar usuário não-root para execução
RUN groupadd -r appuser && \
    useradd -r -g appuser -u 1001 appuser && \
    mkdir -p /app /app/static && \
    chown -R appuser:appuser /app

WORKDIR /app

# Copiar arquivos publicados
COPY --from=build --chown=appuser:appuser /app/publish .

# Copiar diretório static se existir na raiz do projeto
COPY --from=build --chown=appuser:appuser /src/static ./static

# Configurar ambiente de produção
ENV ASPNETCORE_ENVIRONMENT=Production \
    ASPNETCORE_URLS=http://+:5000 \
    DOTNET_RUNNING_IN_CONTAINER=true \
    DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false \
    # Security hardening
    DOTNET_EnableDiagnostics=0 \
    ASPNETCORE_HOSTFILTERING_INCLUDEHOSTS=false

# Usar porta não-privilegiada
EXPOSE 5000

# Configurar health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1

# Rodar como usuário não-root
USER appuser

# Definir entrypoint
ENTRYPOINT ["dotnet", "gs-profissoes.dll"]