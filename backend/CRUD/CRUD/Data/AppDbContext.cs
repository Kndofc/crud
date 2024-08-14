using Microsoft.EntityFrameworkCore;
using CRUDApi.Modelos;

namespace CRUDApi.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Pessoa> Pessoas { get; set; }
        public DbSet<Telefone> Telefones { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new PessoaConfiguration());
            modelBuilder.ApplyConfiguration(new TelefoneConfiguration());
        }
    }
}
