using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using JHipsterNet.Core.Pagination;
using JHipsterNet.Core.Pagination.Extensions;
using CatalogScolar.Domain.Entities;
using CatalogScolar.Domain.Repositories.Interfaces;
using CatalogScolar.Infrastructure.Data.Extensions;

namespace CatalogScolar.Infrastructure.Data.Repositories
{
    public class ReadOnlyStudentCursRepository : ReadOnlyGenericRepository<StudentCurs, long>, IReadOnlyStudentCursRepository
    {
        public ReadOnlyStudentCursRepository(IUnitOfWork context) : base(context)
        {
        }
    }
}
