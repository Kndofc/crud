using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CRUDApi.Data;
using CRUDApi.Modelos;

namespace CRUDApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PessoasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PessoasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> GetPessoas()
        {
            return await _context.Pessoas.Include(p => p.Telefones).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Pessoa>> GetPessoa(int id)
        {
            var pessoa = await _context.Pessoas.Include(p => p.Telefones).FirstOrDefaultAsync(p => p.Id == id);

            if (pessoa == null)
            {
                return NotFound();
            }

            return pessoa;
        }

        [HttpPost]
        public async Task<ActionResult<Pessoa>> PostPessoa(Pessoa pessoa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPessoa), new { id = pessoa.Id }, pessoa);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPessoa(int id, Pessoa pessoa)
        {
            if (id != pessoa.Id)
            {
                return BadRequest();
            }

            var existingPessoa = await _context.Pessoas.Include(p => p.Telefones).FirstOrDefaultAsync(p => p.Id == id);

            if (existingPessoa == null)
            {
                return NotFound();
            }

            Console.WriteLine("Telefones existentes antes da atualização: ");
            foreach (var telefone in existingPessoa.Telefones)
            {
                Console.WriteLine($"Tipo: {telefone.Tipo}, Número: {telefone.Numero}");
            }

            existingPessoa.Nome = pessoa.Nome;
            existingPessoa.CPF = pessoa.CPF;
            existingPessoa.DataDeNascimento = pessoa.DataDeNascimento;
            existingPessoa.EstaAtivo = pessoa.EstaAtivo;

            _context.Telefones.RemoveRange(existingPessoa.Telefones);

            existingPessoa.Telefones = pessoa.Telefones;

            Console.WriteLine("Novos telefones a serem salvos: ");
            foreach (var telefone in existingPessoa.Telefones)
            {
                Console.WriteLine($"Tipo: {telefone.Tipo}, Número: {telefone.Numero}");
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PessoaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePessoa(int id)
        {
            var pessoa = await _context.Pessoas.FindAsync(id);
            if (pessoa == null)
            {
                return NotFound();
            }

            _context.Pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PessoaExists(int id)
        {
            return _context.Pessoas.Any(e => e.Id == id);
        }
    }
}
