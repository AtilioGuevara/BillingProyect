import { Component, ElementRef, Input, SimpleChanges, ViewChild, OnDestroy } from '@angular/core';
import { ApexAxisChartSeries } from 'ng-apexcharts';
import ApexCharts from 'apexcharts';
import { ColorService } from '../../service/color.service';
import { CustomApexOptions, SeriesType } from './Model/Display-Chart.model';
import { LayoutSettingService } from '../../layouts/layout-setting.service';

@Component({
    selector: 'app-domix-charts',
    imports: [],
    templateUrl: './domix-charts.component.html',
    styleUrl: './domix-charts.component.scss'
})
export class DomixChartsComponent implements OnDestroy {
  @ViewChild('chartContainer') chartContainer!: ElementRef;

  @Input() series!: SeriesType;
  @Input() chartOptions!: CustomApexOptions;

  private chart: ApexCharts | null = null;

  constructor(public colorsService: ColorService, public settingService: LayoutSettingService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartOptions'] && !changes['chartOptions'].firstChange) {
      this.renderChart();
    }
  }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  private destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  private renderChart(): void {
    this.destroyChart(); // Destroy existing chart

    const options: CustomApexOptions = {
      ...(this.chartOptions = {
        ...this.chartOptions,
        colors: this.chartOptions.colors && this.chartOptions.colors.length === 0
          ? this.colorsService.getColorCodes(this.chartOptions.dataSet || [])
          : this.chartOptions.colors || []
      }),
      series: this.series,
    };

    this.chart = new ApexCharts(this.chartContainer.nativeElement, options);
    this.chart.render();
  }

  getColorCodes(dataset: any): string[] {
    return ['#00E396', '#008FFB', '#FEB019'];
  }
}
