
using CatalogScolar.Domain.Entities;
using CatalogScolar.Dto;
using CatalogScolar.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CatalogScolar.Application.Queries;

public class StudentGetQueryHandler : IRequestHandler<StudentGetQuery, Student>
{
    private IReadOnlyStudentRepository _studentRepository;

    public StudentGetQueryHandler(
        IReadOnlyStudentRepository studentRepository)
    {
        _studentRepository = studentRepository;
    }

    public async Task<Student> Handle(StudentGetQuery request, CancellationToken cancellationToken)
    {
        var entity = await _studentRepository.QueryHelper()
            .GetOneAsync(student => student.Id == request.Id);
        return entity;
    }
}
