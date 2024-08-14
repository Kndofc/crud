using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using CRUDApi.Modelos;

namespace CRUDApi.Data
{
    public class PessoaConfiguration : IEntityTypeConfiguration<Pessoa>
    {
        public void Configure(EntityTypeBuilder<Pessoa> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Nome)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(p => p.CPF)
                   .IsRequired()
                   .HasMaxLength(14)
                   .IsFixedLength();

            builder.Property(p => p.DataDeNascimento)
                   .IsRequired();

            builder.Property(p => p.EstaAtivo)
                   .IsRequired();

            builder.HasMany(p => p.Telefones)
                   .WithOne()
                   .HasForeignKey(t => t.PessoaId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
