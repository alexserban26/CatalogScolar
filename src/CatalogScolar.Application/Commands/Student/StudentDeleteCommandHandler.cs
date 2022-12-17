
using CatalogScolar.Domain.Entities;
using CatalogScolar.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CatalogScolar.Application.Commands;

public class StudentDeleteCommandHandler : IRequestHandler<StudentDeleteCommand, Unit>
{
    private IStudentRepository _studentRepository;

    public StudentDeleteCommandHandler(
        IStudentRepository studentRepository)
    {
        _studentRepository = studentRepository;
    }

    public async Task<Unit> Handle(StudentDeleteCommand command, CancellationToken cancellationToken)
    {
        await _studentRepository.DeleteByIdAsync(command.Id);
        await _studentRepository.SaveChangesAsync();
        return Unit.Value;
    }
}
