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
    public class StudentRepository : GenericRepository<Student, long>, IStudentRepository
    {
        public StudentRepository(IUnitOfWork context) : base(context)
        {
        }

        public override async Task<Student> CreateOrUpdateAsync(Student student)
        {
            List<Type> entitiesToBeUpdated = new List<Type>();
            return await base.CreateOrUpdateAsync(student, entitiesToBeUpdated);
        }
    }
}
