using CatalogScolar.Domain.Entities;
using MediatR;
using CatalogScolar.Dto;

namespace CatalogScolar.Application.Commands;

public class AccountCreateCommand : IRequest<User>
{
    public ManagedUserDto ManagedUserDto { get; set; }
}
