import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';


declare var Chart: any;

@Component({
  selector: 'app-monthly-sales-chart',
  templateUrl: './monthly-sales-chart.component.html',
  styleUrls: ['./monthly-sales-chart.component.scss'],

  imports: [LoadingComponent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MonthlySalesChartComponent implements AfterViewInit {
  public data: any = null;
  public menorValor: number = 0;
  public maiorValor: number = 0;
  public mediaMensal: number = 0;
  public diasAcimaDaMedia: number = 0;
  public totalFaturamento: number = 0;
  public percentuaisPorEstado: any[] = [];

  constructor(
    private service: DataService
  ) { }
  ngAfterViewInit(): void {
    console.log("aqui");
    this.service
      //.getMonthlySalesChartData()
      .getDailySalesChartData()
      .subscribe((res) => {
        //   console.log(res);
        //   this.data = res;
        //   this.render();
        if (res && res.faturamentoDiario) {
          this.data = res.faturamentoDiario || [];
          this.menorValor = res.menorValor;
          this.maiorValor = res.maiorValor;
          this.mediaMensal = res.mediaMensal;
          this.diasAcimaDaMedia = res.diasAcimaDaMedia;
          this.totalFaturamento = res.totalFaturamento;
          this.percentuaisPorEstado = res.percentuaisPorEstado || [];  // Armazena os dados recebidos
          this.render();
          this.renderPieChart(this.percentuaisPorEstado)    // Chama a função para renderizar o gráfico
        } else {
          console.error('Dados recebidos não estão no formato esperado.');
        }
      });

  }
  // render() {
  //   var el: any = document.getElementById('myChart');
  //   var ctx = el.getContext('2d');

  //   var myChart = new Chart(ctx, {
  //     type: 'bar',
  //     data: this.data,
  //     options: {
  //       scales: {
  //         yAxes: [{
  //           ticks: { beginAtZero: true }
  //         }]
  //       }
  //     }
  //   });
  // }
  render() {
    var el: any = document.getElementById('myChart');
    var ctx = el.getContext('2d');

    var myChart = new Chart(ctx, {
      type: 'line', // Troquei de 'bar' para 'line'
      data: {
        labels: this.data.map((item: any) => `Dia ${item.dia}`), // Labels com os dias
        datasets: [{
          label: 'Vendas Diárias', // Rótulo da linha
          data: this.data.map((item: any) => item.valor), // Valores
          borderColor: 'rgba(75, 192, 192, 1)', // Cor da linha
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Cor do preenchimento
          borderWidth: 2, // Espessura da linha
          fill: true, // Preenchimento abaixo da linha
          tension: 0.2, // Curvatura da linha
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          }
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              // Formata o valor com vírgula
              const value = context.raw;
              return `Vendas: ${value.toFixed(2).replace('.', ',')}`;
            }
          }
        },
        scales: {
          y: { // No Chart.js 3.x+ é 'y' e não 'yAxes'
            beginAtZero: true, // Inicia o gráfico no zero
          }
        }
      }
    });
  }

  private formatarValor(valor: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  }

  renderPieChart(percentuaisPorEstado: any[]) {
    console.log("Dados recebidos para o gráfico de pizza:", this.data.percentuaisPorEstado);
    const el: any = document.getElementById('myPieChart');
    const ctx = el.getContext('2d');

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: percentuaisPorEstado.map((item: any) => item.estado),
        datasets: [{
          label: 'Percentual por Estado',
          data: percentuaisPorEstado.map((item: any) => item.percentual),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          }
        }
      }
    });
  }





  //ngOnInit() { }



}
