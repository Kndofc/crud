using System.ComponentModel.DataAnnotations;

namespace CRUDApi.Modelos
{
    public class Telefone
    {
        public int Id { get; set; }

        [Required]
        [StringLength(15)]
        public string Tipo { get; set; }

        [Required]
        [StringLength(20)]
        public string Numero { get; set; }

        public int PessoaId { get; set; }
    }
}
