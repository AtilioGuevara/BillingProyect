import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';

import { LucideAngularModule } from 'lucide-angular';
import { RestApiService } from '../../../../Core/service/rest-api.service';
import { CommonModule } from '@angular/common';
import { SimplebarAngularModule } from 'simplebar-angular';
import { FormsModule } from '@angular/forms';

export interface Project {
  id: number;
  image: string;
  name: string;
  date: string;
  time: string;
  email: string;
  phoneNumber: string;
  status: string;
}

@Component({
    selector: 'app-apps-crm-lead',
    imports: [
        PageTitleComponent,
        LucideAngularModule,
        CommonModule,
        FormsModule,
        SimplebarAngularModule,
    ],
    templateUrl: './apps-crm-lead.component.html',
    styleUrls: ['./apps-crm-lead.component.scss']
})
export class AppsCrmLeadComponent {
  newLead: Project[] = [];
  hotLead: Project[] = [];
  pendingLead: Project[] = [];
  lostLead: Project[] = [];
  options = { autoHide: true };
  searchTerm: string = '';

  constructor(public restApiService: RestApiService) {}

  ngOnInit(): void {
    this.projectData();
  }

  projectData() {
    this.restApiService.getCrmLeadData().subscribe((data: any) => {
      this.newLead = (data as Project[]).filter(
        (lead) => lead.status === 'New'
      );
      this.hotLead = (data as Project[]).filter(
        (lead) => lead.status === 'Hot'
      );
      this.pendingLead = (data as Project[]).filter(
        (lead) => lead.status === 'Pending'
      );
      this.lostLead = (data as Project[]).filter(
        (lead) => lead.status === 'Lost'
      );
    });
  }

  get filteredNewLead(): Project[] {
    return this.newLead.filter((lead) => this.filterLead(lead));
  }

  get filteredHotLead(): Project[] {
    return this.hotLead.filter((lead) => this.filterLead(lead));
  }

  get filteredPendingLead(): Project[] {
    return this.pendingLead.filter((lead) => this.filterLead(lead));
  }

  get filteredLostLead(): Project[] {
    return this.lostLead.filter((lead) => this.filterLead(lead));
  }

  // Filter function that matches against the search term
  filterLead(lead: Project): boolean {
    if (!this.searchTerm) return true;
    const term = this.searchTerm.toLowerCase();
    return (
      lead.name.toLowerCase().includes(term) ||
      lead.name?.toLowerCase().includes(term) ||
      lead.name?.toLowerCase().includes(term)
    ); // add other lead fields as needed
  }
}
