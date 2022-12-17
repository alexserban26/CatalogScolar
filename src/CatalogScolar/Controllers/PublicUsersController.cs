using MediatR;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using JHipsterNet.Core.Pagination.Extensions;
using CatalogScolar.Domain.Entities;
using CatalogScolar.Security;
using CatalogScolar.Domain.Services.Interfaces;
using CatalogScolar.Dto;
using CatalogScolar.Web.Extensions;
using CatalogScolar.Web.Filters;
using CatalogScolar.Web.Rest.Problems;
using CatalogScolar.Web.Rest.Utilities;
using CatalogScolar.Crosscutting.Constants;
using CatalogScolar.Crosscutting.Exceptions;
using CatalogScolar.Infrastructure.Web.Rest.Utilities;
using CatalogScolar.Application.Queries;
using CatalogScolar.Application.Commands;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CatalogScolar.Controllers;


[Route("api/users")]
[ApiController]
public class PublicUsersController : ControllerBase
{
    private readonly ILogger<UsersController> _log;
    private readonly IMediator _mediator;

    public PublicUsersController(ILogger<UsersController> log, IMediator mediator)
    {
        _log = log;
        _mediator = mediator;
    }


    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAllPublicUsers(IPageable pageable)
    {
        _log.LogDebug("REST request to get a page of Users");
        (var headers, var userDtos) = await _mediator.Send(new UserGetAllPublicUsersQuery { Page = pageable });
        return Ok(userDtos).WithHeaders(headers);
    }

}
