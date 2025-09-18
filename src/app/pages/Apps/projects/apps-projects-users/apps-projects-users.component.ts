import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { ModalService } from '../../../../Core/service/modal/modal.service';

import { ShareProjectModalComponent } from '../share-project-modal/share-project-modal.component';
import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';
import { LucideAngularModule } from 'lucide-angular';
import { DomixChartsComponent } from '../../../../componate/domix-charts/domix-charts.component';
import { CommonModule } from '@angular/common';
import { RestApiService } from '../../../../Core/service/rest-api.service';
import { RouterLink } from '@angular/router';
import { DomixTooltipModule } from '../../../../module/domix tooltip/domix-tooltip.module';
import { DomixGridTestComponent } from '../../../../componate/domix-grid-test/domix-grid-test.component';
import { DomixTableService } from '../../../../componate/domix-grid-test/service/domix-table.service';
import { DomixPaginationComponent } from '../../../../componate/domix-pagination/domix-pagination.component';

export interface AllProjectUser {
  image: string;
  name: string;
  role: string;
  task: number;
  earning: string;
  date: string;
}

@Component({
    selector: 'app-apps-projects-users',
    imports: [
        PageTitleComponent,
        CommonModule,
        DomixTooltipModule,
        LucideAngularModule,
        DomixDropdownModule,
        DomixPaginationComponent,
        RouterLink,
    ],
    templateUrl: './apps-projects-users.component.html',
    styleUrl: './apps-projects-users.component.scss'
})
export class AppsProjectsUsersComponent extends DomixGridTestComponent {
  currentUser = {
    name: 'Ina Payne',
    image: 'assets/images/avatar/user-5.png',
    role: 'Project Manager',
  };

  users = [
    {
      name: 'Ina Payne',
      image: 'assets/images/avatar/user-5.png',
      role: 'Project Manager',
    },
    {
      name: 'Robert Freeman',
      image: 'assets/images/avatar/user-11.png',
      role: 'Project Manager',
    },
    {
      name: 'Michelle Weigle',
      image: 'assets/images/avatar/user-13.png',
      role: 'Project Manager',
    },
    {
      name: 'William Keen',
      image: 'assets/images/avatar/user-14.png',
      role: 'Project Manager',
    },
  ];

  allProjects: AllProjectUser[] = [];

  activeUser: { name: string; image: string; role: string } | null = null;

  constructor(
    private modalService: ModalService,
    public restApiService: RestApiService,
    public domiex: DomixTableService
  ) {
    super(domiex);
  }

  isActive(user: any): boolean {
    return this.activeUser === user;
  }

  selectUser(user: any): void {
    this.activeUser = user;
  }

  openModal() {
    this.modalService.open(ShareProjectModalComponent);
  }
  ngOnInit(): void {
    this.projectData();
  }

  projectData() {
    this.restApiService.getProjectData().subscribe((data: any) => {
      this.allProjects = data;
      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }
}
