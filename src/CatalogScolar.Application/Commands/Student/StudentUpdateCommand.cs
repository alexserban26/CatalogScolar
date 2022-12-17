
using CatalogScolar.Domain.Entities;
using MediatR;

namespace CatalogScolar.Application.Commands;

public class StudentUpdateCommand : IRequest<Student>
{
    public Student Student { get; set; }
}
