
using CatalogScolar.Domain.Entities;
using CatalogScolar.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CatalogScolar.Application.Commands;

public class StudentCreateCommandHandler : IRequestHandler<StudentCreateCommand, Student>
{
    private IStudentRepository _studentRepository;

    public StudentCreateCommandHandler(
        IStudentRepository studentRepository)
    {
        _studentRepository = studentRepository;
    }

    public async Task<Student> Handle(StudentCreateCommand command, CancellationToken cancellationToken)
    {
        var entity = await _studentRepository.CreateOrUpdateAsync(command.Student);
        await _studentRepository.SaveChangesAsync();
        return entity;
    }
}
