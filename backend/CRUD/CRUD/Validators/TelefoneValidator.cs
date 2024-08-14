using FluentValidation;
using CRUDApi.Modelos;

namespace CRUDApi.Validators
{
    public class TelefoneValidator : AbstractValidator<Telefone>
    {
        public TelefoneValidator()
        {
            RuleFor(t => t.Tipo)
                .NotEmpty().WithMessage("Tipo de telefone é obrigatório.")
                .Must(t => t == "Celular" || t == "Residencial" || t == "Comercial")
                .WithMessage("Tipo de telefone deve ser Celular, Residencial ou Comercial.");

            RuleFor(t => t.Numero)
                .NotEmpty().WithMessage("Número de telefone é obrigatório.")
                .Matches(@"^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$").WithMessage("Número de telefone inválido.");
        }
    }
}
