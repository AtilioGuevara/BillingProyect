import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../../componate/domix-grid-test/domix-grid-test.component';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { DomixTableService } from '../../../../componate/domix-grid-test/service/domix-table.service';
import { RestApiService } from '../../../../Core/service/rest-api.service';
import { CommonModule } from '@angular/common';
import { DomixPaginationComponent } from '../../../../componate/domix-pagination/domix-pagination.component';
import { FormsModule } from '@angular/forms';
import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';
import { DeleteModalComponent } from '../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
import { LucideAngularModule } from 'lucide-angular';
import { AddProjectModalComponent } from './model/add-project-modal/add-project-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SimplebarAngularModule } from 'simplebar-angular';
export interface Assignee {
  image: string;
  name: string;
}

export interface Project {
  projectImage: string;
  image: string;
  projectName: string;
  clientName: string;
  dueDate: string;
  totalAmount: string;
  assignees: Assignee[];
  progress: string;
  status: string;
}

@Component({
    selector: 'app-apps-projects-list',
    imports: [
        PageTitleComponent,
        CommonModule,
        DomixPaginationComponent,
        FormsModule,
        DomixDropdownModule,
        LucideAngularModule,
        NgSelectModule,
        SimplebarAngularModule
    ],
    templateUrl: './apps-projects-list.component.html',
    styleUrl: './apps-projects-list.component.scss'
})
export class AppsProjectsListComponent extends DomixGridTestComponent {
  allProjectList: Project[] = [];
  hasHeaderCheckbox = false;
  selectedCategory!: string;
  selectedAssignee!: string;
  assignees: Assignee[] = [];
  categories = [
    { label: 'Active', value: 'Active' },
    { label: 'On Hold', value: 'On Hold' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Popular Book', value: 'Popular Book' },
    { label: 'Completed', value: 'Completed' },
  ];


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
    this.restApiService.getProjectListData().subscribe((data: any) => {
      this.allProjectList = data;
      this.gridData = data;
      const uniqueAssigneesMap = new Map<string, Assignee>();

      data.forEach((project: { assignees: Assignee[] }) => {
        project.assignees.forEach((assignee: Assignee) => {
          if (!uniqueAssigneesMap.has(assignee.name)) {
            uniqueAssigneesMap.set(assignee.name, assignee);
          }
        });
      });

      this.assignees = Array.from(uniqueAssigneesMap.values());

      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }
  columnDefs: ColDefs[] = [
    {
      field: 'projectID',
      headerName: 'ID',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'clientName',
      headerName: 'Project and Client Name',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'assignees',
      headerName: 'Assigned To',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'dueDate',
      headerName: '	Due Date',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'totalAmount',
      headerName: 'Total Amount ($)',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'progress',
      headerName: '% Complete',
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
  deleteModal(index: number) {
    this.modalService.open(DeleteModalComponent, {}, (result) => {
      if (result) {
        this.gridData.splice(index, 1);
        this.displayedData = [...this.gridData];
        this.updateDisplayedData();
      }
    });
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  assignChange(){
    if (this.selectedCategory) {
      const filterModel: any = {};
      filterModel.category = {
        type: 'equals',
        filterType: 'text',
        filter: this.selectedCategory,
      };

      this.appliedFilters = filterModel;
      this.updateDisplayedData();
    }
  }

  catgoryChange() {
    if (this.selectedCategory) {
      const filterModel: any = {};
      filterModel.status = {
        type: 'equals',
        filterType: 'text',
        filter: this.selectedCategory,
      };

      this.appliedFilters = filterModel;
      this.updateDisplayedData();
    }
  }

  openCreateModal(projectdata: any | null, index: number | null) {
    const data = projectdata;

    this.modalService.open(AddProjectModalComponent, data, (result) => {
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
