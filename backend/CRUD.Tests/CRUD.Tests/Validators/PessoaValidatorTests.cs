using Xunit;
using FluentValidation.TestHelper;
using CRUDApi.Modelos;
using CRUDApi.Validators;

namespace CRUD.Tests.Validators
{
    public class PessoaValidatorTests
    {
        private readonly PessoaValidator _validator;

        public PessoaValidatorTests()
        {
            _validator = new PessoaValidator();
        }

        [Fact]
        public void Should_Have_Error_When_Nome_Is_Empty()
        {
            var pessoa = new Pessoa { Nome = string.Empty };
            var result = _validator.TestValidate(pessoa);
            result.ShouldHaveValidationErrorFor(p => p.Nome);
        }

        [Fact]
        public void Should_Have_Error_When_CPF_Is_Invalid()
        {
            var pessoa = new Pessoa { CPF = "123" };
            var result = _validator.TestValidate(pessoa);
            result.ShouldHaveValidationErrorFor(p => p.CPF);
        }

        [Fact]
        public void Should_Not_Have_Error_When_CPF_Is_Valid()
        {
            var pessoa = new Pessoa { CPF = "123.456.789-00" };
            var result = _validator.TestValidate(pessoa);
            result.ShouldNotHaveValidationErrorFor(p => p.CPF);
        }
    }
}
