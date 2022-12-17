
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
    [Route("api/student-curs")]
    [ApiController]
    public class StudentCursController : ControllerBase
    {
        private const string EntityName = "studentCurs";
        private readonly ILogger<StudentCursController> _log;
        private readonly IMediator _mediator;

        public StudentCursController(ILogger<StudentCursController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<StudentCurs>> CreateStudentCurs([FromBody] StudentCurs studentCurs)
        {
            _log.LogDebug($"REST request to save StudentCurs : {studentCurs}");
            if (studentCurs.Id != 0)
                throw new BadRequestAlertException("A new studentCurs cannot already have an ID", EntityName, "idexists");
            studentCurs = await _mediator.Send(new StudentCursCreateCommand { StudentCurs = studentCurs });
            return CreatedAtAction(nameof(GetStudentCurs), new { id = studentCurs.Id }, studentCurs)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, studentCurs.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateStudentCurs(long id, [FromBody] StudentCurs studentCurs)
        {
            _log.LogDebug($"REST request to update StudentCurs : {studentCurs}");
            if (studentCurs.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != studentCurs.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            studentCurs = await _mediator.Send(new StudentCursUpdateCommand { StudentCurs = studentCurs });
            return Ok(studentCurs)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, studentCurs.Id.ToString()));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentCurs>>> GetAllStudentCurs(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of StudentCurs");
            var result = await _mediator.Send(new StudentCursGetAllQuery { Page = pageable });
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStudentCurs([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get StudentCurs : {id}");
            var result = await _mediator.Send(new StudentCursGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudentCurs([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete StudentCurs : {id}");
            await _mediator.Send(new StudentCursDeleteCommand { Id = id });
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
