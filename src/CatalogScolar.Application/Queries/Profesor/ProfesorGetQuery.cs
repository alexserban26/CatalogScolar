
using CatalogScolar.Domain.Entities;
using CatalogScolar.Dto;
using MediatR;

namespace CatalogScolar.Application.Queries;

public class ProfesorGetQuery : IRequest<Profesor>
{
    public long Id { get; set; }
}
