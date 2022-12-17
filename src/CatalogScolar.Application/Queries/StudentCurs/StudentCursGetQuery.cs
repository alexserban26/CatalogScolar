
using CatalogScolar.Domain.Entities;
using CatalogScolar.Dto;
using MediatR;

namespace CatalogScolar.Application.Queries;

public class StudentCursGetQuery : IRequest<StudentCurs>
{
    public long Id { get; set; }
}
