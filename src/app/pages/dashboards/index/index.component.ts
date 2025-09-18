import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CountUpModule } from 'ngx-countup';

import { LucideAngularModule } from 'lucide-angular';
import { ChartInfo } from '../../../componate/domix-charts/Model/Display-Chart.model';
import { DomixChartsComponent } from '../../../componate/domix-charts/domix-charts.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PRODUCTS } from '../../../Data/product-stock-list';
import { SimplebarAngularModule } from 'simplebar-angular';
import { RouterLink } from '@angular/router';
import 'jsvectormap';
import 'jsvectormap/dist/maps/world.js';
import jsVectorMap from 'jsvectormap';
import { DomixDropdownModule } from '../../../module/domix dropdown/domix-dropdown.module';
import { DomixTooltipModule } from '../../../module/domix tooltip/domix-tooltip.module';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';

interface Marker {
  name: string;
  coords: [number, number];
}

interface Product {
  productsID: string; // Ensure this property is included
  productName: string;
  stock: number;
  price: string;
  status: string;
}

@Component({
    selector: 'app-index',
    imports: [
        PageTitleComponent,
        CountUpModule,
        LucideAngularModule,
        DomixChartsComponent,
        FormsModule,
        CommonModule,
        DomixTooltipModule,
        SimplebarAngularModule,
        RouterLink,
        DomixDropdownModule,
    ],
    templateUrl: './index.component.html',
    styleUrl: './index.component.scss'
})
export class IndexComponent {
  options = { autoHide: true };
  products: Product[] = [];
  displayedProducts: Product[] = [];
  sortBy: keyof Product = 'productsID';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  itemsPerPage: number = 8;
  openTab = 1;
  donutChart!: ChartInfo;
  basicChart!: ChartInfo
  netProfitChart!: ChartInfo
  trafficChart!: ChartInfo

  constructor(private settingService: LayoutSettingService,) {
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart()
    });
  }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    const mapsConfig = [
      {
        selector: '#dashboardMap',
        map: 'world',
        markersSelectable: true,
        markers: [
          {
            coords: [-14.235, -51.9253],
          },
          {
            coords: [35.8617, 104.1954],
          },
          {
            coords: [61, 105],
          },
        ],
        markerStyle: {
          initial: {
            fill: '#3f4d67',
          },
          hover: {
            fill: '#04a9f5',
          },
        },
        markerLabelStyle: {
          initial: {
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            fill: '#3f4d67',
          },
        },
      },
    ];
    // Initialize each map based on its configuration
    mapsConfig.forEach((config) => {
      new jsVectorMap({
        selector: config.selector,
        map: config.map,
        markers: config.markers || [],
        markerStyle: config.markerStyle || {},
        markerLabelStyle: config.markerLabelStyle || {},
      });
    });
  }
  ngOnInit(): void {
    this.loadProducts();
    this.updateDisplayedProducts();
  }

  renderChart(): void {
    this.donutChart = {
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        chart: {
          height: 90,
          type: 'donut',
        },
        dataLabels: {
          enabled: false,
        },
        colors: [],
        dataSet: [
          'bg-primary-500',
          'bg-green-500',
          'bg-yellow-500',
          'bg-red-500',
          'bg-purple-500'
        ],
        legend: {
          show: false,
          position: 'bottom',
        },
        grid: {
          padding: {
            top: -6,
            right: 0,
            bottom: -10,
            left: 0,
          },
        },
      },
    };
    this.basicChart = {
      series: [
        {
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: 'Revenue',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
      ],
      chartOptions: {
        chart: {
          height: 280,
          type: 'bar',
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            borderRadius: 10, // Or use an object if different corners have different radii
          },
        },
        states: {
          hover: {
            filter: {
              type: 'none',
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          lineCap: 'round',
          colors: ['transparent'],
        },
        colors: [],
        dataSet: ['bg-red-200', 'bg-sky-500'],
        xaxis: {
          categories: [
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
          ],
        },
        yaxis: {
          title: {
            text: '$ (thousands)',
          },
        },
        tooltip: {
          y: {
            formatter: (val: number) => `$${val}k`,
          },
        },
      },
    };
    this.netProfitChart = {
      series: [
        {
          name: 'Profit',
          data: [5, 4, 7, 2, 8, 6, 3],
        },
      ],
      chartOptions: {
        chart: {
          height: 143,
          type: 'bar',
          toolbar: {
            show: false,
          },
          sparkline: { enabled: true },
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        grid: {
          padding: {
            top: 0,
            right: -10,
            bottom: 0,
            left: -10,
          },
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        dataSet: ['bg-primary-500', 'bg-green-500'],
        colors: [],
        tooltip: {
          y: {
            formatter: (val: number) => `${val}`,
          },
        },
      },
    };
    this.trafficChart = {
      series: [
        {
          name: 'Sales',
          data: [
            0.4, 0.65, 0.76, 0.88, 1.5, 2.1, 2.9, 3.8, 3.9, 4.2, 4, 4.3, 4.1, 4.2,
            4.5, 3.9, 3.5,
          ],
        },
        {
          name: 'Visit',
          data: [
            -0.8, -1.05, -1.06, -1.18, -1.4, -2.2, -2.85, -3.7, -3.96, -4.22,
            -4.3, -4.4, -4.1, -4, -4.1, -3.4, -3.1,
          ],
        },
      ],
      chartOptions: {
        chart: {
          height: 320,
          type: 'bar',
          stacked: true,
          toolbar: {
            show: false,
          },
        },
        colors: [],
        dataSet: ['bg-sky-500', 'bg-indigo-500'],
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '80%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          strokeDashArray: 2,
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: -20,
            bottom: 0,
          },
          row: {
            opacity: 0,
          },
        },
        yaxis: {
          min: -5,
          max: 5,
        },
        states: {
          hover: {
            filter: {
              type: 'none',
            },
          },
        },
        tooltip: {
          shared: false,
          x: {
            formatter: (val: any) => val,
          },
          y: {
            formatter: (val: any) => Math.abs(val) + '%',
          },
        },
        xaxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          labels: {
            formatter: (val: any) => Math.abs(Math.round(val)) + '%',
          },
        },
      },
    };
  }

  loadProducts(): void {
    // Use imported data
    this.products = PRODUCTS;
    this.updateDisplayedProducts();
  }

  sort(column: keyof Product): void {
    this.sortDirection =
      this.sortBy === column
        ? this.sortDirection === 'asc'
          ? 'desc'
          : 'asc'
        : 'asc';
    this.sortBy = column;
    this.updateDisplayedProducts();
  }

  updateDisplayedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.displayedProducts = this.products
      .sort((a, b) => {
        const key = this.sortBy as keyof Product; // Ensure TypeScript understands `this.sortBy` is a valid key
        const valueA = a[key];
        const valueB = b[key];

        // Handle comparison based on type
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return this.sortDirection === 'asc'
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
          return this.sortDirection === 'asc'
            ? valueA - valueB
            : valueB - valueA;
        } else {
          return 0;
        }
      })
      .slice(startIndex, endIndex);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedProducts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedProducts();
    }
  }

  gotoPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedProducts();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  get showingStart(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get showingEnd(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.products.length);
  }
  products2 = [
    {
      name: 'Sleeve Clothing Leggings',
      image: 'assets/images/products/img-05.png',
      link: 'apps-ecommerce-product-overview.html',
      rating: 4.5,
      price: '$22.00',
    },
    {
      name: 'Bra Lace Crop top',
      image: 'assets/images/products/img-06.png',
      link: 'apps-ecommerce-product-overview.html',
      rating: 5,
      price: '$29.99',
    },
    {
      name: 'Tote bag Leather Handbag Dolce',
      image: 'assets/images/products/img-08.png',
      link: 'apps-ecommerce-product-overview.html',
      rating: 5,
      price: '$79.99',
    },
    {
      name: 'Sneakers Shoe Nike Basketball',
      image: 'assets/images/products/img-11.png',
      link: 'apps-ecommerce-product-overview.html',
      rating: 4.5,
      price: '$32.00',
    },
  ];

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  newMessages = [
    {
      name: 'John Davis',
      text: 'Hello, How are you?',
      time: '04:25 PM',
      avatar: 'assets/images/avatar/user-11.png',
    },
    {
      name: 'Jordan Davis',
      text: 'Here are some of very cute illustration.',
      time: '11:20 AM',
      avatar: 'assets/images/avatar/user-3.png',
    },
    {
      name: 'Taylor Wilson',
      text: 'Use tools like Trello, Asana, or Jira for task management and progress tracking.',
      time: '10:49 AM',
      avatar: 'assets/images/avatar/user-4.png',
    },
    {
      name: 'Jane Brown',
      text: 'Regularly review and improve communication practices based on team feedback and project needs.',
      time: '03:32 AM',
      avatar: 'assets/images/avatar/user-5.png',
    },
    {
      name: 'Cameron Wilson',
      text: 'Schedule regular check-ins to address any roadblocks and keep everyone aligned.',
      time: '11:05 PM',
      avatar: 'assets/images/avatar/user-6.png',
    },
  ];

  allMessages = [
    {
      name: 'Sirkka Hakola',
      text: 'Hello, How are you?',
      time: '04:25 PM',
      avatar: 'assets/images/avatar/user-14.png',
    },
    {
      name: 'Jordan Davis',
      text: 'Here are some of very cute illustration.',
      time: '11:20 AM',
      avatar: 'assets/images/avatar/user-15.png',
    },
    {
      name: 'Nicholas Hope',
      text: 'Use tools like Trello, Asana, or Jira for task management and progress tracking.',
      time: '10:49 AM',
      avatar: 'assets/images/avatar/user-16.png',
    },
    {
      name: 'Susan Liles',
      text: 'Regularly review and improve communication practices based on team feedback and project needs.',
      time: '03:44 AM',
      avatar: 'assets/images/avatar/user-17.png',
    },
    {
      name: 'David Johnson',
      text: 'Schedule regular check-ins to address any roadblocks and keep everyone aligned.',
      time: '09:57 PM',
      avatar: 'assets/images/avatar/user-18.png',
    },
  ];
}
