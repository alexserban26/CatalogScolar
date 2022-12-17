
using CatalogScolar.Domain.Entities;
using CatalogScolar.Dto;
using CatalogScolar.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;

namespace CatalogScolar.Application.Queries;

public class CursGetAllQueryHandler : IRequestHandler<CursGetAllQuery, IPage<Curs>>
{
    private IReadOnlyCursRepository _cursRepository;

    public CursGetAllQueryHandler(
        IReadOnlyCursRepository cursRepository)
    {
        _cursRepository = cursRepository;
    }

    public async Task<IPage<Curs>> Handle(CursGetAllQuery request, CancellationToken cancellationToken)
    {
        var page = await _cursRepository.QueryHelper()
            .Include(curs => curs.Profesor)
            .GetPageAsync(request.Page);
        return page;
    }
}
