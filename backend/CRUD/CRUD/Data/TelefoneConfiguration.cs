using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using CRUDApi.Modelos;

namespace CRUDApi.Data
{
    public class TelefoneConfiguration : IEntityTypeConfiguration<Telefone>
    {
        public void Configure(EntityTypeBuilder<Telefone> builder)
        {
            builder.HasKey(t => t.Id);

            builder.Property(t => t.Tipo)
                   .IsRequired()
                   .HasMaxLength(15);

            builder.Property(t => t.Numero)
                   .IsRequired()
                   .HasMaxLength(20);

            builder.Property(t => t.PessoaId)
                   .IsRequired();
        }
    }
}
