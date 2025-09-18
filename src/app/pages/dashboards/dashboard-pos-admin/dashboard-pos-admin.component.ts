import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PageTitleComponent } from "../../../layouts/page-title/page-title.component";
import { DomixDropdownModule } from '../../../module/domix dropdown/domix-dropdown.module';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LucideAngularModule } from 'lucide-angular';
import { CountUpModule } from 'ngx-countup';
import Swiper from 'swiper';
import { CommonModule } from '@angular/common';
import ApexCharts from 'apexcharts';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DomixChartsComponent } from "../../../componate/domix-charts/domix-charts.component";
import { CustomApexOptions, SeriesType } from '../../../componate/domix-charts/Model/Display-Chart.model';
import { RouterLink } from '@angular/router';
import { ColorService } from '../../../service/color.service';

interface Order {
  orderNumber: string;
  productName: string;
  orderDate: string;
  customersName: string;
  price: string;
  quantity: number;
  totalAmount: string;
  paymentMethod: string;
  status: string;
  pickupTime?: string;
  deliveryAddress?: string;
  tableNumber?: string;
}


@Component({
  selector: 'app-dashboard-pos-admin',
  imports: [PageTitleComponent, DomixDropdownModule, RouterLink, CommonModule, SimplebarAngularModule, LucideAngularModule, CountUpModule, FormsModule, DomixChartsComponent],
  templateUrl: './dashboard-pos-admin.component.html',
  styleUrl: './dashboard-pos-admin.component.scss'
})
export class DashboardPosAdminComponent {
  options = { autoHide: true };
  orders: Order[] = [];
  paginationDynamicSliderContainer!: ElementRef;
  newChart!: { series: SeriesType; chartOptions: CustomApexOptions };
  activePeriod: 'thisMonth' | 'lastMonth' = 'thisMonth';
  constructor(private http: HttpClient, private colorService: ColorService) { }
  @ViewChild('customersChartRef', { static: true }) customersChartRef!: ElementRef;
  @ViewChild('paymentTypesChartRef', { static: true }) paymentTypesChartRef!: ElementRef;

  @Input() selectedPeriod: 'recent' | 'weekly' | 'monthly' | 'yearly' = 'recent';

  customersChart!: ApexCharts;
  paymentChart!: ApexCharts;
  filteredOrders: Order[] = [];
  displayedOrders: Order[] = [];
  activeTab: string = 'Dine In';
  searchTerm: string = '';
  sortBy: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  dataSets = {
    thisMonth: {
      series: [
        { name: 'Sales', data: [44, 55, 41, 67, 22, 43, 44, 55, 41, 67, 22, 43] },
        { name: 'Revenue', data: [13, 23, 20, 8, 13, 27, 13, 23, 20, 8, 13, 27] },
      ],
      labels: [
        '05/01/2025 GMT', '05/02/2025 GMT', '05/03/2025 GMT', '05/04/2025 GMT',
        '05/05/2025 GMT', '05/06/2025 GMT', '05/07/2025 GMT', '05/08/2025 GMT',
        '05/09/2025 GMT', '05/10/2025 GMT', '05/11/2025 GMT', '05/12/2025 GMT'
      ],
    },
    lastMonth: {
      series: [
        { name: 'Sales', data: [30, 40, 35, 50, 20, 35, 30, 40, 35, 50, 20, 35] },
        { name: 'Revenue', data: [10, 15, 12, 5, 8, 15, 10, 15, 12, 5, 8, 15] },
      ],
      labels: [
        '04/01/2025 GMT', '04/02/2025 GMT', '04/03/2025 GMT', '04/04/2025 GMT',
        '04/05/2025 GMT', '04/06/2025 GMT', '04/07/2025 GMT', '04/08/2025 GMT',
        '04/09/2025 GMT', '04/10/2025 GMT', '04/11/2025 GMT', '04/12/2025 GMT'
      ],
    },
  };

  ngOnInit() {
    this.http.get<Order[]>('assets/api/pos-admin-list.json').subscribe(data => {
      this.orders = data;
      this.filterOrders(); // Then filter by tab
    });

    this.renderChart(this.activePeriod);

    new Swiper('.mySwiper', {
      loop: true,
      slidesPerView: 2,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
    });
  }


  // Customers Line Chart Data
  recentData = {
    values: [15, 25, 35, 45, 55, 65, 75],
    labels: ['Today', 'Yesterday', '2 days ago', '3 days ago', '4 days ago', '5 days ago', '6 days ago']
  };

  weeklyData = {
    values: [28, 50, 70, 90, 70, 50, 60],
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  };

  monthlyData = {
    values: [150, 180, 220, 250, 280, 300, 320, 350, 380, 400, 420, 450],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };

  yearlyData = {
    values: [1200, 1500, 1800, 2100, 2400, 2700],
    labels: ['2019', '2020', '2021', '2022', '2023', '2024']
  };

  // Payment Donut Chart Data
  paymentSeries: number[] = [974, 750, 510, 170, 150];
  paymentLabels: string[] = ['Cash', 'Credit Card', 'PayPal', 'Bank Transfer', 'Other'];

  ngAfterViewInit(): void {
    this.renderCustomersChart();
    this.renderPaymentChart();
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
    this.customersChart?.destroy();
    this.paymentChart?.destroy();
  }

  onResize = () => {
    this.renderCustomersChart();
    this.renderPaymentChart();
  };

  getCurrentCustomerData() {
    switch (this.selectedPeriod) {
      case 'weekly': return this.weeklyData;
      case 'monthly': return this.monthlyData;
      case 'yearly': return this.yearlyData;
      case 'recent':
      default:
        return this.recentData;
    }
  }

  renderCustomersChart() {
    this.customersChart?.destroy();

    const data = this.getCurrentCustomerData();
    const colorsAttr = this.customersChartRef.nativeElement.getAttribute('data-chart-colors') || '';
    const colorClasses = colorsAttr.replace(/[\[\]\s"]/g, '').split(',');
    const hexColors = this.colorService.getColorCodes(colorClasses);

    const options: ApexCharts.ApexOptions = {
      series: [{ name: 'Customers', data: data.values }],
      chart: {
        height: 180,
        type: 'area',
        sparkline: { enabled: true },
        zoom: { enabled: true }
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 2 },
      xaxis: {
        categories: data.labels,
        labels: { style: { fontSize: '12px' } }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.8,
          opacityTo: 0,
          stops: [0, 100]
        }
      },
      colors: hexColors,
      grid: {
        show: true,
        strokeDashArray: 3,
        position: 'back',
        padding: { top: 0, right: 5, bottom: 0 },
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: false } }
      },
      tooltip: {
        y: {
          formatter: (value: number) => `${value} customers`
        }
      }
    };

    this.customersChart = new ApexCharts(this.customersChartRef.nativeElement, options);
    this.customersChart.render();
  }

  renderPaymentChart() {
    this.paymentChart?.destroy();

    const colorsAttr = this.paymentTypesChartRef.nativeElement.getAttribute('data-chart-colors') || '';
    const colorClasses = colorsAttr.replace(/[\[\]\s"]/g, '').split(',');
    const hexColors = this.colorService.getColorCodes(colorClasses);

    const options: ApexCharts.ApexOptions = {
      series: this.paymentSeries,
      labels: this.paymentLabels,
      chart: {
        height: 300,
        type: 'donut',
        dropShadow: {
          enabled: true,
          color: '#111',
          top: -1,
          left: 3,
          blur: 3,
          opacity: 0.1
        },
        events: {
          legendClick: (chartContext: any, seriesIndex: number) => {
            const label = this.paymentLabels[seriesIndex];
            const items = document.querySelectorAll('.payment-legend-item');
            items.forEach(item => {
              if (item.getAttribute('data-label') === label) {
                item.classList.toggle('opacity-50');
              }
            });
          }
        }
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
          donut: {
            size: '65%',
            background: 'transparent',
            labels: {
              show: true,
              name: { show: true, fontSize: '16px', fontWeight: 500, color: '#373d3f' },
              value: {
                show: true,
                fontSize: '20px',
                fontWeight: 600,
                offsetY: 12,
                color: '#373d3f',
                formatter: val => val + '%'
              },
              total: {
                show: true,
                label: 'Total',
                fontSize: '16px',
                fontWeight: 400,
                color: '#373d3f', formatter: (w: any) => '$' + w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0)
              }
            }
          }
        }
      },
      dataLabels: { enabled: false },
      colors: hexColors,
      fill: { type: 'gradient' },
      stroke: { width: 0, lineCap: 'round' },
      legend: { show: false },
      tooltip: {
        enabled: true,
        theme: 'dark',
        style: { fontSize: '12px', fontFamily: 'Helvetica, Arial, sans-serif' },
        y: {
          formatter: val => val + '%'
        }
      },
      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 0.9
          }
        }
      }
    };

    this.paymentChart = new ApexCharts(this.paymentTypesChartRef.nativeElement, options);
    this.paymentChart.render();
  }

  changeTab(tab: string) {
    this.activeTab = tab;
    this.currentPage = 1;
    this.filterOrders();
  }

  filterOrders() {
    // Filter by tab
    let filtered = this.orders.filter(order => order.status === this.activeTab);

    // Filter by search term
    if (this.searchTerm) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        order.productName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        order.customersName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredOrders = filtered;
    this.calculatePagination();
    this.updateDisplayedOrders();
  }

  onSearchChange() {
    this.currentPage = 1;
    this.filterOrders();
  }

  sort(column: string) {
    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortDirection = 'asc';
    }

    this.filteredOrders.sort((a, b) => {
      let aValue = this.getColumnValue(a, column);
      let bValue = this.getColumnValue(b, column);

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    this.updateDisplayedOrders();
  }

  private getColumnValue(order: Order, column: string): any {
    switch (column) {
      case 'orderNumber':
        return order.orderNumber;
      case 'orderDate':
        return new Date(order.orderDate);
      case 'productName':
        return order.productName;
      case 'customersName':
        return order.customersName;
      case 'quantity':
        return order.quantity;
      case 'totalAmount':
        return parseFloat(order.totalAmount.replace('$', ''));
      case 'paymentMethod':
        return order.paymentMethod;
      case 'tableNumber':
        return order.tableNumber;
      case 'pickupTime':
        return order.pickupTime;
      case 'deliveryAddress':
        return order.deliveryAddress;
      default:
        return '';
    }
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredOrders.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }
  }

  updateDisplayedOrders() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedOrders = this.filteredOrders.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedOrders();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedOrders();
    }
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.updateDisplayedOrders();
  }

  get showingStart(): number {
    return this.filteredOrders.length > 0 ? (this.currentPage - 1) * this.itemsPerPage + 1 : 0;
  }

  get showingEnd(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredOrders.length);
  }

  get paginationPages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  getPaymentMethodClass(paymentMethod: string): string {
    switch (paymentMethod) {
      case 'Cash':
        return 'badge badge-purple';
      case 'Debit Card':
        return 'badge badge-yellow';
      case 'Credit Card':
        return 'badge badge-orange';
      case 'Bank Transfer':
        return 'badge badge-green';
      default:
        return 'badge';
    }
  }

  getSortIcon(column: string): string {
    if (this.sortBy === column) {
      return this.sortDirection === 'asc' ? '↑' : '↓';
    }
    return '';
  }

  renderChart(period: 'thisMonth' | 'lastMonth') {
    const data = this.dataSets[period];
    this.newChart = {
      series: data.series,
      chartOptions: {
        chart: {
          height: 310,
          type: 'bar',
          stacked: true,
          toolbar: { show: false },
          zoom: { enabled: true },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 6,
            columnWidth: '25%',
          },
        },
        dataLabels: { enabled: false },
        colors: [],
        dataSet: ['bg-primary-500', 'bg-green-500', 'bg-primary-100', 'bg-green-100'],
        xaxis: {
          categories: data.labels,
          type: 'datetime',
        },
        legend: { show: false },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.5,
            gradientToColors: ['#C0E3FA', '#C6F5B9'],
            inverseColors: false,
            opacityFrom: 0.8,
            opacityTo: 0.8,
            stops: [0, 100],
          },
        },
      },
    };
  }

  switchPeriod(period: 'thisMonth' | 'lastMonth') {
    this.activePeriod = period;
    this.renderChart(period);
  }

  productSales = [
    {
      name: 'Triple Cheese Bacon Supreme',
      sku: 'SRB-041',
      image: 'assets/images/pos/img-06.png',
      quantity: '1,234',
      quantityLabel: 'Sales',
      amount: '$12,340',
      growth: '+12.5%',
      growthColor: 'text-green-600'
    },
    {
      name: 'Prosciutto Fig Balsamic Glaze',
      sku: 'SRB-029',
      image: 'assets/images/pos/img-14.png',
      quantity: '856',
      quantityLabel: 'units',
      amount: '$8,560',
      growth: '+8.3%',
      growthColor: 'text-green-600'
    },
    {
      name: 'Honey Ginger Spice Mojito',
      sku: 'SRB-086',
      image: 'assets/images/pos/img-21.png',
      quantity: '654',
      quantityLabel: 'units',
      amount: '$3,270',
      growth: '-2.1%',
      growthColor: 'text-red-600'
    },
    {
      name: 'Smoky Chipotle Cilantro Rice',
      sku: 'SRB-093',
      image: 'assets/images/pos/img-11.png',
      quantity: '573',
      quantityLabel: 'units',
      amount: '$3,270',
      growth: '-2.1%',
      growthColor: 'text-red-600'
    },

    {
      name: 'Triple Cheese Bacon Supreme',
      sku: 'SRB-042',
      image: 'assets/images/pos/img-06.png',
      quantity: '1,234',
      quantityLabel: 'Sales',
      amount: '$12,340',
      growth: '+12.5%',
      growthColor: 'text-green-600'
    },
    {
      name: 'Prosciutto Fig Balsamic Glaze',
      sku: 'SRB-030',
      image: 'assets/images/pos/img-14.png',
      quantity: '856',
      quantityLabel: 'units',
      amount: '$8,560',
      growth: '+8.3%',
      growthColor: 'text-green-600'
    },
  ];

  inventoryItems = [
    {
      name: 'Coffee milk Latte Tea Cappuccino',
      image: 'assets/images/pos/img-02.png',
      percentage: 85,
      inStock: 425,
      total: 500,
      barColor: 'bg-green-500'
    },
    {
      name: 'Classic Lime Mint Refresher',
      image: 'assets/images/pos/img-20.png',
      percentage: 45,
      inStock: 225,
      total: 500,
      barColor: 'bg-yellow-500'
    },
    {
      name: 'Grapefruit Rosemary Citrus Fizz',
      image: 'assets/images/pos/img-22.png',
      percentage: 15,
      inStock: 75,
      total: 500,
      barColor: 'bg-red-500'
    },
    {
      name: 'Gourmet Truffle Umami Explosion',
      image: 'assets/images/pos/img-17.png',
      percentage: 60,
      inStock: 300,
      total: 500,
      barColor: 'bg-green-500'
    },
    {
      name: 'Black Bean Southwest',
      image: 'assets/images/pos/img-18.png',
      percentage: 92,
      inStock: 460,
      total: 500,
      barColor: 'bg-green-500'
    },
    {
      name: 'Peppermint Mocha Holiday Cheer',
      image: 'assets/images/pos/img-04.png',
      percentage: 28,
      inStock: 140,
      total: 500,
      barColor: 'bg-yellow-500'
    }
  ];

  payments = [
    {
      icon: 'credit-card',
      method: 'Credit Card Payment',
      time: 'Today, 02:45 PM',
      amount: '+$128.75',
      color: 'text-green-500',
    },
    {
      icon: 'wallet',
      method: 'Cash Payment',
      time: 'Today, 01:30 PM',
      amount: '+$85.50',
      color: 'text-green-500',
    },
    {
      icon: 'smartphone',
      method: 'Mobile Payment',
      time: 'Today, 12:15 PM',
      amount: '-$45.99',
      color: 'text-red-500',
    },
    {
      icon: 'banknote',
      method: 'Bank Transfer',
      time: 'Today, 11:00 AM',
      amount: '-$250.00',
      color: 'text-red-500',
    },
    {
      icon: 'wallet',
      method: 'Cash Payment',
      time: 'Today, 10:49 AM',
      amount: '+$178.14',
      color: 'text-green-500',
    },
    {
      icon: 'wallet',
      method: 'Cash Payment',
      time: 'Today, 10:30 AM',
      amount: '+$224.93',
      color: 'text-green-500',
    },
  ];
  summaryList = [
    {
      icon: 'dollar-sign',
      title: 'Total Revenue',
      amount: '$1,245,750',
      progress: 74,
      orders: '1,845 Orders',
      colClass: 'col-span-12 md:col-span-6 lg:col-span-4 p-5 md:last:pr-0 md:first:pl-0',
      border: '',
    },
    {
      icon: 'utensils',
      title: 'Dine In',
      amount: '$785,320',
      progress: 63,
      orders: '1,152 Orders',
      colClass: 'col-span-12 md:col-span-6 lg:col-span-4 p-5 md:last:pr-0 md:first:pl-0',
      border: 'border-y md:border-y-0 md:border-l lg:border-r border-gray-200 dark:border-dark-800',
    },
    {
      icon: 'package',
      title: 'Takeaway',
      amount: '$460,430',
      progress: 37,
      orders: '693 Orders',
      colClass: 'col-span-12 md:col-span-12 lg:col-span-4 p-5 lg:last:pr-0 md:first:pl-0',
      border: '',
    },
  ];

  swiperUsers = [
    {
      name: 'Alexander Brown',
      date: '20 May, 2025',
      amount: '$154.87',
      status: 'Done',
      image: 'assets/images/avatar/user-14.png'
    },
    {
      name: 'Sophia Martinez',
      date: '10 May, 2025',
      amount: '$291.49',
      status: 'Pending',
      image: 'assets/images/avatar/user-18.png'
    },
    {
      name: 'Benjamin Brown',
      date: '10 May, 2025',
      amount: '$114.99',
      status: 'Done',
      image: 'assets/images/avatar/user-11.png'
    },
    {
      name: 'Elizabeth Martinez',
      date: '28 Feb, 2025',
      amount: '$548.69',
      status: 'Done',
      image: 'assets/images/avatar/user-5.png'
    }
  ];

}
