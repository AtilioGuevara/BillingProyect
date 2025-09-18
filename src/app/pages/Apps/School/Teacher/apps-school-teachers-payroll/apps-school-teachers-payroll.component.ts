import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../../layouts/page-title/page-title.component';
import { DeleteModalComponent } from '../../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../../../componate/domix-grid-test/domix-grid-test.component';
import { DomixTableService } from '../../../../../componate/domix-grid-test/service/domix-table.service';
import { ModalService } from '../../../../../Core/service/modal/modal.service';
import { RestApiService } from '../../../../../Core/service/rest-api.service';
import { LucideAngularModule } from 'lucide-angular';
import { DomixDropdownModule } from '../../../../../module/domix dropdown/domix-dropdown.module';
import { FormsModule } from '@angular/forms';
import { DomixPaginationComponent } from '../../../../../componate/domix-pagination/domix-pagination.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
export interface Teacher {
  teacherName: string;
  image?: string; 
  email: string;
  gross: string;
  taxes: string;
  netSalary: string;
  performance: string;
  status: string;
}

@Component({
    selector: 'app-apps-school-teachers-payroll',
    imports: [
        PageTitleComponent,
        CommonModule,
        DomixPaginationComponent,
        FormsModule,
        DomixDropdownModule,
        LucideAngularModule,
        RouterLink,
    ],
    templateUrl: './apps-school-teachers-payroll.component.html',
    styleUrl: './apps-school-teachers-payroll.component.scss'
})
export class AppsSchoolTeachersPayrollComponent extends DomixGridTestComponent {
  allTeachersList: Teacher[] = [];
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

  generateAvatarText(name: string): string {
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return nameParts[0][0] + nameParts[1][0];
    }
    return name[0];
  }

  projectData() {
    this.restApiService.getTeacherpayrollData().subscribe((data: Teacher[]) => {
      this.allTeachersList = data;
      this.gridData = data.map((student) => ({
        ...student,
        avatarText: this.generateAvatarText(student.teacherName),
      }));
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }

  columnDefs: ColDefs[] = [
    {
      field: 'teachername',
      headerName: 'Teacher Name',
      sortable: true,
      sortDiraction: 'desc',
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'phone',
      headerName: '	Phone',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'taxes',
      headerName: 'Taxes',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'salary',
      headerName: 'Salary',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'performance',
      headerName: 'Performance',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: true,
      sortDiraction: 'asc',
    },
  ];
  deleteModal(index: number) {
    this.modalService.open(DeleteModalComponent, {}, (result) => {
      if (result) {
        this.displayedData.splice(index, 1);
      }
    });
  }
}
