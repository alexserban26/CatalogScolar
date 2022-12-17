
using CatalogScolar.Domain.Entities;
using CatalogScolar.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CatalogScolar.Application.Commands;

public class CursDeleteCommandHandler : IRequestHandler<CursDeleteCommand, Unit>
{
    private ICursRepository _cursRepository;

    public CursDeleteCommandHandler(
        ICursRepository cursRepository)
    {
        _cursRepository = cursRepository;
    }

    public async Task<Unit> Handle(CursDeleteCommand command, CancellationToken cancellationToken)
    {
        await _cursRepository.DeleteByIdAsync(command.Id);
        await _cursRepository.SaveChangesAsync();
        return Unit.Value;
    }
}
