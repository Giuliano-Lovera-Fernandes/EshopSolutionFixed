import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";


export interface FaturamentoDiario {
    dia: number;
    valor: number;
}

export interface PercentualPorEstado {
    estado: string;
    percentual: number;
}

export interface FaturamentoResponse {
    faturamentoDiario: FaturamentoDiario[];
    menorValor: number;
    maiorValor: number;
    mediaMensal: number;
    diasAcimaDaMedia: number;
    totalFaturamento: number;
    percentuaisPorEstado: PercentualPorEstado[];
}



@Injectable({
    providedIn: 'root'
})
export class DataService {


    public baseUrl = "http://localhost:7188";

    constructor(private http: HttpClient) { }

    public authenticate(data: any) {
        return this.http.post(`${this.baseUrl}/v1/login`, data);
    }

    public getMonthlySalesChartData() {
        console.log("Método");
        var data = this.http.get(`${this.baseUrl}/v1/reports/ms`);
        console.log(data);
        data.subscribe(
            response => {
                console.log('Resposta da API:', response);  // Aqui você verá os dados reais que foram retornados pela API
            },
            error => {
                console.error('Erro na requisição', error);  // Se ocorrer erro, isso será mostrado no console
            }
        );

        return data;
    }

    // public getDailySalesChartData() {
    //     console.log("Método");
    //     var data = this.http.get(`http://localhost:5206/faturamento`);
    //     console.log(data);
    //     data.subscribe(
    //         response => {
    //             console.log('Resposta da API:', response);  // Aqui você verá os dados reais que foram retornados pela API
    //         },
    //         error => {
    //             console.error('Erro na requisição', error);  // Se ocorrer erro, isso será mostrado no console
    //         }
    //     );

    //     return data;
    // }


    public getDailySalesChartData(): Observable<FaturamentoResponse> {
        console.log("Método");
        return this.http.get<FaturamentoResponse>("http://localhost:5206/faturamento");
    }

    public getOrders() {
        return this.http.get(`${this.baseUrl}/v1/orders`);
    }
}