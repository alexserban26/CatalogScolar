
using CatalogScolar.Domain.Entities;
using CatalogScolar.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CatalogScolar.Application.Commands;

public class StudentUpdateCommandHandler : IRequestHandler<StudentUpdateCommand, Student>
{
    private IStudentRepository _studentRepository;

    public StudentUpdateCommandHandler(
        IStudentRepository studentRepository)
    {
        _studentRepository = studentRepository;
    }

    public async Task<Student> Handle(StudentUpdateCommand command, CancellationToken cancellationToken)
    {
        var entity = await _studentRepository.CreateOrUpdateAsync(command.Student);
        await _studentRepository.SaveChangesAsync();
        return entity;
    }
}
