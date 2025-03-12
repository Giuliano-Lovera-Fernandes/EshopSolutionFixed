using DataRead.Domain.Entities;
using DataRead.Domain.Interfaces;

namespace DataRead.Application.UseCases
{
    public class FilterProductUseCase
    {
        private readonly IProductService _produtoService;

        public FilterProductUseCase(IProductService produtoService)
        {
            _produtoService = produtoService;
        }

        public List<Product> Executar(double valorMinimo)
        {
            return _produtoService.FilterProductsPerValue(valorMinimo);
        }
    }
}
