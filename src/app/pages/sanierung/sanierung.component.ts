import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormProjektComponent } from '../../form-projekt/form-projekt.component';
import { FormSanierungComponent } from '../../form-sanierung/form-sanierung.component';
import { FormDarlehenComponent } from '../../form-darlehen/form-darlehen.component';
import { ChartGkostenSanierungComponent } from '../../chart-gkosten-sanierung/chart-gkosten-sanierung.component';
import { ChartGkostenM2SanierungComponent } from '../../chart-gkosten-m2-sanierung/chart-gkosten-m2-sanierung.component';
import { ChartAnnuitaetenComponent } from '../../chart-annuitaeten/chart-annuitaeten.component';
import { ChartRepaymentComponent } from '../../chart-repayment/chart-repayment.component';
import { ChartFinanzierungskostenComponent } from '../../chart-finanzierungskosten/chart-finanzierungskosten.component';
import { DashboardNumbersComponent } from '../../dashboard-numbers/dashboard-numbers.component';
import { SanierungService } from './sanierung.service';

@Component({
  selector: 'app-sanierung',
  standalone: true,
  imports: [
    CommonModule,
    FormProjektComponent,
    FormSanierungComponent,
    FormDarlehenComponent,
    ChartGkostenSanierungComponent,
    ChartGkostenM2SanierungComponent,
    ChartAnnuitaetenComponent,
    ChartRepaymentComponent,
    ChartFinanzierungskostenComponent,
    DashboardNumbersComponent,
  ],
  templateUrl: './sanierung.component.html',
  styleUrl: './sanierung.component.css',
  host: {
    class: 'ng-tool',
  },
})
export class SanierungComponent {
  // ATTENTION: the page is composed of multiple components, each one has a service.
  // for example, FormProjektComponent.ts has the form-projekt.service.ts
  // This top component has types at sanierungprojekt.ts

  title = 'Sanierung';

  // Handle form page
  currentForm = 1;
  nForms = 3;
  nextForm() {
    if (this.currentForm + 1 <= this.nForms) this.currentForm += 1;
  }
  previousForm() {
    if (this.currentForm - 1 >= 1) this.currentForm -= 1;
  }

  // To scroll to element
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  constructor(private sanierungService: SanierungService) {
    sanierungService.reset();
  }
}
