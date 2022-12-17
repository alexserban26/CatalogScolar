
using CatalogScolar.Domain.Entities;
using CatalogScolar.Dto;
using MediatR;

namespace CatalogScolar.Application.Queries;

public class StudentGetQuery : IRequest<Student>
{
    public long Id { get; set; }
}
