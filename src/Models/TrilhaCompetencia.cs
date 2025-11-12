using System.ComponentModel.DataAnnotations.Schema;

namespace GsSoa.Models;

[Table("trilha_competencia")]
public class TrilhaCompetencia
{
    [Column("trilha_id")]
    public long TrilhaId { get; set; }

    [Column("competencia_id")]
    public long CompetenciaId { get; set; }

    // Navegação
    public Trilha Trilha { get; set; } = null!;
    public Competencia Competencia { get; set; } = null!;
}
