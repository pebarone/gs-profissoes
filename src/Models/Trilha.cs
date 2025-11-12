using System.ComponentModel.DataAnnotations;

namespace GsSoa.Models;

public class Trilha
{
    public long Id { get; set; }

    [Required]
    [MaxLength(150)]
    public string Nome { get; set; } = string.Empty;

    public string? Descricao { get; set; }

    [Required]
    [MaxLength(50)]
    public string Nivel { get; set; } = string.Empty;

    [Required]
    public int CargaHoraria { get; set; }

    [MaxLength(100)]
    public string? FocoPrincipal { get; set; }

    // Navegação
    public ICollection<TrilhaCompetencia> TrilhaCompetencias { get; set; } = new List<TrilhaCompetencia>();
    public ICollection<Matricula> Matriculas { get; set; } = new List<Matricula>();
}
