import { Component } from '@angular/core';
import { RestApiService } from '../../../../../Core/service/rest-api.service';
import { ColDefs, DomixGridTestComponent } from '../../../../../componate/domix-grid-test/domix-grid-test.component';
import { DomixTableService } from '../../../../../componate/domix-grid-test/service/domix-table.service';
import { CommonModule } from '@angular/common';
import { DomixPaginationComponent } from '../../../../../componate/domix-pagination/domix-pagination.component';
import { PageTitleComponent } from '../../../../../layouts/page-title/page-title.component';
import { ModalService } from '../../../../../Core/service/modal/modal.service';
import { EmpSalEditComponent } from './emp-sal-edit/emp-sal-edit.component';
import { DeleteModalComponent } from '../../../../../componate/domix-delet-model/delete-modal/delete-modal.component';

export interface PayrollEmpSalary {
  employeeName: string,
  email: string,
  phoneNumber: string,
  department: string,
  monthlySalary: string,
  status: string
}

@Component({
    selector: 'app-apps-hospital-payroll-employee-salary',
    imports: [CommonModule, DomixPaginationComponent, PageTitleComponent],
    templateUrl: './apps-hospital-payroll-employee-salary.component.html',
    styleUrl: './apps-hospital-payroll-employee-salary.component.scss'
})
export class AppsHospitalPayrollEmployeeSalaryComponent extends DomixGridTestComponent {

  constructor(public apiSer: RestApiService, private tService: DomixTableService, private modalService: ModalService) {
    super(tService)

    this.getEmpSalData()
  }

  defs: ColDefs[] = [
    {
      headerName: 'Employee Name',
      sortable: true,
      field: 'employeeName',
      sortDiraction: 'asc'
    },
    {
      headerName: 'Email',
      sortable: true,
      field: 'email',
      sortDiraction: 'asc'
    },
    {
      headerName: 'Phone Number',
      sortable: true,
      field: 'phoneNumber',
      sortDiraction: 'asc'
    },
    {
      headerName: 'Department',
      sortable: true,
      field: 'department',
      sortDiraction: 'asc'
    },
    {
      headerName: 'Monthly Salary',
      sortable: true,
      field: 'monthlySalary',
      sortDiraction: 'asc'
    },
    {
      headerName: 'Status',
      sortable: true,
      field: 'status',
      sortDiraction: 'asc'
    },
    {
      headerName: 'Action',
      sortable: false,
    },
  ]

  getEmpSalData() {
    this.apiSer.getEmpSalData().subscribe((data: any) => {
      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData()
    })
  }

  edit(data: PayrollEmpSalary, index: number) {
    this.modalService.open(EmpSalEditComponent, data, (data) => {
      if (data && index !==null && index > -1) {
        this.gridData[index] = {
          ...this.gridData[index],
          ...data,
        };
        this.displayedData = [...this.gridData];
        this.updateDisplayedData();
      }
    })
  }
  del(index: number) {
    this.modalService.open(DeleteModalComponent, {}, (res => {
      if (res) {
        this.gridData.splice(index, 1);
        this.displayedData = [...this.gridData];
        this.updateDisplayedData();
      }
    }))
  }
}
