import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { SanierungService } from '../pages/sanierung/sanierung.service';
import { NavigationEnd, Router } from '@angular/router';
import { DashboardOutput } from '../dashboard-output';
import { filter } from 'rxjs';
import { ChartsSettingsService } from '../charts-settings.service';

@Component({
  selector: 'app-chart-gkosten-m2-sanierung',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart-gkosten-m2-sanierung.component.html',
  styleUrl: './chart-gkosten-m2-sanierung.component.css',
  host: {
    class: 'host-chart host-chart2',
  },
})
export class ChartGkostenM2SanierungComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  output!: DashboardOutput;

  // Router links. There must be better way to get the strings from app.routes.ts
  currentRoute!: string;
  sanierungRoute = '/sanierung';

  constructor(
    private sanierungService: SanierungService,
    private router: Router,
    private styleService: ChartsSettingsService
  ) {
    this.router.events.subscribe((val) => {
      // Check for changes on the url
      if (val instanceof NavigationEnd) {
        // Then assign the url as a string
        this.currentRoute = this.router.url.toString();
      }
    });
  }

  ngOnInit(): void {
    this.sanierungService.currentOutputDashboard$
      .pipe(filter(() => this.currentRoute === this.sanierungRoute))
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
        this.barChartData.datasets[3].data = [
          0,
          Math.round(this.output['kfwZuschussM2']),
        ];
        // this.barChartData.datasets[4].data = [0, Math.round(this.output['finanzierungskostenFinanzmarktM2'])];
        // this.barChartData.datasets[5].data = [0, Math.round(this.output['finanzierungskostenKfwM2'])];
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
          color: this.styleService.ticks.color,
          font: {
            size: this.styleService.ticks.font.size,
            family: this.styleService.ticks.font.family,
            weight: this.styleService.ticks.font.weight,
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
          color: this.styleService.grid.color,
        },
        ticks: {
          color: this.styleService.ticks.color,
          font: {
            size: this.styleService.ticks.font.size,
            family: this.styleService.ticks.font.family,
            weight: this.styleService.ticks.font.weight,
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
          color: this.styleService.title.color,
          display: true,
          font: {
            family: this.styleService.title.font.family,
            size: this.styleService.title.font.size,
            weight: this.styleService.title.font.weight,
          },
          text: 'Gesamtkosten [€ / m²]',
        },
        display: true,
        labels: {
          color: this.styleService.labels.color,
          font: {
            size: this.styleService.labels.font.size,
            family: this.styleService.labels.font.family,
            weight: this.styleService.labels.font.weight,
          },
          usePointStyle: true,
          boxWidth: this.styleService.labels.boxWidth,
          boxHeight: this.styleService.labels.boxHeight,
          pointStyle: this.styleService.labels.pointStyle,
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
        borderWidth: this.styleService.datasets.borderWidth,
        backgroundColor: this.styleService.datasets.color01.backgroundColor,
        borderColor: this.styleService.datasets.color01.borderColor,
        hoverBackgroundColor: this.styleService.datasets.color01.hoverBackgroundColor,
      },
      {
        // Bank Kredit
        data: [null, 0],
        label: 'Bank Kredit',
        borderWidth: this.styleService.datasets.borderWidth,
        backgroundColor: this.styleService.datasets.color01.backgroundColor,
        borderColor: this.styleService.datasets.color01.borderColor,
        hoverBackgroundColor: this.styleService.datasets.color01.hoverBackgroundColor,
      },
      {
        // KfW Kredit
        data: [null, 0],
        label: 'KfW Kredit',
        borderWidth: this.styleService.datasets.borderWidth,
        backgroundColor: this.styleService.datasets.color03.backgroundColor,
        borderColor: this.styleService.datasets.color03.borderColor,
        hoverBackgroundColor: this.styleService.datasets.color03.hoverBackgroundColor
      },
      {
        // KfW Zuschuss
        data: [null, 0],
        label: 'KfW Zuschuss',
        borderWidth: this.styleService.datasets.borderWidth,
        backgroundColor: this.styleService.datasets.color04.backgroundColor,
        borderColor: this.styleService.datasets.color04.borderColor,
        hoverBackgroundColor: this.styleService.datasets.color04.hoverBackgroundColor
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
