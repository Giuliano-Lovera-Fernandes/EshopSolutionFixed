using DataRead.Domain.Entities;

namespace DataRead.Domain.Interfaces
{
    public interface IProductDataService
    {
        List<Product> ObterProdutos();
    }
}
