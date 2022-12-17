using MediatR;

namespace CatalogScolar.Application.Commands;

public class AccountResetPasswordCommand : IRequest<Unit>
{
    public string Mail { get; set; }
}
