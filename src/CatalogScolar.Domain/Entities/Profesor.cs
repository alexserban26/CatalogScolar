using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CatalogScolar.Domain.Entities
{
    [Table("profesor")]
    public class Profesor : BaseEntity<long>
    {
        [Required]
        public string Nume { get; set; }
        [Required]
        public string Mail { get; set; }

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var profesor = obj as Profesor;
            if (profesor?.Id == null || profesor?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, profesor.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "Profesor{" +
                    $"ID='{Id}'" +
                    $", Nume='{Nume}'" +
                    $", Mail='{Mail}'" +
                    "}";
        }
    }
}
