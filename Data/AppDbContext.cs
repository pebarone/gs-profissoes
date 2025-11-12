using Microsoft.EntityFrameworkCore;
using GsSoa.Models;

namespace GsSoa.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Trilha> Trilhas { get; set; }
    public DbSet<Competencia> Competencias { get; set; }
    public DbSet<TrilhaCompetencia> TrilhaCompetencias { get; set; }
    public DbSet<Matricula> Matriculas { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuração da chave composta para TrilhaCompetencia
        modelBuilder.Entity<TrilhaCompetencia>()
            .HasKey(tc => new { tc.TrilhaId, tc.CompetenciaId });

        // Relacionamento Trilha -> TrilhaCompetencia
        modelBuilder.Entity<TrilhaCompetencia>()
            .HasOne(tc => tc.Trilha)
            .WithMany(t => t.TrilhaCompetencias)
            .HasForeignKey(tc => tc.TrilhaId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relacionamento Competencia -> TrilhaCompetencia
        modelBuilder.Entity<TrilhaCompetencia>()
            .HasOne(tc => tc.Competencia)
            .WithMany(c => c.TrilhaCompetencias)
            .HasForeignKey(tc => tc.CompetenciaId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relacionamento Usuario -> Matricula
        modelBuilder.Entity<Matricula>()
            .HasOne(m => m.Usuario)
            .WithMany(u => u.Matriculas)
            .HasForeignKey(m => m.UsuarioId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relacionamento Trilha -> Matricula
        modelBuilder.Entity<Matricula>()
            .HasOne(m => m.Trilha)
            .WithMany(t => t.Matriculas)
            .HasForeignKey(m => m.TrilhaId)
            .OnDelete(DeleteBehavior.Cascade);

        // Índice único para email de usuário
        modelBuilder.Entity<Usuario>()
            .HasIndex(u => u.Email)
            .IsUnique();
    }
}
