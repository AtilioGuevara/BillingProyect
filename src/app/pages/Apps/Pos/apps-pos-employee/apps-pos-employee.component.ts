import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { ColDefs, DomixGridTestComponent } from '../../../../componate/domix-grid-test/domix-grid-test.component';
import { RestApiService } from '../../../../Core/service/rest-api.service';
import { DomixTableService } from '../../../../componate/domix-grid-test/service/domix-table.service';
import { DomixPaginationComponent } from "../../../../componate/domix-pagination/domix-pagination.component";
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { DeleteModalComponent } from '../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
import { AddEmployeeModalComponent } from './model/add-employee-modal/add-employee-modal.component';
export interface Employee {
  employeeID: string;
  name: string;
  email: string;
  position: string;
  department: string;
  contact: string;
  joinDate: string;
  status: string;
  avatar: string;
}

@Component({
  selector: 'app-apps-pos-employee',
  imports: [PageTitleComponent, DomixPaginationComponent, CommonModule, LucideAngularModule, FormsModule, NgSelectModule],
  templateUrl: './apps-pos-employee.component.html',
  styleUrl: './apps-pos-employee.component.scss'
})
export class AppsPosEmployeeComponent extends DomixGridTestComponent {
  allEmployee: Employee[] = [];
  hasHeaderCheckbox = false;
  sortStatus = false;

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

  departmentsFilterSelect = [
    { label: 'All Departments', value: 'All Departments' },
    { label: 'Sales', value: 'Sales' },
    { label: 'Management', value: 'Management' },
    { label: 'IT', value: 'IT' },
    { label: 'Human Resources', value: 'Human Resources' },
  ];

  statusFilterSelect = [
    { label: 'All Status', value: 'All Status' },
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
  ];

  projectData() {
    this.restApiService.getPosEmployeeData().subscribe((data: any) => {
      this.allEmployee = data;
      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }


  openCreateModal(contactdata: any | null, index: number | null) {
    const data = contactdata;

    this.modalService.open(AddEmployeeModalComponent, data, (result) => {
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
  deleteModal(index: number) {
    this.modalService.open(DeleteModalComponent, {}, (result) => {
      if (result) {
        this.gridData.splice(index, 1);
        this.displayedData = [...this.gridData];
        this.updateDisplayedData();
      }
    });
  }

  columnDefs: ColDefs[] = [
    {
      field: 'employeeID',
      headerName: 'Employee ID',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'name',
      headerName: 'Name',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'position',
      headerName: 'Position',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'department',
      headerName: 'Department',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'contact',
      headerName: 'Contact',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'joinDate',
      headerName: 'Join Date',
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
      headerName: 'Action',
      sortable: false,
    },
  ];

}
