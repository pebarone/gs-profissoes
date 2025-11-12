using System.ComponentModel.DataAnnotations;

namespace GsSoa.Models;

public class Matricula
{
    public long Id { get; set; }

    [Required]
    public long UsuarioId { get; set; }

    [Required]
    public long TrilhaId { get; set; }

    [Required]
    public DateTime DataInscricao { get; set; }

    [Required]
    [MaxLength(50)]
    public string Status { get; set; } = string.Empty;

    // Navegação
    public Usuario Usuario { get; set; } = null!;
    public Trilha Trilha { get; set; } = null!;
}
