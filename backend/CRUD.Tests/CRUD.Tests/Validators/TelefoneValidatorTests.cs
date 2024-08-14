using Xunit;
using FluentValidation.TestHelper;
using CRUDApi.Modelos;
using CRUDApi.Validators;

namespace CRUD.Tests.Validators
{
    public class TelefoneValidatorTests
    {
        private readonly TelefoneValidator _validator;

        public TelefoneValidatorTests()
        {
            _validator = new TelefoneValidator();
        }

        [Fact]
        public void Should_Have_Error_When_Tipo_Is_Invalid()
        {
            var telefone = new Telefone { Tipo = "Fax" };
            var result = _validator.TestValidate(telefone);
            result.ShouldHaveValidationErrorFor(t => t.Tipo);
        }

        [Fact]
        public void Should_Have_Error_When_Numero_Is_Invalid()
        {
            var telefone = new Telefone { Numero = "1234" };
            var result = _validator.TestValidate(telefone);
            result.ShouldHaveValidationErrorFor(t => t.Numero);
        }

        [Fact]
        public void Should_Not_Have_Error_When_Numero_Is_Valid()
        {
            var telefone = new Telefone { Numero = "(11) 98765-4321" };
            var result = _validator.TestValidate(telefone);
            result.ShouldNotHaveValidationErrorFor(t => t.Numero);
        }
    }
}
