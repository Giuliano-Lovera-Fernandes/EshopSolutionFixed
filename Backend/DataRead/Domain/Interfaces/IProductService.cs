using DataRead.Domain.Entities;

namespace DataRead.Domain.Interfaces
{
    public interface IProductService
    {
        List<Product> FilterProductsPerValue(double valorMinimo);
    }
}
