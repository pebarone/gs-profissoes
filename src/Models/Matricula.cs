using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GsSoa.Models;

[Table("matriculas")]
public class Matricula
{
    [Key]
    [Column("id")]
    public long Id { get; set; }

    [Required]
    [Column("usuario_id")]
    public long UsuarioId { get; set; }

    [Required]
    [Column("trilha_id")]
    public long TrilhaId { get; set; }

    [Required]
    [Column("data_inscricao")]
    public DateTime DataInscricao { get; set; }

    [Required]
    [MaxLength(50)]
    [Column("status")]
    public string Status { get; set; } = string.Empty;

    // Navegação
    public Usuario Usuario { get; set; } = null!;
    public Trilha Trilha { get; set; } = null!;
}
