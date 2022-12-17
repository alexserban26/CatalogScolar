using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using JHipsterNet.Core.Pagination;
using JHipsterNet.Core.Pagination.Extensions;
using CatalogScolar.Domain.Entities;
using CatalogScolar.Domain.Repositories.Interfaces;
using CatalogScolar.Infrastructure.Data.Extensions;

namespace CatalogScolar.Infrastructure.Data.Repositories
{
    public class StudentCursRepository : GenericRepository<StudentCurs, long>, IStudentCursRepository
    {
        public StudentCursRepository(IUnitOfWork context) : base(context)
        {
        }

        public override async Task<StudentCurs> CreateOrUpdateAsync(StudentCurs studentCurs)
        {
            List<Type> entitiesToBeUpdated = new List<Type>();
            return await base.CreateOrUpdateAsync(studentCurs, entitiesToBeUpdated);
        }
    }
}
