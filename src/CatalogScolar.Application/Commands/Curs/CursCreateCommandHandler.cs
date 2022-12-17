
using CatalogScolar.Domain.Entities;
using CatalogScolar.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CatalogScolar.Application.Commands;

public class CursCreateCommandHandler : IRequestHandler<CursCreateCommand, Curs>
{
    private ICursRepository _cursRepository;

    public CursCreateCommandHandler(
        ICursRepository cursRepository)
    {
        _cursRepository = cursRepository;
    }

    public async Task<Curs> Handle(CursCreateCommand command, CancellationToken cancellationToken)
    {
        var entity = await _cursRepository.CreateOrUpdateAsync(command.Curs);
        await _cursRepository.SaveChangesAsync();
        return entity;
    }
}
