
using CatalogScolar.Domain.Entities;
using MediatR;

namespace CatalogScolar.Application.Commands;

public class CursUpdateCommand : IRequest<Curs>
{
    public Curs Curs { get; set; }
}
