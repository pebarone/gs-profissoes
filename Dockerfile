# ========================================
# Stage 1: Build
# ========================================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

# Copiar arquivo de projeto e restaurar dependências
COPY gs-profissoes.csproj ./
RUN dotnet restore gs-profissoes.csproj

# Copiar todo o código e buildar
COPY . ./
RUN dotnet build gs-profissoes.csproj -c Release -o /app/build

# ========================================
# Stage 2: Publish
# ========================================
FROM build AS publish
RUN dotnet publish gs-profissoes.csproj -c Release -o /app/publish

# ========================================
# Stage 3: Runtime
# ========================================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app

# Instalar dependências necessárias
RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Criar usuário não-root
RUN groupadd -r appuser && \
    useradd -r -g appuser -u 1001 appuser && \
    mkdir -p /app/static && \
    chown -R appuser:appuser /app

# Copiar arquivos publicados
COPY --from=publish /app/publish .

# Copiar diretório static
COPY --from=build /src/static ./static

# Copiar postman collection
COPY --from=build /src/postman_collection.json ./postman_collection.json

# Configurar variáveis de ambiente
ENV ASPNETCORE_ENVIRONMENT=Production \
    ASPNETCORE_URLS=http://+:5000 \
    DOTNET_RUNNING_IN_CONTAINER=true \
    DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false \
    DOTNET_EnableDiagnostics=0

# Expor porta
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1

# Executar como usuário não-root
USER appuser

# Entrypoint
ENTRYPOINT ["dotnet", "gs-profissoes.dll"]