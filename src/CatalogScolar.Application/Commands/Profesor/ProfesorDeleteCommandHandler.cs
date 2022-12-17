
using CatalogScolar.Domain.Entities;
using CatalogScolar.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CatalogScolar.Application.Commands;

public class ProfesorDeleteCommandHandler : IRequestHandler<ProfesorDeleteCommand, Unit>
{
    private IProfesorRepository _profesorRepository;

    public ProfesorDeleteCommandHandler(
        IProfesorRepository profesorRepository)
    {
        _profesorRepository = profesorRepository;
    }

    public async Task<Unit> Handle(ProfesorDeleteCommand command, CancellationToken cancellationToken)
    {
        await _profesorRepository.DeleteByIdAsync(command.Id);
        await _profesorRepository.SaveChangesAsync();
        return Unit.Value;
    }
}
