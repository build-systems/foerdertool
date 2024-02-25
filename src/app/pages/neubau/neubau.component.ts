import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeubauService } from './neubau.service';
import { FormProjektNeubauComponent } from './form-projekt-neubau/form-projekt-neubau.component';
import { FormDarlehenNeubauComponent } from './form-darlehen-neubau/form-darlehen-neubau.component';
import { ChartsProjektNeubauComponent } from './charts-projekt-neubau/charts-projekt-neubau.component';
import { DashboardDarlehenNeubauComponent } from './dashboard-darlehen-neubau/dashboard-darlehen-neubau.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NumbersProjektNeubauComponent } from './numbers-projekt-neubau/numbers-projekt-neubau.component';
import { NumbersDarlehenNeubauComponent } from './numbers-darlehen-neubau/numbers-darlehen-neubau.component';
import { TitleComponent } from '../../title/title.component';

@Component({
  selector: 'app-neubau',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    FormProjektNeubauComponent,
    FormDarlehenNeubauComponent,
    ChartsProjektNeubauComponent,
    DashboardDarlehenNeubauComponent,
    NumbersProjektNeubauComponent,
    NumbersDarlehenNeubauComponent
  ],
  templateUrl: './neubau.component.html',
  styleUrl: './neubau.component.css',
  host: {
    class: 'host-tool',
  },
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        backgroundColor: "#222",
        padding: '0 1rem',
      })),
      state('expanded', style({
        height: '*',
      })),
      transition('collapsed => expanded', [
        animate('300ms ease-out')
      ]),
      transition('expanded => collapsed', [
        animate('300ms ease-in')
      ]),
    ]),
    trigger('rotateArrow', [
      state('collapsed', style({
        transform: 'rotate(0deg)'
      })),
      state('expanded', style({
        transform: 'rotate(90deg)'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-out')
      ]),
    ])
  ],
})
export class NeubauComponent {
  // ATTENTION: the page is composed of multiple components, each one has a service.
  // for example, FormProjektComponent.ts has the form-projekt.service.ts
  // This top component has types at neubauprojekt.ts

  // Information for the title section
  title = 'Klimafreundlicher Neubau von Wohngebäuden';
  kfwId = '297/298';
  kfwH2 = 'Bundesförderung für Effiziente Gebäude';
  kfwH3 = 'Haus und Wohnung energieeffizient und nachhaltig bauen';
  kfwDescription = 'Gefördert wird der Neubau von energieeffizienten und nachhaltigen Wohngebäuden Erreichen Sie die Effizienz­haus-Stufe 40 mit der Zertifizierung klimafreundlicher Neubau, fördern wir Ihr Vorhaben mit einem Kredit­betrag von bis zu 100.000 Euro je Wohneinheit. Der maximale Kredit­betrag steigt auf 150.000 Euro je Wohn­einheit, wenn Ihre Immobilie zusätzlich ein Qualitätssigel Nachhaltiges Gebäude vorweisen kann. Aktuell sind die entsprechenden Haushaltsmittel erschöpft, deshalb ist keine Antragstellung möglich.';
  kfwLink = 'https://www.kfw.de/inlandsfoerderung/Privatpersonen/Neubau/F%C3%B6rderprodukte/Klimafreundlicher-Neubau-Wohngeb%C3%A4ude-(297-298)/';

  // To scroll to element
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  isExpanded: boolean = false;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  constructor(public neubauService: NeubauService) {
    // Reset was created to make sure the outputs match the form values
    // After doing some changes, going to another route and then coming back the outputs were the same
    // while the form had reset to default values
    // Another solution would be to restore the previous values. But that would require more work.
    // The main problem is that the forms are being reused across different projects/routes
    // So it would require separating the forms.
    // I think it could easily be done using signals
    // neubauService.reset();
  }
}
