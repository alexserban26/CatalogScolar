
using CatalogScolar.Domain.Entities;
using CatalogScolar.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CatalogScolar.Application.Commands;

public class CursUpdateCommandHandler : IRequestHandler<CursUpdateCommand, Curs>
{
    private ICursRepository _cursRepository;

    public CursUpdateCommandHandler(
        ICursRepository cursRepository)
    {
        _cursRepository = cursRepository;
    }

    public async Task<Curs> Handle(CursUpdateCommand command, CancellationToken cancellationToken)
    {
        var entity = await _cursRepository.CreateOrUpdateAsync(command.Curs);
        await _cursRepository.SaveChangesAsync();
        return entity;
    }
}
