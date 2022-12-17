using CatalogScolar.Domain.Entities;
using MediatR;
using CatalogScolar.Dto;

namespace CatalogScolar.Application.Commands;

public class UserUpdateCommand : IRequest<User>
{
    public UserDto UserDto { get; set; }
}
