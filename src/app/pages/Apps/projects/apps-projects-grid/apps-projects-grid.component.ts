import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { FooterComponent } from '../../../../layouts/footer/footer.component';
import { SidebarComponent } from '../../../../layouts/sidebar/sidebar.component';
import { NavbarComponent } from '../../../../layouts/navbar/navbar.component';

import { LucideAngularModule } from 'lucide-angular';
import { RestApiService } from '../../../../Core/service/rest-api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';
import { AddProjectModalComponent } from './model/add-project-modal/add-project-modal.component';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { DeleteModalComponent } from '../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
import { DomixPaginationComponent } from '../../../../componate/domix-pagination/domix-pagination.component';
import { DomixGridTestComponent } from '../../../../componate/domix-grid-test/domix-grid-test.component';
import { DomixTableService } from '../../../../componate/domix-grid-test/service/domix-table.service';
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

export enum Status {
  AllProjects,
  Active,
  Pending,
  OnHold,
  Completed,
}

@Component({
    selector: 'app-apps-projects-grid',
    imports: [
        PageTitleComponent,
        FooterComponent,
        SidebarComponent,
        NavbarComponent,
        LucideAngularModule,
        CommonModule,
        DomixDropdownModule,
        DomixPaginationComponent,
        FormsModule,
    ],
    templateUrl: './apps-projects-grid.component.html',
    styleUrl: './apps-projects-grid.component.scss'
})
export class AppsProjectsGridComponent extends DomixGridTestComponent {
  allProjects: Project[] = [];
  filteredData: any[] = [];
  status = Status;
  selectedStatus: Status = Status.AllProjects;
  searchTerm: string = '';

  constructor(
    public restApiService: RestApiService,
    private modalService: ModalService,
    public domiex: DomixTableService,
  ) {
    super(domiex); this.pageSize = 12
  }
  ngOnInit(): void {
    this.projectData();
  }

  projectData() {
    this.restApiService.getProjectGridData().subscribe((data: any) => {
      this.allProjects = data;

      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();

      this.setSelectedCatogry(Status.AllProjects);
    });
  }

  setSelectedCatogry(selectedStatus: Status) {
    this.selectedStatus = selectedStatus;
    this.getFilterData();
  }

  getFilterData() {

    const filterData = this.allProjects.filter((project) => {
      if (this.selectedStatus === this.status.AllProjects) {
        return true;
      } else if (this.selectedStatus === this.status.Active) {
        return project.status === 'Active';
      } else if (this.selectedStatus === this.status.Pending) {
        return project.status === 'Pending';
      } else if (this.selectedStatus === this.status.OnHold) {
        return project.status === 'On Hold';
      } else if (this.selectedStatus === this.status.Completed) {
        return project.status === 'Completed';
      }
      return false;
    });
    this.filteredData = filterData;

    this.gridData = filterData;
    this.displayedData = [...this.gridData];
    this.updateDisplayedData();
  }

  openaddProjectModal(projectData: Project | null, index: number | null) {
    const data = projectData ? projectData : null;
    this.modalService.open(AddProjectModalComponent, data, (result) => {
      if (result.isAddOrEdit) {
        if (index !== null && index > -1) {
          this.allProjects[index] = {
            ...this.allProjects[index],
            ...result.formData,
          };
          this.setSelectedCatogry(Status.AllProjects);
        }
      } else {
        this.allProjects.unshift(result.formData);
        this.setSelectedCatogry(Status.AllProjects);
        // this.allProjects[index] = { ...this.allProjects[index], ...result };
      }
    });
  }

  opendeleteModal(index: number) {
    this.modalService.open(DeleteModalComponent, {}, (result) => {
      if (result) {
        this.allProjects.splice(index, 1),
          this.setSelectedCatogry(Status.AllProjects);
      }
    });
  }
}
