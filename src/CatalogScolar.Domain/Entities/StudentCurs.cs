using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CatalogScolar.Domain.Entities
{
    [Table("student_curs")]
    public class StudentCurs : BaseEntity<long>
    {
        [Required]
        public int? Nota { get; set; }
        public long? StudentId { get; set; }
        public Student Student { get; set; }
        public long? CursId { get; set; }
        public Curs Curs { get; set; }

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var studentCurs = obj as StudentCurs;
            if (studentCurs?.Id == null || studentCurs?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, studentCurs.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "StudentCurs{" +
                    $"ID='{Id}'" +
                    $", Nota='{Nota}'" +
                    "}";
        }
    }
}
