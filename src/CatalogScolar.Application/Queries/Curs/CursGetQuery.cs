
using CatalogScolar.Domain.Entities;
using CatalogScolar.Dto;
using MediatR;

namespace CatalogScolar.Application.Queries;

public class CursGetQuery : IRequest<Curs>
{
    public long Id { get; set; }
}
