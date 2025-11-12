namespace GsSoa.Models;

public class TrilhaCompetencia
{
    public long TrilhaId { get; set; }
    public long CompetenciaId { get; set; }

    // Navegação
    public Trilha Trilha { get; set; } = null!;
    public Competencia Competencia { get; set; } = null!;
}
