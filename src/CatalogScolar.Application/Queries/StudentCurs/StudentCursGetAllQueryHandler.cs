
using CatalogScolar.Domain.Entities;
using CatalogScolar.Dto;
using CatalogScolar.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;

namespace CatalogScolar.Application.Queries;

public class StudentCursGetAllQueryHandler : IRequestHandler<StudentCursGetAllQuery, IPage<StudentCurs>>
{
    private IReadOnlyStudentCursRepository _studentCursRepository;

    public StudentCursGetAllQueryHandler(
        IReadOnlyStudentCursRepository studentCursRepository)
    {
        _studentCursRepository = studentCursRepository;
    }

    public async Task<IPage<StudentCurs>> Handle(StudentCursGetAllQuery request, CancellationToken cancellationToken)
    {
        var page = await _studentCursRepository.QueryHelper()
            .Include(studentCurs => studentCurs.Student)
            .Include(studentCurs => studentCurs.Curs)
            .GetPageAsync(request.Page);
        return page;
    }
}
