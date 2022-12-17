using MediatR;
using CatalogScolar.Dto;
using CatalogScolar.Security.Jwt;
using CatalogScolar.Domain.Services.Interfaces;
using CatalogScolar.Dto.Authentication;
using CatalogScolar.Web.Extensions;
using CatalogScolar.Web.Filters;
using CatalogScolar.Crosscutting.Constants;
using CatalogScolar.Application.Queries;
using CatalogScolar.Application.Commands;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace CatalogScolar.Controllers;

[Route("api")]
[ApiController]
public class UserJwtController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly ITokenProvider _tokenProvider;

    public UserJwtController(IMediator mediator, ITokenProvider tokenProvider)
    {
        _mediator = mediator;
        _tokenProvider = tokenProvider;
    }

    [HttpPost("authenticate")]
    [ValidateModel]
    public async Task<ActionResult<JwtToken>> Authorize([FromBody] LoginDto loginDto)
    {
        var user = await _mediator.Send(new UserJwtAuthorizeCommand { LoginDto = loginDto });
        var rememberMe = loginDto.RememberMe;
        var jwt = _tokenProvider.CreateToken(user, rememberMe);
        var httpHeaders = new HeaderDictionary
        {
            [JwtConstants.AuthorizationHeader] = $"{JwtConstants.BearerPrefix} {jwt}"
        };
        return Ok(new JwtToken(jwt)).WithHeaders(httpHeaders);
    }
}

public class JwtToken
{
    public JwtToken(string idToken)
    {
        IdToken = idToken;
    }

    [JsonProperty("id_token")] private string IdToken { get; }
}
