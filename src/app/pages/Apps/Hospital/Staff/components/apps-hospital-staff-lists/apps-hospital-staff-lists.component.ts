import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddStaffModalComponent } from './modal/add-staff-modal/add-staff-modal.component';
import { PageTitleComponent } from '../../../../../../layouts/page-title/page-title.component';
import { DomixPaginationComponent } from '../../../../../../componate/domix-pagination/domix-pagination.component';
import { DomixDropdownModule } from '../../../../../../module/domix dropdown/domix-dropdown.module';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../../../../componate/domix-grid-test/domix-grid-test.component';
import { RestApiService } from '../../../../../../Core/service/rest-api.service';
import { DomixTableService } from '../../../../../../componate/domix-grid-test/service/domix-table.service';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
import { DeleteModalComponent } from '../../../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
export interface UserProfile {
  name: string;
  image: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  date: string;
}

@Component({
    selector: 'app-apps-hospital-staff-lists',
    imports: [
        PageTitleComponent,
        CommonModule,
        DomixPaginationComponent,
        FormsModule,
        DomixDropdownModule,
        LucideAngularModule,
    ],
    templateUrl: './apps-hospital-staff-lists.component.html',
    styleUrl: './apps-hospital-staff-lists.component.scss'
})
export class AppsHospitalStaffListsComponent extends DomixGridTestComponent {
  allStaff: UserProfile[] = [];
  hasHeaderCheckbox = false;

  constructor(
    public restApiService: RestApiService,
    public domiex: DomixTableService,
    private modalService: ModalService
  ) {
    super(domiex);
    this.hasHeaderCheckbox = this.columnDefs.some((col) => col.headerCheckbox);
  }

  ngOnInit(): void {
    this.projectData();
  }

  projectData() {
    this.restApiService.getallStaff().subscribe((data: any) => {
      this.allStaff = data;
      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
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
      field: 'staffID',
      headerName: 'ID',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'name',
      headerName: '	Staff Name',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'department',
      headerName: '	Department',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'phone',
      headerName: 'Phone',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'date',
      headerName: 'Joining Date',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      headerName: 'Action',
      sortable: false,
    },
  ];
  deleteModal(index: number) {
    this.modalService.open(DeleteModalComponent, {}, (result) => {
      if (result) {
        this.gridData.splice(index, 1);
        this.displayedData = [...this.gridData];
        this.updateDisplayedData();
      }
    });
  }
  openCreateModal(projectdata: any | null, index: number | null) {
    const data = projectdata;

    this.modalService.open(AddStaffModalComponent, data, (result) => {
      if (result) {
        if (result.isAddOrEdit) {
          if (index !== null && index > -1) {
            this.gridData[index] = {
              ...this.gridData[index],
              ...result.formData,
            };
            this.displayedData = [...this.gridData];
            this.updateDisplayedData();
          }
        } else {
          this.gridData.unshift(result.formData);
          this.displayedData = [...this.gridData];
          this.updateDisplayedData();
        }
      }
    });
  }
}
