import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { DomixEchartComponent } from '../../../componate/domix-echart/domix-echart.component';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';
import { ColorService } from '../../../service/color.service';

@Component({
    selector: 'app-echart-bar',
    imports: [PageTitleComponent, DomixEchartComponent],
    templateUrl: './echart-bar.component.html',
    styleUrls: ['./echart-bar.component.scss']
})
export class EchartBarComponent {
  barChartData = {}
  axisAlignBarChartData = {}
  backgroundBarChartData = {}
  singleBarChartData = {}
  worldPopulationBarChartData = {}
  stackedBorderRadiusBarChartData = {}

  constructor(private settingService: LayoutSettingService, public colorsService: ColorService) {
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart();
    });
  }

  ngOnInit(): void {
  }

  renderChart(): void {
    this.barChartData = {
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ],
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: this.getColor(!this.settingService.isDark() ? ['bg-sky-500', 'bg-gray-200', 'bg-gray-800'] : ['bg-sky-500', 'bg-dark-800', 'bg-dark-100'])[1]
          }
        }
      },
      legend: {
        textStyle: {
          color: this.getColor(!this.settingService.isDark() ? ['bg-sky-500', 'bg-gray-200', 'bg-gray-800'] : ['bg-sky-500', 'bg-dark-800', 'bg-dark-100'])[2]
        }
      },
      color: this.getColor(!this.settingService.isDark() ? ['bg-sky-500', 'bg-gray-200', 'bg-gray-800'] : ['bg-sky-500', 'bg-dark-800', 'bg-dark-100']),
      axisLine: {
        lineStyle: {
          color: this.getColor(!this.settingService.isDark() ? ['bg-sky-500', 'bg-gray-200', 'bg-gray-800'] : ['bg-sky-500', 'bg-dark-800', 'bg-dark-100'])[1]
        }
      },
      grid: {
        top: '5%',
        left: '5%',
        right: '0%',
        bottom: '6%',
      },
    };

    this.axisAlignBarChartData = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: '3%',
        left: '2%',
        right: '0%',
        bottom: '2%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      axisLine: {
        lineStyle: {
          color: this.getColor(!this.settingService.isDark() ? ['bg-primary-500', 'bg-gray-200', 'bg-gray-800'] : ['bg-primary-500', 'bg-dark-800', 'bg-dark-100'])[1]
        }
      },
      yAxis: [
        {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: this.getColor(!this.settingService.isDark() ? ['bg-primary-500', 'bg-gray-200', 'bg-gray-800'] : ['bg-primary-500', 'bg-dark-800', 'bg-dark-100'])[1] // Change this to the color you want for the horizontal lines
            }
          }
        }
      ],
      color: this.getColor(!this.settingService.isDark() ? ['bg-primary-500', 'bg-gray-200', 'bg-gray-800'] : ['bg-primary-500', 'bg-dark-800', 'bg-dark-100']),
      legend: {
        textStyle: {
          color: this.getColor(!this.settingService.isDark() ? ['bg-primary-500', 'bg-gray-200', 'bg-gray-800'] : ['bg-primary-500', 'bg-dark-800', 'bg-dark-100'])[2]
        }
      },
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };

    this.backgroundBarChartData = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: this.getColor(!this.settingService.isDark() ? ['bg-green-500', 'bg-gray-200', 'bg-gray-800', 'bg-gray-100'] : ['bg-green-500', 'bg-dark-800', 'bg-dark-100', 'bg-dark-850'])[1] // Change this to the color you want for the horizontal lines
          }
        }
      },
      color: this.getColor(!this.settingService.isDark() ? ['bg-green-500', 'bg-gray-200', 'bg-gray-800', 'bg-gray-100'] : ['bg-green-500', 'bg-dark-800', 'bg-dark-100', 'bg-dark-850']),
      legend: {
        textStyle: {
          color: this.getColor(!this.settingService.isDark() ? ['bg-green-500', 'bg-gray-200', 'bg-gray-800', 'bg-gray-100'] : ['bg-green-500', 'bg-dark-800', 'bg-dark-100', 'bg-dark-850'])[2]
        }
      },
      axisLine: {
        lineStyle: {
          color: this.getColor(!this.settingService.isDark() ? ['bg-green-500', 'bg-gray-200', 'bg-gray-800', 'bg-gray-100'] : ['bg-green-500', 'bg-dark-800', 'bg-dark-100', 'bg-dark-850'])[1]
        }
      },
      grid: {
        top: '3%',
        left: '2%',
        right: '0%',
        bottom: '2%',
        containLabel: true
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    };

    this.singleBarChartData = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: this.getColor(!this.settingService.isDark() ? ['bg-primary-500', 'bg-purple-500', 'bg-gray-200', 'bg-gray-800', 'bg-gray-100'] : ['bg-primary-500', 'bg-purple-500', 'bg-dark-800', 'bg-dark-100', 'bg-dark-850'])[2] // Change this to the color you want for the horizontal lines
          }
        }
      },
      grid: {
        top: '3%',
        left: '2%',
        right: '0%',
        bottom: '2%',
        containLabel: true
      },
      series: [
        {
          data: [
            120,
            {
              value: 200,
              itemStyle: {
                color: this.getColor(!this.settingService.isDark() ? ['bg-primary-500', 'bg-purple-500', 'bg-gray-200', 'bg-gray-800', 'bg-gray-100'] : ['bg-primary-500', 'bg-purple-500', 'bg-dark-800', 'bg-dark-100', 'bg-dark-850'])[1] // Custom color for this specific data point
              }
            },
            150,
            80,
            70,
            110,
            130
          ],
          type: 'bar',
        }
      ],
      color: this.getColor(!this.settingService.isDark() ? ['bg-primary-500', 'bg-purple-500', 'bg-gray-200', 'bg-gray-800', 'bg-gray-100'] : ['bg-primary-500', 'bg-purple-500', 'bg-dark-800', 'bg-dark-100', 'bg-dark-850']),
      legend: {
        textStyle: {
          color: this.getColor(!this.settingService.isDark() ? ['bg-primary-500', 'bg-purple-500', 'bg-gray-200', 'bg-gray-800', 'bg-gray-100'] : ['bg-primary-500', 'bg-purple-500', 'bg-dark-800', 'bg-dark-100', 'bg-dark-850'])[2]
        }
      },
      axisLine: {
        lineStyle: {
          color: this.getColor(!this.settingService.isDark() ? ['bg-primary-500', 'bg-purple-500', 'bg-gray-200', 'bg-gray-800', 'bg-gray-100'] : ['bg-primary-500', 'bg-purple-500', 'bg-dark-800', 'bg-dark-100', 'bg-dark-850'])[1]
        }
      }
    };

    this.worldPopulationBarChartData = {
      series: [{
        name: '2011',
        type: 'bar',
        data: [18203, 23489, 29034, 104970, 131744, 630230]
      },
      {
        name: '2012',
        type: 'bar',
        data: [19325, 23438, 31000, 121594, 134141, 681807]
      }],
      color: this.getColor(!this.settingService.isDark() ? ['bg-primary-500', 'bg-purple-500', 'bg-gray-200', 'bg-gray-800', 'bg-gray-100'] : ['bg-primary-500', 'bg-purple-500', 'bg-dark-800', 'bg-dark-100', 'bg-dark-850']),
      title: {
        text: 'World Population',
        textStyle: {
          color: this.getColor(!this.settingService.isDark() ? ['bg-primary-500', 'bg-purple-500', 'bg-gray-200', 'bg-gray-800', 'bg-gray-100'] : ['bg-primary-500', 'bg-purple-500', 'bg-dark-800', 'bg-dark-100', 'bg-dark-850'])[3]
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        textStyle: {
          color: this.getColor(!this.settingService.isDark() ? ['bg-primary-500', 'bg-purple-500', 'bg-gray-200', 'bg-gray-800', 'bg-gray-100'] : ['bg-primary-500', 'bg-purple-500', 'bg-dark-800', 'bg-dark-100', 'bg-dark-850'])[3]
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        splitLine: {
          lineStyle: {
            color: this.getColor(!this.settingService.isDark() ? ['bg-primary-500', 'bg-purple-500', 'bg-gray-200', 'bg-gray-800', 'bg-gray-100'] : ['bg-primary-500', 'bg-purple-500', 'bg-dark-800', 'bg-dark-100', 'bg-dark-850'])[2] // Change this to the color you want for the horizontal lines
          }
        }
      },
      yAxis: {
        type: 'category',
        data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'],
      },
    };

    this.stackedBorderRadiusBarChartData = this.getStackedBorderRadiusBarChartData();
  }

  getColor(DataSet: string[]) {
    return this.colorsService.getColorCodes(DataSet || [])
  }


  getStackedBorderRadiusBarChartData() {
    return {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      grid: {
        top: '3%',
        left: '3%',
        right: '0%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: [
        {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: this.getColor(!this.settingService.isDark() ? ['bg-primary-500', 'bg-purple-500', 'bg-yellow-500', 'bg-gray-200', 'bg-gray-800', 'bg-gray-100'] : ['bg-primary-500', 'bg-purple-500', 'bg-yellow-500', 'bg-dark-800', 'bg-dark-100', 'bg-dark-850'])[3] // Change this to the color you want for the horizontal lines
            }
          }
        }
      ],
      color: this.getColor(!this.settingService.isDark() ? ['bg-primary-500', 'bg-purple-500', 'bg-yellow-500', 'bg-gray-200', 'bg-gray-800', 'bg-gray-100'] : ['bg-primary-500', 'bg-purple-500', 'bg-yellow-500', 'bg-dark-800', 'bg-dark-100', 'bg-dark-850']),
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          stack: 'a',
          name: 'a'
        },
        {
          data: [10, 46, 64, '-', 0, '-', 0],
          type: 'bar',
          stack: 'a',
          name: 'b'
        },
        {
          data: [30, '-', 0, 20, 10, '-', 0],
          type: 'bar',
          stack: 'a',
          name: 'c'
        },
        {
          data: [30, '-', 0, 20, 10, '-', 0],
          type: 'bar',
          stack: 'b',
          name: 'd'
        },
        {
          data: [10, 20, 150, 0, '-', 50, 10],
          type: 'bar',
          stack: 'b',
          name: 'e'
        }
      ]
    };
  }

}
