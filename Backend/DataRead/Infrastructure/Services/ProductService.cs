using DataRead.Domain.Entities;
using DataRead.Domain.Interfaces;

namespace DataRead.Infrastructure.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductDataService _productDataService;

        public ProductService(IProductDataService produtoDataService)
        {
            _productDataService = produtoDataService;
        }

        public List<Product> FilterProductsPerValue(double valorMinimo)
        {
            var produtos = _productDataService.ObterProdutos();
            return produtos.Where(p => p.Valor > valorMinimo).ToList();
        }
    }
}
