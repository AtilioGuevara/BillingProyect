import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { DomixEchartComponent } from '../../../componate/domix-echart/domix-echart.component';
import { LucideAngularModule } from 'lucide-angular';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';
import { ColorService } from '../../../service/color.service';

@Component({
    selector: 'app-echart-line',
    imports: [PageTitleComponent, DomixEchartComponent, LucideAngularModule],
    templateUrl: './echart-line.component.html',
    styleUrl: './echart-line.component.scss'
})
export class EchartLineComponent {
  basicLineChartOptions = {}
    smoothLineChartData = {}
    lineChartData = {}
    categoryLineChartData = {}
    stepLineChartData = {}
    lineChartOptions = {}
    polarLineChartData = {}
    polarChartData = {}

    constructor(private settingService: LayoutSettingService, public colorsService: ColorService) {
      this.settingService.settings$.subscribe((settings) => {
        this.renderChart();
      });
    }


  renderChart(): void {
    this.basicLineChartOptions = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
      colors: this.getColor(!this.settingService.isDark() ? ['bg-primary-500', 'bg-gray-200', 'bg-gray-800'] : ['bg-primary-500', 'bg-dark-800', 'bg-dark-100']),
      grid: {
        top: '5%',
        left: '6%',
        right: '0%',
        bottom: '8%',
      },
    };
    this.smoothLineChartData = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
        },
      ],
      grid: {
        top: '5%',
        left: '6%',
        right: '0%',
        bottom: '8%',
      },
    };
    this.lineChartData = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
      },
      grid: {
        top: '12%',
        left: '2%',
        right: '0%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'Total',
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };
    this.categoryLineChartData = {
      legend: {
        data: ['Altitude (km) vs. temperature (°C)'],
      },
      tooltip: {
        trigger: 'axis',
        formatter: 'Temperature : <br/>{b}km : {c}°C',
      },
      grid: {
        left: '2%',
        right: '3%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} °C',
        },
      },
      yAxis: {
        type: 'category',
        axisLine: { onZero: false },
        axisLabel: {
          formatter: '{value} km',
        },
        boundaryGap: false,
        data: ['0', '10', '20', '30', '40', '50', '60', '70', '80'],
      },
      series: [
        {
          name: 'Altitude (km) vs. temperature (°C)',
          type: 'line',
          symbolSize: 10,
          symbol: 'circle',
          smooth: true,
          lineStyle: {
            width: 3,
            shadowColor: 'rgba(0,0,0,0.3)',
            shadowBlur: 10,
            shadowOffsetY: 8,
          },
          data: [15, -50, -56.5, -46.5, -22.1, -2.5, -27.7, -55.7, -76.5],
        },
      ],
    };
    this.stepLineChartData = {
      title: {
        text: 'Step Line',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Step Start', 'Step Middle', 'Step End'],
      },
      grid: {
        left: '2%',
        right: '1%',
        bottom: '1%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Step Start',
          type: 'line',
          step: 'start',
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: 'Step Middle',
          type: 'line',
          step: 'middle',
          data: [220, 282, 201, 234, 290, 430, 410],
        },
        {
          name: 'Step End',
          type: 'line',
          step: 'end',
          data: [450, 432, 401, 454, 590, 530, 510],
        },
      ],
    };
    this.lineChartOptions = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      grid: {
        top: '4%',
        left: '2%',
        right: '1%',
        bottom: '1%',
        containLabel: true,
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'line',
          symbol: 'triangle',
          symbolSize: 20,
          lineStyle: {
            color: '#5470C6',
            width: 4,
            type: 'dashed',
          },
          itemStyle: {
            borderWidth: 3,
            borderColor: '#EE6666',
            color: 'yellow',
          },
        },
      ],
    };
    this.polarLineChartData = {
      title: {
        text: 'Two Value-Axes in Polar',
      },
      legend: {
        data: ['line'],
      },
      polar: {
        center: ['50%', '54%'],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      angleAxis: {
        type: 'value',
        startAngle: 0,
      },
      radiusAxis: {
        min: 0,
      },
      series: [
        {
          coordinateSystem: 'polar',
          name: 'line',
          type: 'line',
          showSymbol: false,
          data: this.generatePolarData(),
        },
      ],
      animationDuration: 2000,
    };
    this.polarChartData = this.getPolarChartOptions();
  }



  generatePolarData() {
    const data = [];
    for (let i = 0; i <= 360; i++) {
      let t = (i / 180) * Math.PI;
      let r = Math.sin(2 * t) * Math.cos(2 * t);
      data.push([r, i]);
    }
    return data;
  }


  getPolarChartOptions() {
    // Generate the data
    const data = [];
    for (let i = 0; i <= 100; i++) {
      let theta = (i / 100) * 360;
      let r = 5 * (1 + Math.sin((theta / 180) * Math.PI));
      data.push([r, theta]);
    }

    return {
      title: {
        text: 'Two Value-Axes in Polar',
      },
      legend: {
        data: ['line'],
      },
      polar: {},
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      angleAxis: {
        type: 'value',
        startAngle: 0,
      },
      radiusAxis: {},
      series: [
        {
          coordinateSystem: 'polar',
          name: 'line',
          type: 'line',
          data: data,
        },
      ],
    };
  }


  getColor(DataSet: string[]) {
    return this.colorsService.getColorCodes(DataSet || [])
  }
}
