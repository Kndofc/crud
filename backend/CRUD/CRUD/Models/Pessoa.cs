using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CRUDApi.Modelos
{
    public class Pessoa
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Nome { get; set; }

        [Required]
        [RegularExpression(@"^\d{11}$|^\d{3}\.\d{3}\.\d{3}-\d{2}$", ErrorMessage = "CPF inválido")]
        public string CPF { get; set; }

        [Required]
        public DateTime DataDeNascimento { get; set; }

        public bool EstaAtivo { get; set; } = true;

        public ICollection<Telefone> Telefones { get; set; } = new List<Telefone>();
    }
}
