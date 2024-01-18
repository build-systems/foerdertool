import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { NeubauService } from '../pages/neubau/neubau.service';
import { NavigationEnd, Router } from '@angular/router';
import { DashboardOutput } from '../dashboard-output';
import { filter } from 'rxjs';

@Component({
  selector: 'app-chart-gkosten-m2-neubau',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart-gkosten-m2-neubau.component.html',
  styleUrl: './chart-gkosten-m2-neubau.component.css',
  host: {
    class: 'host-chart host-chart2',
  },
})
export class ChartGkostenM2NeubauComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  output!: DashboardOutput;

  // Router links. There must be better way to get the strings from app.routes.ts
  currentRoute!: string;
  neubauRoute = '/neubau';

  constructor(private neubauService: NeubauService, private router: Router) {
    this.router.events.subscribe((val) => {
      // Check for changes on the url
      if (val instanceof NavigationEnd) {
        // Then assign the url as a string
        this.currentRoute = this.router.url.toString();
      }
    });
  }

  ngOnInit(): void {
    this.neubauService.currentOutputDashboard$
      .pipe(filter(() => this.currentRoute === this.neubauRoute))
      .subscribe((value) => {
        this.output = value;
        this.barChartData.datasets[0].data = [
          Math.round(this.output['investitionskostenM2']),
          0,
        ];
        this.barChartData.datasets[1].data = [
          0,
          Math.round(this.output['bankKreditM2']),
        ];
        this.barChartData.datasets[2].data = [
          0,
          Math.round(this.output['kfwKreditM2']),
        ];
        // this.barChartData.datasets[3].data = [
        //   0,
        //   Math.round(this.output['finanzierungskostenFinanzmarktM2']),
        // ];
        // this.barChartData.datasets[4].data = [
        //   0,
        //   Math.round(this.output['finanzierungskostenKfwM2']),
        // ];
        this.chart?.update();
      });
  }

  public barChartOptions: ChartConfiguration['options'] = {
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4,
      },
    },
    scales: {
      x: {
        stacked: true,
        alignToPixels: true,
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          color: '#999',
          font: {
            size: 12,
            family: 'system-ui',
            weight: 400,
          },
        },
      },
      y: {
        stacked: true,
        alignToPixels: true,
        border: {
          display: false,
        },
        title: {
          display: false,
        },
        grid: {
          color: '#333',
        },
        ticks: {
          color: '#999',
          font: {
            size: 12,
            family: 'system-ui',
            weight: 400,
          },
          callback: function (value, index, values) {
            return value + ' €/m²';
          },
        },
      },
    },
    plugins: {
      legend: {
        title: {
          color: 'white',
          display: true,
          font: {
            family: 'Montserrat',
            size: 18,
            weight: 400,
          },
          text: 'Gesamtkosten [€ / m²]',
        },
        display: true,
        labels: {
          color: '#ddd',
          font: {
            size: 12,
            family: 'system-ui',
            weight: 400,
          },
          boxWidth: 6,
          boxHeight: 6,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        callbacks: {
          label: (item) =>
            `${item.dataset.label}: ${item.formattedValue} € / m²`,
        },
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: ['Investition', 'Finanzierung'],
    datasets: [
      {
        // Baukosten (Investitionskosten)
        data: [0, null],
        label: 'Baukosten',
        backgroundColor: 'rgba(58, 149, 194, 0.6)',
        borderColor: 'rgb(58, 149, 194)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(58, 149, 194)',
      },
      {
        // Bank Kredit
        data: [null, 0],
        label: 'Bank Kredit',
        backgroundColor: 'rgba(144, 141, 194, 0.6)',
        borderColor: 'rgb(144, 141, 194)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(144, 141, 194)',
      },
      {
        data: [null, 0],
        label: 'KfW Kredit',
        backgroundColor: 'rgba(52, 103, 194, 0.6)',
        borderColor: 'rgb(52, 103, 194)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(52, 103, 194)',
      },
      // {
      //   // Finanzierungskosten Bank (Finanzierungskosten Finanzmarkt)
      //   data: [null, 0],
      //   label: 'Finanzierungskosten Bank',
      //   backgroundColor: 'rgba(57, 190, 193, 0.6)',
      //   borderColor: 'rgb(57, 190, 193)',
      //   borderWidth: 1,
      //   hoverBackgroundColor: 'rgb(57, 190, 193)',
      // },
      // {
      //   data: [null, 0],
      //   label: 'Finanzierungskosten KfW',
      //   backgroundColor: 'rgba(58, 194, 104, 0.6)',
      //   borderColor: 'rgb(58, 194, 104)',
      //   borderWidth: 1,
      //   hoverBackgroundColor: 'rgb(58, 194, 104)',
      // },
    ],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {}

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {}
}
