import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../../layouts/page-title/page-title.component';
import { DomixPaginationComponent } from '../../../../../componate/domix-pagination/domix-pagination.component';
import { LucideAngularModule } from 'lucide-angular';
import { DomixDropdownModule } from '../../../../../module/domix dropdown/domix-dropdown.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DeleteModalComponent } from '../../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
import { ModalService } from '../../../../../Core/service/modal/modal.service';
import { DomixTableService } from '../../../../../componate/domix-grid-test/service/domix-table.service';
import { RestApiService } from '../../../../../Core/service/rest-api.service';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../../../componate/domix-grid-test/domix-grid-test.component';
import { RouterLink } from '@angular/router';
interface Student {
  studentName: string;
  image?: string;
  gender: string;
  rollNo: string;
  class: string;
  email: string;
  phone: string;
  birthDate: string;
  date: string;
  avatarText?: string;
}

@Component({
    selector: 'app-apps-school-students-list',
    imports: [
        PageTitleComponent,
        CommonModule,
        DomixPaginationComponent,
        FormsModule,
        DomixDropdownModule,
        LucideAngularModule,
        RouterLink,
    ],
    templateUrl: './apps-school-students-list.component.html',
    styleUrl: './apps-school-students-list.component.scss'
})
export class AppsSchoolStudentsListComponent extends DomixGridTestComponent {
  allStudentList: Student[] = [];
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
    this.restApiService.getSchoolListData().subscribe((data: Student[]) => {
      this.allStudentList = data;
      this.gridData = data.map((student) => ({
        ...student,
        avatarText: this.generateAvatarText(student.studentName),
      }));
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }

  columnDefs: ColDefs[] = [
    {
      field: 'studentID',
      headerName: 'ID',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'studentName',
      headerName: 'Student Name',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'gender',
      headerName: 'Gender',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'rollNo',
      headerName: '	Roll No',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'class',
      headerName: 'Class',
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
      headerName: '	Phone',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'birthDate',
      headerName: 'Birth Of Date',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'date',
      headerName: '	Joining Date',
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
        this.displayedData.splice(index, 1);
      }
    });
  }
}
