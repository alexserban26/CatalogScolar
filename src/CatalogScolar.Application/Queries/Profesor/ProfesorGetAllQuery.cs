
using CatalogScolar.Domain.Entities;
using CatalogScolar.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace CatalogScolar.Application.Queries;

public class ProfesorGetAllQuery : IRequest<IPage<Profesor>>
{
    public IPageable Page { get; set; }
}
