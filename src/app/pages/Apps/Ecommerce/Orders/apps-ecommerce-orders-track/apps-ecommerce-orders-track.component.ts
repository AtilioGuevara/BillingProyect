import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../../layouts/page-title/page-title.component';
import { DomixPaginationComponent } from '../../../../../componate/domix-pagination/domix-pagination.component';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { RestApiService } from '../../../../../Core/service/rest-api.service';
import 'jsvectormap';
import 'jsvectormap/dist/maps/world.js';
import jsVectorMap from 'jsvectormap';
import { RouterLink } from '@angular/router';
import { DomixGridTestComponent } from '../../../../../componate/domix-grid-test/domix-grid-test.component';
import { DomixTableService } from '../../../../../componate/domix-grid-test/service/domix-table.service';
export interface Order {
  ordersDate: string;
  deliveredDate: string;
  customersName: string;
  productName: string;
  image: string;
  status: string;
}

@Component({
    selector: 'app-apps-ecommerce-orders-track',
    imports: [
        PageTitleComponent,
        CommonModule,
        DomixPaginationComponent,
        LucideAngularModule,
        RouterLink,
    ],
    templateUrl: './apps-ecommerce-orders-track.component.html',
    styleUrl: './apps-ecommerce-orders-track.component.scss'
})
export class AppsEcommerceOrdersTrackComponent extends DomixGridTestComponent {
  allOrder: Order[] = [];
  filterdReview: Order[] = [];
  displayReview: Order[] = [];
  openTab: number = 2;
  activeClasses: string = 'active';
  inactiveClasses: string =
    'text-gray-500 hover:text-primary-500 dark:text-dark-500 dark:hover:text-primary-500';
  progress: number = 33;

  constructor(public restApiService: RestApiService,
    public domiex: DomixTableService,
  ) {
    super(domiex);
  }

  ngOnInit(): void {
    this.pageSize = 8;
    this.projectData();
  }

  projectData() {
    this.restApiService.getOrderData().subscribe((data: any) => {
      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }

  ngAfterViewInit() {
    this.initMap();
  }

  changeTab(tab: number) {
    this.openTab = tab

    if (this.openTab === 2) {
      setTimeout(() => {
        this.initMap();
      }, 1);
    }
  }

  initMap() {
    const mapsConfig = [
      {
        selector: '#lineStyleMap',
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
          {
            coords: [26.8206, 30.8025],
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
}
