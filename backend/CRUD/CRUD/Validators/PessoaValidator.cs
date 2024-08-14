using FluentValidation;
using CRUDApi.Modelos;

namespace CRUDApi.Validators
{
    public class PessoaValidator : AbstractValidator<Pessoa>
    {
        public PessoaValidator()
        {
            RuleFor(p => p.Nome)
                .NotEmpty().WithMessage("Nome não pode ser vazio.")
                .Length(2, 100).WithMessage("Nome deve ter entre 2 e 100 caracteres.");

            RuleFor(p => p.CPF)
                .NotEmpty().WithMessage("CPF é obrigatório.")
                .Matches(@"^\d{11}$|^\d{3}\.\d{3}\.\d{3}-\d{2}$").WithMessage("CPF inválido.");

            RuleFor(p => p.DataDeNascimento)
                .NotEmpty().WithMessage("Data de Nascimento é obrigatória.")
                .LessThan(DateTime.Now).WithMessage("Data de Nascimento deve ser uma data passada.");

            RuleForEach(p => p.Telefones).SetValidator(new TelefoneValidator());
        }
    }
}
