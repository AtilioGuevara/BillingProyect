import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { RestApiService } from '../../../../Core/service/rest-api.service';

import { LucideAngularModule } from 'lucide-angular';
import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { AddEventModalComponent } from './model/add-event-modal/add-event-modal.component';
import { BookEventModalComponent } from './model/book-event-modal/book-event-modal.component';
import { RouterLink } from '@angular/router';
import { DeleteModalComponent } from '../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
import { DomixPaginationComponent } from '../../../../componate/domix-pagination/domix-pagination.component';
import { DomixGridTestComponent } from '../../../../componate/domix-grid-test/domix-grid-test.component';
import { DomixTableService } from '../../../../componate/domix-grid-test/service/domix-table.service';
export interface Contributor {
  image: string;
  name: string;
}

export interface EventDetails {
  name: string;
  username: string;
  price: string;
  date: string;
  time: string;
  location: string;
  image: string;
  mainImage: string;
  contributors: Contributor[];
  peopleSize: string;
  eventType: string;
  status: string;
}

@Component({
    selector: 'app-apps-events-grid',
    imports: [
        PageTitleComponent,
        LucideAngularModule,
        DomixDropdownModule,
        DomixPaginationComponent,
        CommonModule,
        RouterLink,
    ],
    templateUrl: './apps-events-grid.component.html',
    styleUrl: './apps-events-grid.component.scss'
})
export class AppsEventsGridComponent extends DomixGridTestComponent {
  displayedEvents: EventDetails[] = [];
  contributors: Contributor[] = [];
  sortStatus = false;

  constructor(
    public restApiService: RestApiService,
    private modalService: ModalService,
    public domiex: DomixTableService
  ) {
    super(domiex);
  }

  ngOnInit(): void {
    this.EventData();
  }

  EventData() {
    this.restApiService.getEventData().subscribe((data: any) => {
      this.displayedEvents = data;
      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }

  sort(dir: string = 'asc', field: string = 'name', headerName: string = '') {
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

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-GB', options);
  }
  formatDateTime(dateStr: string, timeStr: string): string {
    if (!dateStr || !timeStr) return 'Invalid date or time';

    // Combine date and time into a single Date object
    const dateTimeStr = `${dateStr}T${timeStr}`;
    const date = new Date(dateTimeStr);

    if (isNaN(date.getTime())) return 'Invalid date or time'; // Check if date is valid

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short', // "short", "long", or "narrow"
      day: '2-digit', // "2-digit" or "numeric"
      month: 'short', // "short", "long", or "narrow"
      year: 'numeric', // "2-digit" or "numeric"
      hour: 'numeric', // "2-digit" or "numeric"
      minute: 'numeric', // "2-digit" or "numeric"
      hour12: true, // true or false
    };

    // Using toLocaleString to include time
    return date.toLocaleString('en-GB', options);
  }

  getWeekday(dateStr: string, passOnlyDate = false) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { weekday: 'short' };
    if (passOnlyDate) {
      return date.getDate();
    } else {
      return date.toLocaleDateString('en-GB', options);
    }
  }
  addEventModal(projectData: EventDetails | null, index: number | null) {
    const data = projectData;

    this.modalService.open(AddEventModalComponent, data, (result) => {
      if (result) {
        if (result.isAddOrEdit) {
          if (index !== null && index > -1) {
            this.gridData[index] = {
              ...this.gridData[index],
              ...result.formData,
            };
          }
        } else {
          this.gridData.unshift(result.formData);
        }

        this.displayedData = [...this.gridData];
        this.updateDisplayedData();
      }
    });
  }

  bookEventModal(data: EventDetails) {
    this.modalService.open(BookEventModalComponent, data);
  }

  deleteEvent(index: number) {
    this.modalService.open(DeleteModalComponent, {}, (result) => {
      if (result) {
        this.gridData.splice(index, 1);
        this.displayedData = [...this.gridData];
        this.updateDisplayedData();
      }
    });
  }
}
