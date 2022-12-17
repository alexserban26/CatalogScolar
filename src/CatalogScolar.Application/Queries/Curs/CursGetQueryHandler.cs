
using CatalogScolar.Domain.Entities;
using CatalogScolar.Dto;
using CatalogScolar.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CatalogScolar.Application.Queries;

public class CursGetQueryHandler : IRequestHandler<CursGetQuery, Curs>
{
    private IReadOnlyCursRepository _cursRepository;

    public CursGetQueryHandler(
        IReadOnlyCursRepository cursRepository)
    {
        _cursRepository = cursRepository;
    }

    public async Task<Curs> Handle(CursGetQuery request, CancellationToken cancellationToken)
    {
        var entity = await _cursRepository.QueryHelper()
            .Include(curs => curs.Profesor)
            .GetOneAsync(curs => curs.Id == request.Id);
        return entity;
    }
}
