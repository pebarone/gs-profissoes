using System.ComponentModel.DataAnnotations;

namespace GsSoa.Models;

public class Usuario
{
    public long Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Nome { get; set; } = string.Empty;

    [Required]
    [MaxLength(150)]
    public string Email { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? AreaAtuacao { get; set; }

    [MaxLength(50)]
    public string? NivelCarreira { get; set; }

    public DateTime DataCadastro { get; set; }

    // Navegação
    public ICollection<Matricula> Matriculas { get; set; } = new List<Matricula>();
}
