using CatalogScolar.Domain.Entities;
using MediatR;

namespace CatalogScolar.Application.Commands;

public class ProfesorDeleteCommand : IRequest<Unit>
{
    public long Id { get; set; }
}
