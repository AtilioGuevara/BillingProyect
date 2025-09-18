import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { DomixPaginationComponent } from "../../../../componate/domix-pagination/domix-pagination.component";
import { ColDefs, DomixGridTestComponent } from '../../../../componate/domix-grid-test/domix-grid-test.component';
import { RestApiService } from '../../../../Core/service/rest-api.service';
import { DomixTableService } from '../../../../componate/domix-grid-test/service/domix-table.service';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { DeleteModalComponent } from '../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
interface Promotion {
  promoCode?: string;
  promotionName: {
    title: string;
    description: string;
  };
  type: 'Percentage' | 'Fixed Amount' | 'BOGO';
  discount: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  status: 'Active' | 'Scheduled' | 'Inactive' | 'Expired';
  usage?: string;
}

interface RecentActivity {
  id: number;
  action: 'created' | 'updated' | 'deleted' | 'expired';
  promotionName: string;
  timestamp: Date;
  status: string;
  type: 'green' | 'blue' | 'orange' | 'yellow' | 'red';
}

@Component({
  selector: 'app-apps-pos-promotions-marketing',
  imports: [PageTitleComponent, DomixPaginationComponent, SimplebarAngularModule, CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './apps-pos-promotions-marketing.component.html',
  styleUrl: './apps-pos-promotions-marketing.component.scss'
})
export class AppsPosPromotionsMarketingComponent extends DomixGridTestComponent {
  allEmployee: Promotion[] = [];
  hasHeaderCheckbox = false;
  sortStatus = false;
  newPromotion: Promotion = this.getEmptyPromotion();
  editingPromotion: boolean = false;
  editIndex: number | null = null;

  getEmptyPromotion(): Promotion {
    return {
      promotionName: { title: '', description: '' },
      type: 'Percentage',
      discount: '',
      startDate: '',
      endDate: '',
      status: 'Active'
    };
  }

  onSubmitPromotion() {
    const duration = `${this.newPromotion.startDate} - ${this.newPromotion.endDate}`;
    const promo = { ...this.newPromotion, duration };

    if (this.editingPromotion && this.editIndex !== null) {
      this.gridData[this.editIndex] = promo;
    } else {
      promo.promoCode = 'PROMO' + (Math.floor(Math.random() * 10000)).toString(); // generate promo code
      promo.usage = '0/500';
      this.gridData.unshift(promo);
    }

    this.displayedData = [...this.gridData];
    this.updateDisplayedData();

    // Reset form
    this.newPromotion = this.getEmptyPromotion();
    this.editingPromotion = false;
    this.editIndex = null;
  }

  editPromotion(index: number) {
    this.newPromotion = { ...this.gridData[index] };
    this.editingPromotion = true;
    this.editIndex = index;
  }

  cancelEdit() {
    this.newPromotion = this.getEmptyPromotion();
    this.editingPromotion = false;
    this.editIndex = null;
  }

  constructor(
    public restApiService: RestApiService,
    public domiex: DomixTableService,
    private modalService: ModalService
  ) {
    super(domiex);
    this.hasHeaderCheckbox = this.columnDefs.some((col) => col.headerCheckbox);
  }

  ngOnInit(): void {
    this.pageSize = 6;
    this.projectData();
  }

  projectData() {
    this.restApiService.getPosPromotionsMarketingData().subscribe((data: any) => {
      this.allEmployee = data;
      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }

  deleteModal(index: number) {
    this.modalService.open(DeleteModalComponent, {}, (result) => {
      if (result) {
        this.gridData.splice(index, 1);
        this.displayedData = [...this.gridData];
        this.updateDisplayedData();
      }
    });
  }

  generateAvatarText(promotion: any): string {
    const title = promotion.promotionName.title;
    const words = title.trim().split(' ');

    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    } else {
      return words.slice(0, 2).map((word: string) => word[0]).join('').toUpperCase();
    }
  }

  columnDefs: ColDefs[] = [
    {
      field: 'promoCode',
      headerName: 'Promo code',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'promotionName',
      headerName: 'Promotion Name',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'type',
      headerName: 'Type',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'discount',
      headerName: 'Discount',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'duration',
      headerName: 'Duration',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'usage',
      headerName: 'Usage',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      headerName: 'Action',
      sortable: false,
    },
  ];

  recentActivities: RecentActivity[] = [
    {
      id: 1,
      action: 'created',
      promotionName: 'Black Friday Sale',
      timestamp: new Date(Date.now() - 7200000),
      status: 'Active',
      type: 'green'
    },
    {
      id: 5,
      action: 'updated',
      promotionName: 'Weekend Special',
      timestamp: new Date(Date.now() - 14400000),
      status: 'Active',
      type: 'blue'
    },
    {
      id: 2,
      action: 'updated',
      promotionName: 'Holiday Special',
      timestamp: new Date(Date.now() - 18000000),
      status: 'Scheduled',
      type: 'blue'
    },
    {
      id: 7,
      action: 'created',
      promotionName: 'Early Bird Special',
      timestamp: new Date(Date.now() - 21600000),
      status: 'Active',
      type: 'green'
    },
    {
      id: 6,
      action: 'deleted',
      promotionName: 'Clearance Event',
      timestamp: new Date(Date.now() - 28800000),
      status: 'Inactive',
      type: 'orange'
    },
    {
      id: 8,
      action: 'expired',
      promotionName: 'Bundle Deal',
      timestamp: new Date(Date.now() - 36000000),
      status: 'Expired',
      type: 'red'
    },
    {
      id: 4,
      action: 'created',
      promotionName: 'Back to School',
      timestamp: new Date(Date.now() - 43200000),
      status: 'Scheduled',
      type: 'green'
    },
    {
      id: 3,
      action: 'expired',
      promotionName: 'Summer Sale',
      timestamp: new Date(Date.now() - 86400000),
      status: 'Expired',
      type: 'red'
    },
    {
      id: 9,
      action: 'updated',
      promotionName: 'Bundle Deal',
      timestamp: new Date(Date.now() - 227000000),
      status: 'Updated',
      type: 'blue'
    },

    {
      id: 10,
      action: 'created',
      promotionName: 'Back to School',
      timestamp: new Date(Date.now() - 43200000),
      status: 'Scheduled',
      type: 'green'
    },
    {
      id: 11,
      action: 'expired',
      promotionName: 'Summer Sale',
      timestamp: new Date(Date.now() - 86400000),
      status: 'Expired',
      type: 'red'
    },
  ];

  getTimeAgo(date: Date): string {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  }

}
