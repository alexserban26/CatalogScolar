
using CatalogScolar.Domain.Entities;

namespace CatalogScolar.Domain.Repositories.Interfaces
{

    public interface IReadOnlyStudentRepository : IReadOnlyGenericRepository<Student, long>
    {
    }

}
