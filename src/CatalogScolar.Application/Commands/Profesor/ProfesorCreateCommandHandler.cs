
using CatalogScolar.Domain.Entities;
using CatalogScolar.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CatalogScolar.Application.Commands;

public class ProfesorCreateCommandHandler : IRequestHandler<ProfesorCreateCommand, Profesor>
{
    private IProfesorRepository _profesorRepository;

    public ProfesorCreateCommandHandler(
        IProfesorRepository profesorRepository)
    {
        _profesorRepository = profesorRepository;
    }

    public async Task<Profesor> Handle(ProfesorCreateCommand command, CancellationToken cancellationToken)
    {
        var entity = await _profesorRepository.CreateOrUpdateAsync(command.Profesor);
        await _profesorRepository.SaveChangesAsync();
        return entity;
    }
}
