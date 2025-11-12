using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GsSoa.Models;

[Table("trilhas")]
public class Trilha
{
    [Key]
    [Column("id")]
    public long Id { get; set; }

    [Required]
    [MaxLength(150)]
    [Column("nome")]
    public string Nome { get; set; } = string.Empty;

    [Column("descricao")]
    public string? Descricao { get; set; }

    [Required]
    [MaxLength(50)]
    [Column("nivel")]
    public string Nivel { get; set; } = string.Empty;

    [Required]
    [Column("carga_horaria")]
    public int CargaHoraria { get; set; }

    [MaxLength(100)]
    [Column("foco_principal")]
    public string? FocoPrincipal { get; set; }

    // Navegação
    public ICollection<TrilhaCompetencia> TrilhaCompetencias { get; set; } = new List<TrilhaCompetencia>();
    public ICollection<Matricula> Matriculas { get; set; } = new List<Matricula>();
}
