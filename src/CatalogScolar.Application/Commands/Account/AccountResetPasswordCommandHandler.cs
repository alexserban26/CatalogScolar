using CatalogScolar.Domain.Services.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using CatalogScolar.Crosscutting.Exceptions;

namespace CatalogScolar.Application.Commands;

public class AccountResetPasswordCommandHandler : IRequestHandler<AccountResetPasswordCommand, Unit>
{
    private readonly IUserService _userService;
    private readonly IMailService _mailService;

    public AccountResetPasswordCommandHandler(IUserService userService, IMailService mailService)
    {
        _userService = userService;
        _mailService = mailService;
    }

    public async Task<Unit> Handle(AccountResetPasswordCommand command, CancellationToken cancellationToken)
    {
        var user = await _userService.RequestPasswordReset(command.Mail);
        if (user == null) throw new EmailNotFoundException();

        await _mailService.SendPasswordResetMail(user);
        return Unit.Value;
    }
}
