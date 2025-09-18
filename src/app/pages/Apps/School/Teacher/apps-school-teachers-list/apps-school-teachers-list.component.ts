import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { DomixDropdownModule } from '../../../../../module/domix dropdown/domix-dropdown.module';
import { FormsModule } from '@angular/forms';
import { DomixPaginationComponent } from '../../../../../componate/domix-pagination/domix-pagination.component';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../../../../../layouts/page-title/page-title.component';
import { DeleteModalComponent } from '../../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../../../componate/domix-grid-test/domix-grid-test.component';
import { ModalService } from '../../../../../Core/service/modal/modal.service';
import { DomixTableService } from '../../../../../componate/domix-grid-test/service/domix-table.service';
import { RestApiService } from '../../../../../Core/service/rest-api.service';
import { AddTeacherModalComponent } from './model/add-teacher-modal/add-teacher-modal.component';
import { RouterLink } from '@angular/router';
export interface Teacher {
  teacherName: string;
  image?: string; // Optional as some teachers may not have an image
  email: string;
  phone: string;
  salary: string;
  experience: string;
  title: string;
  date: string;
  lastSchool: string;
}

@Component({
    selector: 'app-apps-school-teachers-list',
    imports: [
        PageTitleComponent,
        CommonModule,
        DomixPaginationComponent,
        FormsModule,
        DomixDropdownModule,
        LucideAngularModule,
        RouterLink,
    ],
    templateUrl: './apps-school-teachers-list.component.html',
    styleUrl: './apps-school-teachers-list.component.scss'
})
export class AppsSchoolTeachersListComponent extends DomixGridTestComponent {
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
    this.restApiService.getTeacherListData().subscribe((data: Teacher[]) => {
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
      field: 'teacherID',
      headerName: 'ID',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'teachername',
      headerName: 'Teacher Name',
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
      field: 'salary',
      headerName: 'Salary',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'experience',
      headerName: 'Experience',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'title',
      headerName: 'Title',
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

    this.modalService.open(AddTeacherModalComponent, data, (result) => {
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
