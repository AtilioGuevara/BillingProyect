import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';
import { FormsModule } from '@angular/forms';
import { DomixPaginationComponent } from '../../../../componate/domix-pagination/domix-pagination.component';
import { CommonModule } from '@angular/common';
import { RestApiService } from '../../../../Core/service/rest-api.service';
import { DomixTableService } from '../../../../componate/domix-grid-test/service/domix-table.service';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../../componate/domix-grid-test/domix-grid-test.component';
import { DeleteModalComponent } from '../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
import { ParentsCreateModalComponent } from './model/parents-create-modal/parents-create-modal.component';
export interface ParentProfile {
  parentsName: string;
  studentName: string;
  image: string;
  relation: string;
  occupation: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
}

@Component({
    selector: 'app-apps-school-parents',
    imports: [
        PageTitleComponent,
        CommonModule,
        DomixPaginationComponent,
        FormsModule,
        DomixDropdownModule,
        LucideAngularModule,
    ],
    templateUrl: './apps-school-parents.component.html',
    styleUrl: './apps-school-parents.component.scss'
})
export class AppsSchoolParentsComponent extends DomixGridTestComponent {
  allParentsList: ParentProfile[] = [];
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
    this.restApiService
      .getSchoolParentsListData()
      .subscribe((data: ParentProfile[]) => {
        this.allParentsList = data;
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
      field: 'parentsname',
      headerName: 'Parents Name',
      sortable: true,
      sortDiraction: 'desc',
    },
    {
      field: 'studentName',
      headerName: 'Student Name',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'relation',
      headerName: '	Relation',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'occupation',
      headerName: 'Occupation',
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
      field: 'address',
      headerName: 'Address',
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
  openCreateModal(projectdata: any | null, index: number | null) {
    const data = projectdata;

    this.modalService.open(ParentsCreateModalComponent, data, (result) => {
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
