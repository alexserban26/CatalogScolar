
using CatalogScolar.Domain.Entities;
using CatalogScolar.Dto;
using CatalogScolar.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CatalogScolar.Application.Queries;

public class ProfesorGetQueryHandler : IRequestHandler<ProfesorGetQuery, Profesor>
{
    private IReadOnlyProfesorRepository _profesorRepository;

    public ProfesorGetQueryHandler(
        IReadOnlyProfesorRepository profesorRepository)
    {
        _profesorRepository = profesorRepository;
    }

    public async Task<Profesor> Handle(ProfesorGetQuery request, CancellationToken cancellationToken)
    {
        var entity = await _profesorRepository.QueryHelper()
            .GetOneAsync(profesor => profesor.Id == request.Id);
        return entity;
    }
}
