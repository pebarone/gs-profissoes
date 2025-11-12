namespace GsSoa.DTOs;

public class TrilhaResponseDto
{
    public long Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string? Descricao { get; set; }
    public string Nivel { get; set; } = string.Empty;
    public int CargaHoraria { get; set; }
    public string? FocoPrincipal { get; set; }
}
