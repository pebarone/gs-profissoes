using GsSoa.DTOs;
using GsSoa.Models;
using GsSoa.Repositories;
using GsSoa.Exceptions;

namespace GsSoa.Services;

public class UsuarioService : IUsuarioService
{
    private readonly IUsuarioRepository _repository;

    public UsuarioService(IUsuarioRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<UsuarioResponseDto>> GetAllAsync()
    {
        var usuarios = await _repository.GetAllAsync();
        return usuarios.Select(MapToResponseDto);
    }

    public async Task<UsuarioResponseDto> GetByIdAsync(long id)
    {
        var usuario = await _repository.GetByIdAsync(id);
        if (usuario == null)
        {
            throw new ResourceNotFoundException("Usuário", id);
        }
        return MapToResponseDto(usuario);
    }

    public async Task<UsuarioResponseDto> CreateAsync(UsuarioCreateDto dto)
    {
        // Validação de negócio: email único
        var usuarioExistente = await _repository.GetByEmailAsync(dto.Email);
        if (usuarioExistente != null)
        {
            throw new BusinessException($"Já existe um usuário cadastrado com o email {dto.Email}");
        }

        var usuario = new Usuario
        {
            Nome = dto.Nome,
            Email = dto.Email,
            AreaAtuacao = dto.AreaAtuacao,
            NivelCarreira = dto.NivelCarreira,
            DataCadastro = DateTime.Now
        };

        var created = await _repository.CreateAsync(usuario);
        return MapToResponseDto(created);
    }

    public async Task<UsuarioResponseDto> UpdateAsync(long id, UsuarioUpdateDto dto)
    {
        var usuario = await _repository.GetByIdAsync(id);
        if (usuario == null)
        {
            throw new ResourceNotFoundException("Usuário", id);
        }

        // Validação de negócio: email único (exceto para o próprio usuário)
        var usuarioComEmail = await _repository.GetByEmailAsync(dto.Email);
        if (usuarioComEmail != null && usuarioComEmail.Id != id)
        {
            throw new BusinessException($"Já existe outro usuário cadastrado com o email {dto.Email}");
        }

        usuario.Nome = dto.Nome;
        usuario.Email = dto.Email;
        usuario.AreaAtuacao = dto.AreaAtuacao;
        usuario.NivelCarreira = dto.NivelCarreira;

        var updated = await _repository.UpdateAsync(usuario);
        return MapToResponseDto(updated);
    }

    public async Task DeleteAsync(long id)
    {
        var exists = await _repository.ExistsAsync(id);
        if (!exists)
        {
            throw new ResourceNotFoundException("Usuário", id);
        }

        await _repository.DeleteAsync(id);
    }

    private static UsuarioResponseDto MapToResponseDto(Usuario usuario)
    {
        return new UsuarioResponseDto
        {
            Id = usuario.Id,
            Nome = usuario.Nome,
            Email = usuario.Email,
            AreaAtuacao = usuario.AreaAtuacao,
            NivelCarreira = usuario.NivelCarreira,
            DataCadastro = usuario.DataCadastro
        };
    }
}
