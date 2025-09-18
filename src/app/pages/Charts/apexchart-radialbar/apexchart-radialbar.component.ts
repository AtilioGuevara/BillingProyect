import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { ChartInfo } from '../../../componate/domix-charts/Model/Display-Chart.model';
import { DomixChartsComponent } from '../../../componate/domix-charts/domix-charts.component';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';

@Component({
    selector: 'app-apexchart-radialbar',
    imports: [PageTitleComponent, DomixChartsComponent],
    templateUrl: './apexchart-radialbar.component.html',
    styleUrl: './apexchart-radialbar.component.scss'
})
export class ApexchartRadialbarComponent {
  radialChart!: ChartInfo
  radialBarChart!: ChartInfo
  customAngleRadialbarChart!: ChartInfo
  gradientRadialbarChart!: ChartInfo
  imageRadialbarChart!: ChartInfo
  strokedGaugeRadialbarChart!: ChartInfo
  semiGaugeRadialbarChart!: ChartInfo


  constructor(private settingService: LayoutSettingService) {
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart()
    });
  }

  renderChart(): void {
    this.radialChart = {
      series: [70], // Series data for the radial bar
      chartOptions: {
        chart: {
          height: 300,
          type: 'radialBar',
        },
        colors: [],
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%', // Size of the hollow part of the radial bar
            },
          },
        },
        labels: ['Cricket'], // Labels for the radial bar
        dataSet: ['bg-primary-500'], // Your dataset for color codes
      },
    };
    this.radialBarChart = {
      series: [44, 55, 67, 83],
      chartOptions: {
        chart: {
          height: 300,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '22px',
              },
              value: {
                fontSize: '16px',
              },
              total: {
                show: true,
                label: 'Total',
                formatter: (w: any) => {
                  // Specify explicit types for the reduce function
                  return w.globals.seriesTotals.reduce(
                    (a: number, b: number) => a + b,
                    0
                  );
                },
              },
            },
          },
        },
        colors: [],
        dataSet: [
          'bg-primary-500',
          'bg-green-500',
          'bg-yellow-500',
          'bg-purple-500',
        ],
        labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
      },
    };
    this.customAngleRadialbarChart = {
      series: [76, 67, 61, 90],
      chartOptions: {
        chart: {
          height: 300,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: '30%',
              background: 'transparent',
              image: undefined,
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: false,
              },
            },
          },
        },
        colors: [],
        dataSet: [
          'bg-primary-500',
          'bg-green-500',
          'bg-yellow-500',
          'bg-purple-500',
        ],
        legend: {
          show: true,
          floating: true,
          fontSize: '16px',
          position: 'left',
          offsetX: 160,
          offsetY: 15,
          labels: {
            useSeriesColors: true,
          },
          markers: {},
          formatter: function (seriesName, opts) {
            return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
          },
          itemMargin: {
            vertical: 3,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                show: false,
              },
            },
          },
        ],
        labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
      },
    };
    this.gradientRadialbarChart = {
      series: [75],
      chartOptions: {
        chart: {
          height: 300,
          type: 'radialBar',
          toolbar: {
            show: true,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: '70%',
              position: 'front',
            },
            track: {
              strokeWidth: '67%',
              margin: 0, // margin is in pixels
            },
            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                color: '#888',
                fontSize: '17px',
              },
              value: {
                formatter: function (val: number): string {
                  return val.toString(); // Ensure the formatter returns a string
                },
                color: '#111',
                fontSize: '36px',
                show: true,
              },
            },
          },
        },
        colors: [],
        dataSet: ['bg-primary-500', 'bg-green-500'],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#ABE5A1'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        stroke: {
          lineCap: 'round',
        },
        labels: ['Percent'],
      },
    };
    this.imageRadialbarChart = {
      series: [67],
      chartOptions: {
        chart: {
          height: 300,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 15,
              size: '70%',
              image: '../../assets/images/avatar/user-1.png',
              imageWidth: 64,
              imageHeight: 64,
              imageClipped: false,
            },
            dataLabels: {
              name: {
                show: false,
                color: '#fff',
              },
              value: {
                show: true,
                color: '#333',
                offsetY: 70,
                fontSize: '22px',
              },
            },
          },
        },
        fill: {
          type: 'image',
          image: {
            src: ['../../assets/images/gallery/img-01.jpg'],
          },
        },
        dataSet: [],
        stroke: {
          lineCap: 'round',
        },
        labels: ['Volatility'],
      },
    };
    this.strokedGaugeRadialbarChart = {
      series: [75],
      chartOptions: {
        chart: {
          height: 300,
          type: 'radialBar',
          offsetY: -10,
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: '16px',
                offsetY: 120,
              },
              value: {
                offsetY: 76,
                fontSize: '22px',
                formatter: (val: number) => `${val}%`,
              },
            },
          },
        },
        colors: [], // This will be populated by getColorCodes
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91],
          },
        },
        stroke: {
          dashArray: 4,
        },
        labels: ['Median Ratio'],
        dataSet: ['bg-sky-500'], // Replace with actual dataset classes if needed
      },
    };
    this.semiGaugeRadialbarChart = {
      series: [76],
      chartOptions: {
        chart: {
          height: 300,
          type: 'radialBar',
          offsetY: -20,
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: '#e7e7e7',
              strokeWidth: '97%',
              margin: 5,
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                offsetY: -2,
                fontSize: '22px',
              },
            },
          },
        },
        colors: [], // This will be set dynamically
        grid: {
          padding: {
            top: -10,
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 53, 91],
          },
        },
        labels: ['Average Results'],
        dataSet: ['bg-primary-500'], // Assuming you want to map this to a color code
      },
    };
  }
}
