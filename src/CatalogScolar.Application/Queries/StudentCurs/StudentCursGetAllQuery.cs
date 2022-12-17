
using CatalogScolar.Domain.Entities;
using CatalogScolar.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace CatalogScolar.Application.Queries;

public class StudentCursGetAllQuery : IRequest<IPage<StudentCurs>>
{
    public IPageable Page { get; set; }
}
