//using DataRead.AppConfig;
//using DataRead.Application.UseCases;

//var builder = WebApplication.CreateBuilder(args);
//var app = builder.Build();

//app.MapGet("/", () => "Hello World, Hello Giuliano!");

//app.Run();



//// Caminho do arquivo JSON
//string caminhoArquivoJson = @"C:\dev\DataRead\Data\Data.json";

//// Configurar os servi�os
//var services = new ServiceCollection();
//services.AddInfrastructure(caminhoArquivoJson);

//// Construir o provedor de servi�os
//var serviceProvider = services.BuildServiceProvider();

//// Obter o caso de uso FiltrarProdutosUseCase
//var filterProductUseCase = serviceProvider.GetRequiredService<FilterProductUseCase>();

//// Executar o caso de uso
//var produtosFiltrados = filterProductUseCase.Executar(20000);

//// Exibir os resultados
//foreach (var produto in produtosFiltrados)
//{
//    Console.WriteLine($"Dia: {produto.Dia}, Valor: {produto.Valor}");
//}

//Console.WriteLine("O produto filtrado da posi��o 4 �:");
//Console.WriteLine(produtosFiltrados[4].Valor);

//// Liberar recursos
//serviceProvider.Dispose();

using DataRead.AppConfig;
using DataRead.Application.UseCases;
using DataRead.Infrastructure;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.Extensions.DependencyInjection;
using System;

var builder = WebApplication.CreateBuilder(args);

// Caminho do arquivo JSON
string caminhoArquivoJson = @"C:\dev\DataRead\Data\Data.json";

// Configurar os servi�os e a inje��o de depend�ncias
builder.Services.AddInfrastructure(caminhoArquivoJson);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

// Definir uma rota para verificar a execu��o do caso de uso
app.MapGet("/", () =>
{
    //Questao 01
    int INDICE = 13, SOMA = 0, K = 0;
    while (K < INDICE)
    {
        K = K + 1;
        SOMA = SOMA + K;
    }

    Console.WriteLine(SOMA);

    //Questao - 02
    int numeroInformado = 21; // N�mero informado para verifica��o
    List<int> fibonacciSequence = new List<int> { 0, 1 };
    while (fibonacciSequence[^1] + fibonacciSequence[^2] <= numeroInformado)
    {
        fibonacciSequence.Add(fibonacciSequence[^1] + fibonacciSequence[^2]);
    }
    bool pertence = fibonacciSequence.Contains(numeroInformado);

    Console.WriteLine($"O número {numeroInformado} {(pertence ? "pertence" : "não pertence")} à sequência de Fibonacci.");

    //questao - 05
    string input = "TARGET";
    char[] chars = input.ToCharArray();

    // Usando dois indices para realizar a troca
    int left = 0;
    int right = chars.Length - 1;

    while (left < right)
    {

        char temp = chars[left];
        chars[left] = chars[right];
        chars[right] = temp;


        left++;
        right--;
    }

    Console.WriteLine(chars.ToString());

    var htmlBuilder = new System.Text.StringBuilder();
    htmlBuilder.Append("<!DOCTYPE html>");
    htmlBuilder.Append("<html lang='en'>");
    htmlBuilder.Append("<head>");
    htmlBuilder.Append("<meta charset='UTF-8'>");
    htmlBuilder.Append("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
    htmlBuilder.Append("<style>body { font-family: Arial; margin: 20px; }</style>");
    htmlBuilder.Append("</head>");
    htmlBuilder.Append("<body>");
    htmlBuilder.Append("<h1>Respostas: </h1><br><br>");
    htmlBuilder.Append("<b>Questão 01</b><br>");
    htmlBuilder.Append($"<p>O valor total da SOMA: {SOMA}</p>");
    htmlBuilder.Append("<b>Questão 02</b><br>");
    htmlBuilder.Append($"<br>O número {numeroInformado} {(pertence ? "pertence" : "não pertence")} à sequência de Fibonacci.<br>");
    htmlBuilder.Append("<br><b>Questão 05</b><br>");
    htmlBuilder.Append($"<p>String invertida: <b>{new string(chars)}</b></p>");
    htmlBuilder.Append("</body>");
    htmlBuilder.Append("</html>");

    return Results.Text(htmlBuilder.ToString(), "text/html; charset=utf-8");


});

app.MapGet("/faturamento", (FilterProductUseCase filterProductUseCase) =>
{
    var produtosFiltrados = filterProductUseCase.Executar(0);

    var diasComFaturamento = produtosFiltrados.Where(p => p.Valor > 0).ToList();
    double menorValor = diasComFaturamento.Min(p => p.Valor);
    double maiorValor = diasComFaturamento.Max(p => p.Valor);
    double mediaMensal = diasComFaturamento.Average(p => p.Valor);
    int diasAcimaDaMedia = diasComFaturamento.Count(p => p.Valor > mediaMensal);

    var faturamentoPorEstado = new Dictionary<string, double>
    {
        { "SP", 67836.43 },
        { "RJ", 36678.66 },
        { "MG", 29229.88 },
        { "ES", 27165.48 },
        { "Outros", 19849.53 }
    };

    double totalFaturamento = faturamentoPorEstado.Values.Sum();
    var percentuaisPorEstado = faturamentoPorEstado
        .Select(kvp => new { Estado = kvp.Key, Percentual = (kvp.Value / totalFaturamento) * 100 })
        .ToList();

    return Results.Json(new
    {
        TotalFaturamento = totalFaturamento,
        FaturamentoDiario = produtosFiltrados,
        MenorValor = menorValor,
        MaiorValor = maiorValor,
        MediaMensal = mediaMensal,
        DiasAcimaDaMedia = diasAcimaDaMedia,
        PercentuaisPorEstado = percentuaisPorEstado
    });
});

app.Run();


