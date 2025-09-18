import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { Catogary, CatogaryStatus, tickets } from '../../../Data/tickets';
import { DomixDropdownModule } from '../../../module/domix dropdown/domix-dropdown.module';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LucideAngularModule } from 'lucide-angular';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ModalService } from '../../../Core/service/modal/modal.service';
import { NewTicketModalComponent } from './new-ticket-modal/new-ticket-modal.component';

@Component({
    selector: 'app-pages-help-center',
    imports: [
        PageTitleComponent,
        CommonModule,
        DomixDropdownModule,
        SimplebarAngularModule,
        LucideAngularModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './pages-help-center.component.html',
    styleUrl: './pages-help-center.component.scss'
})
export class PagesHelpCenterComponent {
  options = { autoHide: true };
  Catgary = Catogary;
  selectedCatogary: Catogary = Catogary.GettingStarted;
  helpCenterData = tickets;
  filteredData: any[] = [];
  searchTerm: string = '';
  searchControl: FormControl = new FormControl(''); // Define the FormControl for search
  filteredTickets: any[] = [];
  catogaryStatus = CatogaryStatus;
  setSelectedFiltered!: CatogaryStatus;

  constructor(private modalService: ModalService) {}

  openNewTicketsModal() {
    this.modalService.open(NewTicketModalComponent);
  }

  openContactModal() {
    this.modalService.open(ContactUsComponent);
  }

  ngOnInit() {
    this.getFilterData();
    this.searchControl.valueChanges.subscribe((data) => {
      if (data) {
        this.filterTickets(data);
      }
    });
  }

  setSelectedCatogry(selectedCatogary: Catogary) {
    this.selectedCatogary = selectedCatogary;
    this.getFilterData();
  }

  getFilterData() {
    this.filteredData = [];
    let data: any[] = [];
    if (this.selectedCatogary === this.Catgary.GettingStarted) {
      data = this.helpCenterData
        .filter((x) => x.category === 'Getting Started')
        .map((y) => y.tickets);
    } else if (this.selectedCatogary === this.Catgary.AccountwithCard) {
      data = this.helpCenterData
        .filter((x) => x.category === 'Account with Card')
        .map((y) => y.tickets);
    } else if (this.selectedCatogary === this.Catgary.CustomizeLayouts) {
      data = this.helpCenterData
        .filter((x) => x.category === 'Licenses Policy')
        .map((y) => y.tickets);
    } else if (this.selectedCatogary === this.Catgary.CustomizeTemplates) {
      data = this.helpCenterData
        .filter((x) => x.category === 'Customize Templates')
        .map((y) => y.tickets);
    } else if (this.selectedCatogary === this.Catgary.LicensesPolicy) {
      data = this.helpCenterData
        .filter((x) => x.category === 'Customize Layouts')
        .map((y) => y.tickets);
    }
    this.filteredData = data[0];
    this.setSelectedCatogryStatus(this.catogaryStatus.AllTicket);
  }

  setSelectedCatogryStatus(selectedCatogary: CatogaryStatus) {
    this.setSelectedFiltered = selectedCatogary;
    this.filteredTickets = [];
    this.setFilteredData();
  }

  setFilteredData() {
    let data = [];
    if (this.setSelectedFiltered === this.catogaryStatus.AllTicket) {
      data = this.filteredData;
    } else if (this.setSelectedFiltered === this.catogaryStatus.Active) {
      data = this.filteredData.filter((x: any) => x.status === 'Active');
    } else if (this.setSelectedFiltered === this.catogaryStatus.Closed) {
      data = this.filteredData.filter((x: any) => x.status === 'Closed');
    } else if (this.setSelectedFiltered === this.catogaryStatus.Deleted) {
      data = this.filteredData.filter((x: any) => x.status === 'Deleted');
    }

    this.filteredTickets = data;
  }

  filterTickets(serchStr: string) {
    const term = serchStr.toLowerCase();

    this.filteredTickets = this.filteredData.filter(
      (ticket: any) =>
        ticket.title.toLowerCase().includes(term) ||
        ticket.description.toLowerCase().includes(term)
    );
  }
}
