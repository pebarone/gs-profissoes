namespace GsSoa.DTOs;

public class UsuarioResponseDto
{
    public long Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? AreaAtuacao { get; set; }
    public string? NivelCarreira { get; set; }
    public DateTime DataCadastro { get; set; }
}
