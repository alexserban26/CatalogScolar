
using CatalogScolar.Domain.Entities;
using MediatR;

namespace CatalogScolar.Application.Commands;

public class StudentCursUpdateCommand : IRequest<StudentCurs>
{
    public StudentCurs StudentCurs { get; set; }
}
