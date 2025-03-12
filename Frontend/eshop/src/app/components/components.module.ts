import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { MonthlySalesChartComponent } from './monthly-sales-chart/monthly-sales-chart.component';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
  declarations: [],
  imports: [CommonModule, LoadingComponent, MonthlySalesChartComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [LoadingComponent, MonthlySalesChartComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' } // Define o locale da aplicação
  ]
})
export class ComponentsModule { }
