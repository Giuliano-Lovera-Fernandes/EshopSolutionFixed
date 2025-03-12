using DataRead.Domain.Entities;
using DataRead.Domain.Interfaces;
using Newtonsoft.Json.Linq;

namespace DataRead.Infrastructure.Services
{
    public class ProductDataService : IProductDataService
    {
        private readonly string _caminhoArquivoJson;
        public ProductDataService(string caminhoArquivoJson)
        {
            _caminhoArquivoJson = caminhoArquivoJson;
        }

        public List<Product> ObterProdutos()
        {
            var json = File.ReadAllText(_caminhoArquivoJson);
            JArray jsonArray = JArray.Parse(json);

            return jsonArray.Select(item => new Product
            {
                Dia = item["dia"].Value<int>(),
                Valor = item["valor"].Value<double>()
            }).ToList();
        }
    }
}
