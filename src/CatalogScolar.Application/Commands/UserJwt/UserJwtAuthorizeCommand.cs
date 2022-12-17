using MediatR;
using CatalogScolar.Dto.Authentication;
using System.Security.Principal;

namespace CatalogScolar.Application.Commands;

public class UserJwtAuthorizeCommand : IRequest<IPrincipal>
{
    public LoginDto LoginDto { get; set; }
}
