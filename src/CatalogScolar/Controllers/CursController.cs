
using MediatR;
using System.Threading;
using System.Collections.Generic;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using CatalogScolar.Domain.Entities;
using CatalogScolar.Crosscutting.Exceptions;
using CatalogScolar.Web.Extensions;
using CatalogScolar.Web.Filters;
using CatalogScolar.Web.Rest.Utilities;
using CatalogScolar.Application.Queries;
using CatalogScolar.Application.Commands;
using CatalogScolar.Infrastructure.Web.Rest.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace CatalogScolar.Controllers
{
    [Authorize]
    [Route("api/curs")]
    [ApiController]
    public class CursController : ControllerBase
    {
        private const string EntityName = "curs";
        private readonly ILogger<CursController> _log;
        private readonly IMediator _mediator;

        public CursController(ILogger<CursController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<Curs>> CreateCurs([FromBody] Curs curs)
        {
            _log.LogDebug($"REST request to save Curs : {curs}");
            if (curs.Id != 0)
                throw new BadRequestAlertException("A new curs cannot already have an ID", EntityName, "idexists");
            curs = await _mediator.Send(new CursCreateCommand { Curs = curs });
            return CreatedAtAction(nameof(GetCurs), new { id = curs.Id }, curs)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, curs.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateCurs(long id, [FromBody] Curs curs)
        {
            _log.LogDebug($"REST request to update Curs : {curs}");
            if (curs.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != curs.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            curs = await _mediator.Send(new CursUpdateCommand { Curs = curs });
            return Ok(curs)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, curs.Id.ToString()));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Curs>>> GetAllCurs(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Curs");
            var result = await _mediator.Send(new CursGetAllQuery { Page = pageable });
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCurs([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get Curs : {id}");
            var result = await _mediator.Send(new CursGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCurs([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete Curs : {id}");
            await _mediator.Send(new CursDeleteCommand { Id = id });
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
