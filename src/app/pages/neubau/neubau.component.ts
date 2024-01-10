import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormProjektComponent } from '../../form-projekt/form-projekt.component';
import { FormNeubauComponent } from '../../form-neubau/form-neubau.component';
import { FormDarlehenComponent } from '../../form-darlehen/form-darlehen.component';
import { ChartGkostenComponent } from '../../chart-gkosten/chart-gkosten.component';
import { ChartGkostenM2Component } from '../../chart-gkosten-m2/chart-gkosten-m2.component';
import { ChartAnnuitaetenComponent } from '../../chart-annuitaeten/chart-annuitaeten.component';
import { ChartRepaymentComponent } from '../../chart-repayment/chart-repayment.component';
import { ChartFinanzierungskostenComponent } from '../../chart-finanzierungskosten/chart-finanzierungskosten.component';
import { DashboardNumbersComponent } from '../../dashboard-numbers/dashboard-numbers.component';
import { neubau } from '../../shared/constants';
import { NeubauService } from './neubau.service';

@Component({
  selector: 'app-neubau',
  standalone: true,
  imports: [
    CommonModule,
    FormProjektComponent,
    FormNeubauComponent,
    FormDarlehenComponent,
    ChartGkostenComponent,
    ChartGkostenM2Component,
    ChartAnnuitaetenComponent,
    ChartRepaymentComponent,
    ChartFinanzierungskostenComponent,
    DashboardNumbersComponent,
  ],
  templateUrl: './neubau.component.html',
  styleUrl: './neubau.component.css',
  host: {
    class: 'ng-tool',
  },
})
export class NeubauComponent {
  // ATTENTION: the page is composed of multiple components, each one has a service.
  // for example, FormProjektComponent.ts has the form-projekt.service.ts
  // This top component has types at neubauprojekt.ts

  title = 'Neubau';

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

  // Reset was created to make sure the outputs match the form values
  // After doing some changes, going to another route and then coming back the outputs were the same
  // while the form had reset to default values
  // Another solution would be to restore the previous values. But that would require more work.
  // The main problem is that the forms are being reused across different projects/routes
  // So it would require either separating the forms, or identifying the current route in each form
  // to then assign the form values from the service(neubau / sanierung).
  constructor(private neubauService: NeubauService) {
    neubauService.reset();
  }
}
