using MediatR;
using CatalogScolar.Dto;
using System.Security.Claims;

namespace CatalogScolar.Application.Commands;

public class AccountSaveCommand : IRequest<Unit>
{
    public ClaimsPrincipal User { get; set; }
    public UserDto UserDto { get; set; }
}
