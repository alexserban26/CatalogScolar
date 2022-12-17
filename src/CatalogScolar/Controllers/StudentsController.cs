
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
    [Route("api/students")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private const string EntityName = "student";
        private readonly ILogger<StudentsController> _log;
        private readonly IMediator _mediator;

        public StudentsController(ILogger<StudentsController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<Student>> CreateStudent([FromBody] Student student)
        {
            _log.LogDebug($"REST request to save Student : {student}");
            if (student.Id != 0)
                throw new BadRequestAlertException("A new student cannot already have an ID", EntityName, "idexists");
            student = await _mediator.Send(new StudentCreateCommand { Student = student });
            return CreatedAtAction(nameof(GetStudent), new { id = student.Id }, student)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, student.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateStudent(long id, [FromBody] Student student)
        {
            _log.LogDebug($"REST request to update Student : {student}");
            if (student.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != student.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            student = await _mediator.Send(new StudentUpdateCommand { Student = student });
            return Ok(student)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, student.Id.ToString()));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetAllStudents(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Students");
            var result = await _mediator.Send(new StudentGetAllQuery { Page = pageable });
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStudent([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get Student : {id}");
            var result = await _mediator.Send(new StudentGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete Student : {id}");
            await _mediator.Send(new StudentDeleteCommand { Id = id });
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
