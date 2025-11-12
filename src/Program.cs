using Microsoft.EntityFrameworkCore;
using GsSoa.Data;
using GsSoa.Repositories;
using GsSoa.Services;
using GsSoa.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configuração do DbContext com MySQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Injeção de Dependência - Repositories
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<ITrilhaRepository, TrilhaRepository>();

// Injeção de Dependência - Services
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<ITrilhaService, TrilhaService>();

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() 
    { 
        Title = "API Plataforma de Upskilling/Reskilling", 
        Version = "v1",
        Description = "API RESTful para plataforma de capacitação profissional voltada ao futuro do trabalho 2030+",
        Contact = new() 
        { 
            Name = "Global Solution 2025",
            Email = "contato@futurotrabalho.com"
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Plataforma de Upskilling/Reskilling v1");
        c.RoutePrefix = string.Empty; // Swagger na raiz
    });
}

// Middleware de tratamento de exceções
app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
