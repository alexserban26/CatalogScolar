using MediatR;
using System.Collections.Generic;

namespace CatalogScolar.Application.Queries;

public class UserGetAuthoritiesQuery : IRequest<IEnumerable<string>>
{
}
