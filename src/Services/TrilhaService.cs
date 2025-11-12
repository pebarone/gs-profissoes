using GsSoa.DTOs;
using GsSoa.Models;
using GsSoa.Repositories;
using GsSoa.Exceptions;

namespace GsSoa.Services;

public class TrilhaService : ITrilhaService
{
    private readonly ITrilhaRepository _repository;

    public TrilhaService(ITrilhaRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<TrilhaResponseDto>> GetAllAsync()
    {
        var trilhas = await _repository.GetAllAsync();
        return trilhas.Select(MapToResponseDto);
    }

    public async Task<TrilhaResponseDto> GetByIdAsync(long id)
    {
        var trilha = await _repository.GetByIdAsync(id);
        if (trilha == null)
        {
            throw new ResourceNotFoundException("Trilha", id);
        }
        return MapToResponseDto(trilha);
    }

    public async Task<TrilhaResponseDto> CreateAsync(TrilhaCreateDto dto)
    {
        // Validação de negócio adicional (exemplo: carga horária mínima)
        if (dto.CargaHoraria < 4)
        {
            throw new BusinessException("A carga horária mínima de uma trilha deve ser de 4 horas");
        }

        var trilha = new Trilha
        {
            Nome = dto.Nome,
            Descricao = dto.Descricao,
            Nivel = dto.Nivel,
            CargaHoraria = dto.CargaHoraria,
            FocoPrincipal = dto.FocoPrincipal
        };

        var created = await _repository.CreateAsync(trilha);
        return MapToResponseDto(created);
    }

    public async Task<TrilhaResponseDto> UpdateAsync(long id, TrilhaUpdateDto dto)
    {
        var trilha = await _repository.GetByIdAsync(id);
        if (trilha == null)
        {
            throw new ResourceNotFoundException("Trilha", id);
        }

        // Validação de negócio adicional
        if (dto.CargaHoraria < 4)
        {
            throw new BusinessException("A carga horária mínima de uma trilha deve ser de 4 horas");
        }

        trilha.Nome = dto.Nome;
        trilha.Descricao = dto.Descricao;
        trilha.Nivel = dto.Nivel;
        trilha.CargaHoraria = dto.CargaHoraria;
        trilha.FocoPrincipal = dto.FocoPrincipal;

        var updated = await _repository.UpdateAsync(trilha);
        return MapToResponseDto(updated);
    }

    public async Task DeleteAsync(long id)
    {
        var exists = await _repository.ExistsAsync(id);
        if (!exists)
        {
            throw new ResourceNotFoundException("Trilha", id);
        }

        await _repository.DeleteAsync(id);
    }

    private static TrilhaResponseDto MapToResponseDto(Trilha trilha)
    {
        return new TrilhaResponseDto
        {
            Id = trilha.Id,
            Nome = trilha.Nome,
            Descricao = trilha.Descricao,
            Nivel = trilha.Nivel,
            CargaHoraria = trilha.CargaHoraria,
            FocoPrincipal = trilha.FocoPrincipal
        };
    }
}
