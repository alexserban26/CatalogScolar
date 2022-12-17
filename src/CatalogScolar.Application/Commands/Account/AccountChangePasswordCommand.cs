using MediatR;
using CatalogScolar.Dto.Authentication;

namespace CatalogScolar.Application.Commands;

public class AccountChangePasswordCommand : IRequest<Unit>
{
    public PasswordChangeDto PasswordChangeDto { get; set; }
}
