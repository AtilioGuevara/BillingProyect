import { ApexAxisChartSeries } from 'ng-apexcharts';

export type SeriesType = number[] | ApexAxisChartSeries;

export interface CustomApexOptions extends ApexCharts.ApexOptions {
  dataSet: string[];
}

export interface ChartInfo {
  series: SeriesType;
  chartOptions: CustomApexOptions;
}
