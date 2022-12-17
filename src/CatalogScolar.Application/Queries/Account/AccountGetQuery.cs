using MediatR;
using CatalogScolar.Dto;

namespace CatalogScolar.Application.Commands;

public class AccountGetQuery : IRequest<UserDto>
{
}
