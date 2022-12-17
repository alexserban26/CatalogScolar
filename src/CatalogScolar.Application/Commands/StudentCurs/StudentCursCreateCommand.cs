
using CatalogScolar.Domain.Entities;
using MediatR;

namespace CatalogScolar.Application.Commands;

public class StudentCursCreateCommand : IRequest<StudentCurs>
{
    public StudentCurs StudentCurs { get; set; }
}
