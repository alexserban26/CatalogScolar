using CatalogScolar.Domain.Entities;
using MediatR;
using CatalogScolar.Dto.Authentication;

namespace CatalogScolar.Application.Commands;

public class AccountResetPasswordFinishCommand : IRequest<User>
{
    public KeyAndPasswordDto KeyAndPasswordDto { get; set; }
}
