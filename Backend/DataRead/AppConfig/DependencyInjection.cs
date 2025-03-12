using DataRead.Application.UseCases;
using DataRead.Domain.Interfaces;
using DataRead.Infrastructure.Services;

namespace DataRead.AppConfig
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, string caminhoArquivoJson)
        {
            // Registrar os serviços necessários para a infraestrutura
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IProductDataService>(provider => new ProductDataService(caminhoArquivoJson));

            // Registrar o caso de uso
            services.AddScoped<FilterProductUseCase>();

            return services;
        }
    }
}
