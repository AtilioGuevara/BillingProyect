import { Component, ElementRef, ViewChild } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import ApexCharts from 'apexcharts';
import { CountUpModule } from 'ngx-countup';
import { ColorService } from '../../../../service/color.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apps-pos-sales-reports',
  imports: [PageTitleComponent, LucideAngularModule, CountUpModule, CommonModule],
  templateUrl: './apps-pos-sales-reports.component.html',
  styleUrl: './apps-pos-sales-reports.component.scss'
})
export class AppsPosSalesReportsComponent {
  @ViewChild('salesChartRef', { static: true }) salesChartRef!: ElementRef;
  @ViewChild('labelLineChartRef', { static: true }) labelLineChartRef!: ElementRef;
  @ViewChild('salesTrendChartRef', { static: true }) salesTrendChartRef!: ElementRef;
  @ViewChild('topSellingItemsChartRef', { static: true })
  topSellingItemsChartRef!: ElementRef;

  topSellingItemsChart!: ApexCharts;
  salesChart!: ApexCharts;
  labelLineChart!: ApexCharts;
  salesTrendChart!: ApexCharts;

  // Chart #1: Sales Bar Chart
  salesSeries = [
    {
      name: 'Sales',
      data: [9, 14, 17, 7, 5, 8, 6, 16, 9, 15, 13, 10]
    }
  ];

  // Chart #2: Revenue/Expenses Line Chart
  currentYear = '2025';
  lineLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  yearData: Record<string, { revenue: number[]; expenses: number[] }> = {
    '2022': { revenue: [35, 42, 48, 65, 78, 85, 72], expenses: [25, 28, 32, 45, 52, 58, 48] },
    '2023': { revenue: [45, 52, 58, 65, 72, 78, 85], expenses: [32, 35, 38, 42, 45, 48, 52] },
    '2024': { revenue: [65, 72, 58, 45, 68, 82, 75], expenses: [45, 48, 42, 38, 45, 52, 48] },
    '2025': { revenue: [55, 65, 78, 92, 108, 125, 145], expenses: [42, 48, 55, 65, 75, 85, 95] }
  };

  // Chart #3: Sales Trend Chart
  labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  series = [
    { name: 'Daily Sales', data: [2850, 3200, 2950, 3100, 3650, 4200, 3950, 3800, 3450, 3600] },
    { name: 'Weekly Sales', data: [18500, 19200, 18800, 19500, 21200, 22800, 22200, 21800, 20500, 21600] },
    { name: 'Monthly Sales', data: [72000, 75000, 78000, 82000, 88000, 92000, 95000, 92000, 89000, 94000] }
  ];

  // Chart #4: Top Selling Items (Stacked Bar)
  topSellingSeries = [
    {
      name: 'Classic Burger',
      data: [44, 55, 41, 67, 22, 43, 20, 35, 28, 42]
    },
    {
      name: 'Margherita Pizza',
      data: [13, 23, 20, 8, 13, 27, 19, 15, 19, 22]
    },
    {
      name: 'Chicken Wings',
      data: [11, 17, 15, 15, 21, 14, 11, 18, 23, 16]
    },
    {
      name: 'French Fries',
      data: [21, 7, 25, 13, 22, 16, 10, 17, 14, 19]
    },
    {
      name: 'Soft Drinks',
      data: [21, 7, 25, 13, 22, 8, 18, 16, 20, 24]
    }
  ];

  topSellingLabels = [
    '01/01/2024 GMT', '01/02/2024 GMT', '01/03/2024 GMT',
    '01/04/2024 GMT', '01/05/2024 GMT', '01/06/2024 GMT',
    '01/07/2024 GMT', '01/08/2024 GMT', '01/09/2024 GMT',
    '01/10/2024 GMT'
  ];

  intervalId: any;

  constructor(private colorService: ColorService) { }

  ngOnInit(): void {
    this.renderSalesChart();
    this.renderLineChart();
    this.renderTrendChart();
    this.renderTopSellingItemsChart();

    this.intervalId = setInterval(() => this.updateSalesData(), 60000);
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    window.removeEventListener('resize', this.onResize);
    if (this.salesChart) this.salesChart.destroy();
    if (this.labelLineChart) this.labelLineChart.destroy();
    if (this.salesTrendChart) this.salesTrendChart.destroy();
  }

  onResize = () => {
    this.renderSalesChart();
    this.renderLineChart();
    this.renderTrendChart();
  };

  getColorList(ref: ElementRef): string[] {
    const attr = ref.nativeElement.getAttribute('data-chart-colors');
    let parsed: string[] = [];
    try {
      parsed = JSON.parse(attr);
    } catch {
      console.warn('Invalid chart color string:', attr);
    }
    return this.colorService.getColorCodes(parsed);
  }

  // -------- Chart 1: Bar --------
  renderSalesChart(): void {
    if (this.salesChart) this.salesChart.destroy();

    const options: ApexCharts.ApexOptions = {
      series: this.salesSeries,
      chart: {
        height: 235,
        type: 'bar',
        toolbar: { show: false },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: { enabled: true, delay: 150 },
          dynamicAnimation: { enabled: true, speed: 350 }
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '90%',
          borderRadius: 5,
          dataLabels: { position: 'top' }
        }
      },
      xaxis: {
        categories: [
          '12:00', '12:05', '12:10', '12:15', '12:20', '12:25',
          '12:30', '12:35', '12:40', '12:45', '12:50', '12:55'
        ],
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['transparent']
      },
      fill: {
        opacity: 1,
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 100]
        }
      },
      grid: {
        padding: { top: 0, right: -10, bottom: 0 },
        borderColor: '#f1f1f1',
        strokeDashArray: 4
      },
      colors: this.getColorList(this.salesChartRef)
    };

    this.salesChart = new ApexCharts(this.salesChartRef.nativeElement, options);
    this.salesChart.render();
  }

  updateSalesData(): void {
    const newData = this.salesSeries[0].data.map(val =>
      Math.max(0, val + Math.floor(Math.random() * 5 - 2))
    );
    this.salesSeries = [{ name: 'Sales', data: newData }];
    this.renderSalesChart();
  }

  // -------- Chart 2: Revenue/Expenses Line --------
  renderLineChart(): void {
    if (this.labelLineChart) this.labelLineChart.destroy();

    const options: ApexCharts.ApexOptions = {
      series: this.getLineSeries(),
      chart: {
        height: 315,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: { show: false }
      },
      dataLabels: { enabled: true },
      stroke: { curve: 'smooth' },
      grid: {
        padding: { top: -20, right: 0, bottom: 0 }
      },
      xaxis: {
        categories: this.lineLabels
      },
      legend: { show: false },
      colors: this.getColorList(this.labelLineChartRef)
    };

    this.labelLineChart = new ApexCharts(this.labelLineChartRef.nativeElement, options);
    this.labelLineChart.render();
  }

  getLineSeries() {
    const data = this.yearData[this.currentYear];
    return [
      { name: 'Revenue', data: data.revenue },
      { name: 'Expenses', data: data.expenses }
    ];
  }

  changeYear(year: string) {
    this.currentYear = year;
    this.renderLineChart();
  }

  // -------- Chart 3: Sales Trend --------
  renderTrendChart(): void {
    if (this.salesTrendChart) this.salesTrendChart.destroy();

    const options: ApexCharts.ApexOptions = {
      series: this.series,
      chart: {
        height: 300,
        type: 'line',
        toolbar: { show: false },
        zoom: { enabled: false }
      },
      dataLabels: { enabled: false },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      grid: {
        padding: {
          top: -20,
          right: -10,
          bottom: 0
        },
        borderColor: '#f1f1f1',
        strokeDashArray: 4
      },
      xaxis: {
        categories: this.labels,
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: {
        labels: {
          formatter: (value) => '$' + value.toFixed(0)
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right'
      },
      colors: this.getColorList(this.salesTrendChartRef),
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.25,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 100]
        }
      },
      tooltip: {
        y: {
          formatter: (value) => '$' + value.toFixed(0)
        }
      }
    };

    this.salesTrendChart = new ApexCharts(this.salesTrendChartRef.nativeElement, options);
    this.salesTrendChart.render();
  }


  renderTopSellingItemsChart(): void {
    if (this.topSellingItemsChart) this.topSellingItemsChart.destroy();

    const options: ApexCharts.ApexOptions = {
      series: this.topSellingSeries,
      chart: {
        height: 300,
        type: 'bar',
        stacked: true,
        toolbar: { show: false },
        zoom: { enabled: true }
      },
      colors: this.getColorList(this.topSellingItemsChartRef),
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 11,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '13px',
                fontWeight: 900
              }
            }
          }
        }
      },
      fill: {
        opacity: 1,
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.25,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 100]
        }
      },
      xaxis: {
        categories: this.topSellingLabels,
        type: 'datetime'
      },
      legend: {
        show: false,
        position: 'right',
        offsetY: 40
      },
      grid: {
        padding: { top: -20, right: -10, bottom: 0 }
      }
    };

    this.topSellingItemsChart = new ApexCharts(this.topSellingItemsChartRef.nativeElement, options);
    this.topSellingItemsChart.render();
  }
}
