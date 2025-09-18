import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { LucideAngularModule } from 'lucide-angular';

import { RestApiService } from '../../../../Core/service/rest-api.service';
import { CommonModule } from '@angular/common';
import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';
import { FormsModule } from '@angular/forms';
import { DomixPaginationComponent } from '../../../../componate/domix-pagination/domix-pagination.component';
import { DomixGridTestComponent } from '../../../../componate/domix-grid-test/domix-grid-test.component';
import { DomixTableService } from '../../../../componate/domix-grid-test/service/domix-table.service';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { CallModalComponent } from './call-modal/call-modal.component';
import { MessageModalComponent } from './message-modal/message-modal.component';
interface Message {
  id: number;
  sender: 'agent' | 'user';
  text: string;
}

interface ProjectDeal {
  image: string;
  projectName: string;
  createDate: string;
  endDate: string;
  amount: string;
  company: string;
  content: string;
  status: 'Active' | 'Unactive';
  userImage: string;
  messages: Message[];
  daysLeft: string;
}

@Component({
    selector: 'app-apps-crm-deal',
    imports: [
        PageTitleComponent,
        LucideAngularModule,
        CommonModule,
        DomixDropdownModule,
        FormsModule,
        DomixPaginationComponent,
    ],
    templateUrl: './apps-crm-deal.component.html',
    styleUrl: './apps-crm-deal.component.scss'
})
export class AppsCrmDealComponent extends DomixGridTestComponent {
  projectDeal: ProjectDeal[] = [];
  searchQuery: string = ''; // <-- Add searchQuery to hold search input
  isCardView = false; // Default view
  sortStatus = false;

  constructor(
    public restApiService: RestApiService,
    public domiex: DomixTableService,
    private modalService: ModalService
  ) {
    super(domiex);
  }

  ngOnInit(): void {
    this.projectData();
  }


  setView(isCard: boolean) {
    this.isCardView = isCard;
  }
  projectData() {
    this.restApiService.getCrmDealData().subscribe((data: any) => {
      data = data.map((deal: any) => ({
        ...deal,
        daysLeft: this.calculateDaysLeft(deal.endDate),
      }));

      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }

  sort(dir: string = 'asc', field: string = 'projectName', headerName: string = '') {
    let data = {
      field: field,
      headerName: headerName,
      sortable: true,
      sortDiraction: dir,
    }
    this.onSortChange(data)
    // this.updateDisplayedData()
  }

  statusSort() {
    let data = {
      field: 'status',
      headerName: 'Status',
      sortable: true,
      sortDiraction: !this.sortStatus ? 'desc' : 'asc',
    }

    this.onSortChange(data);
    this.sortStatus = !this.sortStatus;
  }

  calculateDaysLeft(endDate: string): string | number {
    const today = new Date();
    const end = new Date(endDate);
    const timeDiff = end.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysLeft > 0 ? daysLeft : 'Expired';
  }

  getDaysLeftText(daysLeft: string | number): string {
    return typeof daysLeft === 'number' ? `${daysLeft} Days left` : daysLeft;
  }

  // Method to filter project deals based on the search query
  get filteredProjectDeal() {
    return this.projectDeal.filter((deal) =>
      deal.projectName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  openCallModal(data: ProjectDeal) {
    // const selectedDeal = this.displayedData[index];
    this.modalService.open(CallModalComponent, data);
  }

  openmessageModal(data: ProjectDeal) {
    this.modalService.open(MessageModalComponent, data);
  }
}
