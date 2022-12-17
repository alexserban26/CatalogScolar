using CatalogScolar.Domain.Entities;
using MediatR;

namespace CatalogScolar.Application.Commands;

public class UserDeleteCommand : IRequest<Unit>
{
    public string Login { get; set; }
}
