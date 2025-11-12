using System.ComponentModel.DataAnnotations;

namespace GsSoa.Models;

public class Competencia
{
    public long Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Nome { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? Categoria { get; set; }

    public string? Descricao { get; set; }

    // Navegação
    public ICollection<TrilhaCompetencia> TrilhaCompetencias { get; set; } = new List<TrilhaCompetencia>();
}
