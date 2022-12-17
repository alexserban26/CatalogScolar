
using CatalogScolar.Domain.Entities;
using MediatR;

namespace CatalogScolar.Application.Commands;

public class CursCreateCommand : IRequest<Curs>
{
    public Curs Curs { get; set; }
}
