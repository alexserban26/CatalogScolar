
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
    [Route("api/profesors")]
    [ApiController]
    public class ProfesorsController : ControllerBase
    {
        private const string EntityName = "profesor";
        private readonly ILogger<ProfesorsController> _log;
        private readonly IMediator _mediator;

        public ProfesorsController(ILogger<ProfesorsController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<Profesor>> CreateProfesor([FromBody] Profesor profesor)
        {
            _log.LogDebug($"REST request to save Profesor : {profesor}");
            if (profesor.Id != 0)
                throw new BadRequestAlertException("A new profesor cannot already have an ID", EntityName, "idexists");
            profesor = await _mediator.Send(new ProfesorCreateCommand { Profesor = profesor });
            return CreatedAtAction(nameof(GetProfesor), new { id = profesor.Id }, profesor)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, profesor.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateProfesor(long id, [FromBody] Profesor profesor)
        {
            _log.LogDebug($"REST request to update Profesor : {profesor}");
            if (profesor.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != profesor.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            profesor = await _mediator.Send(new ProfesorUpdateCommand { Profesor = profesor });
            return Ok(profesor)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, profesor.Id.ToString()));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Profesor>>> GetAllProfesors(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Profesors");
            var result = await _mediator.Send(new ProfesorGetAllQuery { Page = pageable });
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProfesor([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get Profesor : {id}");
            var result = await _mediator.Send(new ProfesorGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProfesor([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete Profesor : {id}");
            await _mediator.Send(new ProfesorDeleteCommand { Id = id });
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
