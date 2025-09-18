import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';
import { CommonModule } from '@angular/common';

import { LucideAngularModule } from 'lucide-angular';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { ShareProjectModalComponent } from '../share-project-modal/share-project-modal.component';
import { RouterLink } from '@angular/router';
import { DomixTooltipModule } from '../../../../module/domix tooltip/domix-tooltip.module';

@Component({
    selector: 'app-apps-projects-roadmap',
    imports: [
        PageTitleComponent,
        DomixDropdownModule,
        CommonModule,
        LucideAngularModule,
        RouterLink,
        DomixTooltipModule,
    ],
    templateUrl: './apps-projects-roadmap.component.html',
    styleUrls: ['./apps-projects-roadmap.component.scss']
})
export class AppsProjectsRoadmapComponent {
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

  activeUser: { name: string; image: string; role: string } | null = null; // More specific type

  constructor(private modalService: ModalService) {}

  isActive(user: any): boolean {
    return this.activeUser === user;
  }

  selectUser(user: any): void {
    this.activeUser = user;
  }

  openModal() {
    this.modalService.open(ShareProjectModalComponent);
  }
}
