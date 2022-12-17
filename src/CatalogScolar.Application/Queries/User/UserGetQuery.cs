using CatalogScolar.Dto;
using MediatR;

namespace CatalogScolar.Application.Queries;

public class UserGetQuery : IRequest<UserDto>
{
    public string Login { get; set; }
}
