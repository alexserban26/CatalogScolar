
using CatalogScolar.Domain.Entities;
using MediatR;

namespace CatalogScolar.Application.Commands;

public class StudentCreateCommand : IRequest<Student>
{
    public Student Student { get; set; }
}
