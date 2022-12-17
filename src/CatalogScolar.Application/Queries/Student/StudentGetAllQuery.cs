
using CatalogScolar.Domain.Entities;
using CatalogScolar.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace CatalogScolar.Application.Queries;

public class StudentGetAllQuery : IRequest<IPage<Student>>
{
    public IPageable Page { get; set; }
}
