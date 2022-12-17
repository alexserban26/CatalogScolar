
using CatalogScolar.Domain.Entities;
using CatalogScolar.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace CatalogScolar.Application.Queries;

public class CursGetAllQuery : IRequest<IPage<Curs>>
{
    public IPageable Page { get; set; }
}
