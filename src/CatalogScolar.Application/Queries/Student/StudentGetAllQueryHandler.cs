
using CatalogScolar.Domain.Entities;
using CatalogScolar.Dto;
using CatalogScolar.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;

namespace CatalogScolar.Application.Queries;

public class StudentGetAllQueryHandler : IRequestHandler<StudentGetAllQuery, IPage<Student>>
{
    private IReadOnlyStudentRepository _studentRepository;

    public StudentGetAllQueryHandler(
        IReadOnlyStudentRepository studentRepository)
    {
        _studentRepository = studentRepository;
    }

    public async Task<IPage<Student>> Handle(StudentGetAllQuery request, CancellationToken cancellationToken)
    {
        var page = await _studentRepository.QueryHelper()
            .GetPageAsync(request.Page);
        return page;
    }
}
