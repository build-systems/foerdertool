import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { SanierungProjekt } from '../sanierungprojekt';
import { SanierungService } from '../sanierung.service';

@Component({
  selector: 'app-chart-gkosten-m2',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart-gkosten-m2.component.html',
  styleUrl: './chart-gkosten-m2.component.css',
  host: {
    class: 'container-chart'
  }

})
export class ChartGkostenM2Component implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  output!: SanierungProjekt;

  constructor(private sanierungService: SanierungService) { }

  ngOnInit(): void {
    this.sanierungService.currentOutput$.subscribe((value) => {
      this.output = value;
      this.barChartData.datasets[0].data = [-Math.round(this.output['kfwZuschussM2']), 0];
      this.barChartData.datasets[1].data = [Math.round(this.output['investitionskostenM2']), 0];
      this.barChartData.datasets[2].data = [0, Math.round(this.output['finanzierungskostenFinanzmarktM2'])];
      this.barChartData.datasets[3].data = [0, Math.round(this.output['finanzierungskostenKfwM2'])];
      this.barChartData.datasets[4].data = [0, Math.round(this.output['bankKreditM2'])];
      this.barChartData.datasets[5].data = [0, Math.round(this.output['kfwKreditM2'])];
      this.chart?.update();
    });

  }

  public barChartOptions: ChartConfiguration['options'] = {
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
            size: 14,
            family: 'system-ui',
            weight: 400,
          },
        }
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
            size: 14,
            family: 'system-ui',
            weight: 400,
          },
          callback: function (value, index, values) {
            return (value + ' €/m²');
          }
        }
      },
    },
    plugins: {
      legend: {
        title: {
          color: 'white',
          display: true,
          font: {
            family: 'Montserrat',
            size: 20,
            weight: 400,
          },
          text: 'Gesamtkosten [€ / m²]'
        },
        display: true,
        labels: {
          color: '#ddd',
          font: {
            size: 14,
            family: 'system-ui',
            weight: 400,
          },
          boxWidth: 8,
          boxHeight: 8,
          usePointStyle: true,
          pointStyle: 'circle',
        }
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
        data: [0, null],
        label: 'KfW-Zuschuss',
        backgroundColor: 'rgba(58, 194, 150, 0.6)',
        borderColor: 'rgb(58, 194, 150)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(58, 194, 150)',
      },
      {
        data: [0, null],
        label: 'Investitionskosten',
        backgroundColor: 'rgba(58, 149, 194, 0.6)',
        borderColor: 'rgb(58, 149, 194)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(58, 149, 194)',
      },
      {
        data: [null, 0],
        label: 'Finanzierungskosten Finanzmarkt',
        backgroundColor: 'rgba(57, 190, 193, 0.6)',
        borderColor: 'rgb(57, 190, 193)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(57, 190, 193)',
      },
      {
        data: [null, 0],
        label: 'Finanzierungskosten KfW',
        backgroundColor: 'rgba(58, 194, 104, 0.6)',
        borderColor: 'rgb(58, 194, 104)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(58, 194, 104)',
      },
      {
        data: [null, 0],
        label: 'Bank-Kredit',
        backgroundColor: 'rgba(144, 141, 194, 0.6)',
        borderColor: 'rgb(144, 141, 194)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(144, 141, 194)',
      },
      {
        data: [null, 0],
        label: 'kfw-Kredit',
        backgroundColor: 'rgba(52, 103, 194, 0.6)',
        borderColor: 'rgb(52, 103, 194)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(52, 103, 194)',
      },
    ],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }
}