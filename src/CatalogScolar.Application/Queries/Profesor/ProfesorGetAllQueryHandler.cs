
using CatalogScolar.Domain.Entities;
using CatalogScolar.Dto;
using CatalogScolar.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;

namespace CatalogScolar.Application.Queries;

public class ProfesorGetAllQueryHandler : IRequestHandler<ProfesorGetAllQuery, IPage<Profesor>>
{
    private IReadOnlyProfesorRepository _profesorRepository;

    public ProfesorGetAllQueryHandler(
        IReadOnlyProfesorRepository profesorRepository)
    {
        _profesorRepository = profesorRepository;
    }

    public async Task<IPage<Profesor>> Handle(ProfesorGetAllQuery request, CancellationToken cancellationToken)
    {
        var page = await _profesorRepository.QueryHelper()
            .GetPageAsync(request.Page);
        return page;
    }
}
