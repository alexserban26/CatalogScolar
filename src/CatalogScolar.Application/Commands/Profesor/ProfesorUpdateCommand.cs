
using CatalogScolar.Domain.Entities;
using MediatR;

namespace CatalogScolar.Application.Commands;

public class ProfesorUpdateCommand : IRequest<Profesor>
{
    public Profesor Profesor { get; set; }
}
