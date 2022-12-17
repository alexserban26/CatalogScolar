using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CatalogScolar.Domain.Entities
{
    [Table("student")]
    public class Student : BaseEntity<long>
    {
        [Required]
        public string Nume { get; set; }
        [Required]
        public string Mail { get; set; }
        public IList<StudentCurs> StudentCurs { get; set; } = new List<StudentCurs>();

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var student = obj as Student;
            if (student?.Id == null || student?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, student.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "Student{" +
                    $"ID='{Id}'" +
                    $", Nume='{Nume}'" +
                    $", Mail='{Mail}'" +
                    "}";
        }
    }
}
