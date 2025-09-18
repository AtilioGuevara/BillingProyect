import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../../../../../layouts/page-title/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { DomixDropdownModule } from '../../../../../../module/domix dropdown/domix-dropdown.module';
import { FormsModule } from '@angular/forms';
import { DomixPaginationComponent } from '../../../../../../componate/domix-pagination/domix-pagination.component';
import { CommonModule } from '@angular/common';
import { RestApiService } from '../../../../../../Core/service/rest-api.service';
import { DomixTableService } from '../../../../../../componate/domix-grid-test/service/domix-table.service';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../../../../componate/domix-grid-test/domix-grid-test.component';
import { loadStaffleaves } from '../../store/actions/staff-leaves.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectStaffleaves } from '../../store/selectors/staff-leaves.selectors';
import { Router, RouterLink } from '@angular/router';
import { FlatpickrModule } from '../../../../../../module/flatpickr/flatpickr.module';
import { NgSelectModule } from '@ng-select/ng-select';
export interface LeaveRequest {
  leaveType: string;
  contactNumber: string;
  emergencyNumber?: string; // Optional field
  startDate: string;
  endDate: string;
  totalDays: string;
  reason: string;
  approvedBy: string;
  dateRequested: string;
  dateApproved?: string; // Optional field
  status: string;
  staffleaveId: string;
}
@Component({
    selector: 'app-apps-hospital-staff-leaves',
    imports: [
        PageTitleComponent,
        CommonModule,
        DomixPaginationComponent,
        FormsModule,
        LucideAngularModule,
        RouterLink,
        FlatpickrModule,
        NgSelectModule
    ],
    templateUrl: './apps-hospital-staff-leaves.component.html',
    styleUrl: './apps-hospital-staff-leaves.component.scss'
})
export class AppsHospitalStaffLeavesComponent extends DomixGridTestComponent {
  allstaffleave: LeaveRequest[] = [];
  hasHeaderCheckbox = false;
  availableLeaveCount: number = 0;
  usedLeaveCount: number = 0;
  pendingLeaveCount: number = 0;
  rejectedLeaveCount: number = 0;
  totalLeaveCount: number = 0;

  store = inject(Store);
  leaveRequest: LeaveRequest[] = [];
  leaveRequest$!: Observable<LeaveRequest[]>;
  selectedCategory: string | null = null;


  public selectedFiltersRange = {
    from: 0,
    to: 1000,
  };
  selectedDateRange: any;
  rangePickerOptions: any = { mode: 'range', dateFormat: 'd M, Y' };

  categories = [
    { text: "All" },
    { text: "Approved" },
    { text: "Pending" },
    { text: "Rejected" },
  ]

  constructor(
    public restApiService: RestApiService,
    public domiex: DomixTableService,
    private modalService: ModalService,
    private router: Router
  ) {
    super(domiex);
    this.hasHeaderCheckbox = this.columnDefs.some((col) => col.headerCheckbox);
  }

  ngOnInit(): void {
    this.store.dispatch(loadStaffleaves());

    this.leaveRequest$ = this.store.select(selectStaffleaves);

    this.leaveRequest$.subscribe((products) => {
      this.gridData = products;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();

      // Reset counts
      this.availableLeaveCount = 0;
      this.usedLeaveCount = 0;
      this.pendingLeaveCount = 0;
      this.rejectedLeaveCount = 0;

      // Calculate counts
      products.forEach((leave) => {
        this.totalLeaveCount++;
        switch (leave.status) {
          case 'Available':
            this.availableLeaveCount++;
            break;
          case 'Approved':
            this.usedLeaveCount++;
            break;
          case 'Pending':
            this.pendingLeaveCount++;
            break;
          case 'Rejected':
            this.rejectedLeaveCount++;
            break;
        }
      });
    });
  }

  generateAvatarText(name: string): string {
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return nameParts[0][0] + nameParts[1][0];
    }
    return name[0];
  }

  columnDefs: ColDefs[] = [
    {
      field: 'staffleaveId',
      headerName: 'ID',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'leaveType',
      headerName: 'Leave Type',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'startdate',
      headerName: 'Start Date',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'enddate',
      headerName: '	End Date',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'totalDays',
      headerName: 'Days',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'reason',
      headerName: 'Reason',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'approvedBy',
      headerName: '	Approved By',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'dateRequested',
      headerName: 'Request Date',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'dateApproved',
      headerName: '	Approved Date ',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'status',
      headerName: '	Status ',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      headerName: 'Action',
      sortable: false,
    },
  ];

  catgoryChange() {
    if (this.selectedCategory !== 'All') {
      const filterModel: any = {};
      filterModel.status = {
        type: 'equals',
        filterType: 'text',
        filter: this.selectedCategory,
      };

      this.appliedFilters = filterModel;
      this.updateDisplayedData();
    }else{
      this.resetFilters();
    }
  }

  applyFilters() {
    const filterModel: any = {};

    if (this.selectedDateRange) {
      const dates = this.selectedDateRange.split(' to ');

      if (dates.length === 2) {
        const fromDate = dates[0];
        const toDate = dates[1];

        filterModel.dateRequested = {
          type: 'inRange',
          filterType: 'date',
          filter: fromDate,
          filterTo: toDate,
        };
      }
    }

    console.log(filterModel);

    this.appliedFilters = filterModel;
    this.updateDisplayedData();
  }

  editstaffLeave(leaves: LeaveRequest) {
    this.router.navigate([
      `/apps-hospital-staff-leave-add/${leaves.staffleaveId}`,
    ]);
  }
}
