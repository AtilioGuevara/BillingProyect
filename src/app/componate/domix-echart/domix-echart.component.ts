import { Component, ElementRef, Input, OnChanges, AfterViewInit, OnDestroy, ViewChild, SimpleChanges } from '@angular/core';
import * as echarts from 'echarts';
import { ColorService } from '../../service/color.service';

@Component({
  selector: 'app-domix-echart',
  standalone: true,
  templateUrl: './domix-echart.component.html',
  styleUrls: ['./domix-echart.component.scss']
})
export class DomixEchartComponent implements OnChanges, AfterViewInit, OnDestroy {

  @ViewChild('eChartContainer') eChartContainer!: ElementRef;
  @Input() chartData: any = {};
  private chartInstance: any;

  constructor(public colorsService: ColorService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData'] && !changes['chartData'].firstChange) {
      this.renderChart();
    }
  }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  private destroyChart() {
    if (this.chartInstance) {
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
  }

  renderChart(): void {
    if (!this.eChartContainer) return;

    // Create the chart instance if it doesn't exist
    if (!this.chartInstance) {
      this.chartInstance = echarts.init(this.eChartContainer.nativeElement, 'light');
    }

    // Set the options for the chart
    this.chartInstance.setOption(this.chartData);
  }
}
