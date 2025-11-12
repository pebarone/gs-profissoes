using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GsSoa.Models;

[Table("usuarios")]
public class Usuario
{
    [Key]
    [Column("id")]
    public long Id { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("nome")]
    public string Nome { get; set; } = string.Empty;

    [Required]
    [MaxLength(150)]
    [Column("email")]
    public string Email { get; set; } = string.Empty;

    [MaxLength(100)]
    [Column("area_atuacao")]
    public string? AreaAtuacao { get; set; }

    [MaxLength(50)]
    [Column("nivel_carreira")]
    public string? NivelCarreira { get; set; }

    [Column("data_cadastro")]
    public DateTime DataCadastro { get; set; }

    // Navegação
    public ICollection<Matricula> Matriculas { get; set; } = new List<Matricula>();
}
