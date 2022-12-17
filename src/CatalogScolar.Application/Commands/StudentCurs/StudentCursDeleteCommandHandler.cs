
using CatalogScolar.Domain.Entities;
using CatalogScolar.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CatalogScolar.Application.Commands;

public class StudentCursDeleteCommandHandler : IRequestHandler<StudentCursDeleteCommand, Unit>
{
    private IStudentCursRepository _studentCursRepository;

    public StudentCursDeleteCommandHandler(
        IStudentCursRepository studentCursRepository)
    {
        _studentCursRepository = studentCursRepository;
    }

    public async Task<Unit> Handle(StudentCursDeleteCommand command, CancellationToken cancellationToken)
    {
        await _studentCursRepository.DeleteByIdAsync(command.Id);
        await _studentCursRepository.SaveChangesAsync();
        return Unit.Value;
    }
}
