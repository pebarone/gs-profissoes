using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GsSoa.Models;

[Table("competencias")]
public class Competencia
{
    [Key]
    [Column("id")]
    public long Id { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("nome")]
    public string Nome { get; set; } = string.Empty;

    [MaxLength(100)]
    [Column("categoria")]
    public string? Categoria { get; set; }

    [Column("descricao")]
    public string? Descricao { get; set; }

    // Navegação
    public ICollection<TrilhaCompetencia> TrilhaCompetencias { get; set; } = new List<TrilhaCompetencia>();
}
