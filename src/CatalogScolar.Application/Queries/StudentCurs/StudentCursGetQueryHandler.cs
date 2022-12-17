
using CatalogScolar.Domain.Entities;
using CatalogScolar.Dto;
using CatalogScolar.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CatalogScolar.Application.Queries;

public class StudentCursGetQueryHandler : IRequestHandler<StudentCursGetQuery, StudentCurs>
{
    private IReadOnlyStudentCursRepository _studentCursRepository;

    public StudentCursGetQueryHandler(
        IReadOnlyStudentCursRepository studentCursRepository)
    {
        _studentCursRepository = studentCursRepository;
    }

    public async Task<StudentCurs> Handle(StudentCursGetQuery request, CancellationToken cancellationToken)
    {
        var entity = await _studentCursRepository.QueryHelper()
            .Include(studentCurs => studentCurs.Student)
            .Include(studentCurs => studentCurs.Curs)
            .GetOneAsync(studentCurs => studentCurs.Id == request.Id);
        return entity;
    }
}
