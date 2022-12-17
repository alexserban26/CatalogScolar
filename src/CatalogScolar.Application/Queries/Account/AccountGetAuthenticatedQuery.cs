using CatalogScolar.Domain.Entities;
using MediatR;
using CatalogScolar.Dto;
using System.Security.Claims;

namespace CatalogScolar.Application.Commands;

public class AccountGetAuthenticatedQuery : IRequest<string>
{
    public ClaimsPrincipal User { get; set; }
}
