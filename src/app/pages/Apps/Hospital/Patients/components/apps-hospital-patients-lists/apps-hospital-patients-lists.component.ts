import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

import { FormsModule } from '@angular/forms';
import { PatientOverviewModalComponent } from './patient-overview-modal/patient-overview-modal.component';
import { PageTitleComponent } from '../../../../../../layouts/page-title/page-title.component';
import { DomixDropdownModule } from '../../../../../../module/domix dropdown/domix-dropdown.module';
import { DomixPaginationComponent } from '../../../../../../componate/domix-pagination/domix-pagination.component';
import { RestApiService } from '../../../../../../Core/service/rest-api.service';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
import { Store } from '@ngrx/store';
import { Patient } from '../apps-hospital-patients-create/apps-hospital-patients-create.component';
import { loadPatients } from '../../store/actions/patients.actions';
import { selectPatients } from '../../store/selectors/patients.selectors';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

export interface PatientList {
  date: string;
  doctorName: string;
  email: string;
  gender: string;
  image: string;
  insurance: string;
  location: string;
  name: string;
  phoneNumber: string;
  treatmentType: string;
}

@Component({
    selector: 'app-apps-hospital-patients-lists',
    imports: [
        PageTitleComponent,
        CommonModule,
        LucideAngularModule,
        DomixDropdownModule,
        DomixPaginationComponent,
        FormsModule,
        CommonModule,
        RouterLink,
    ],
    templateUrl: './apps-hospital-patients-lists.component.html',
    styleUrls: ['./apps-hospital-patients-lists.component.scss']
})
export class AppsHospitalPatientsListsComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 16;
  totalPages: number = 0;
  showingStart: number = 1;
  showingEnd: number = 0;

  allPatientList: Patient[] = [];
  filteredPatientList: Patient[] = [];
  displayedPatientList: Patient[] = [];
  searchQuery: string = '';

  // NgRx
  store = inject(Store);
  patients: Patient[] = [];
  patients$!: Observable<Patient[]>;

  constructor(
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPatientList();
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.updateDisplayedPatients();
  }

  getPatientList() {
    this.store.dispatch(loadPatients());

    this.patients$ = this.store.select(selectPatients);

    this.patients$.subscribe((patients) => {
      this.allPatientList = patients;
      this.filteredPatientList = [...this.allPatientList];
      this.totalPages = Math.ceil(
        this.filteredPatientList.length / this.itemsPerPage
      );
      this.updateDisplayedPatients();
    });
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.filteredPatientList = this.allPatientList.filter((patient) =>
        patient.firstName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredPatientList = [...this.allPatientList];
    }
    this.totalPages = Math.ceil(
      this.filteredPatientList.length / this.itemsPerPage
    );
    this.currentPage = 1;
    this.updateDisplayedPatients();
  }

  updateDisplayedPatients() {
    this.showingStart = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.showingEnd = Math.min(
      this.currentPage * this.itemsPerPage,
      this.filteredPatientList.length
    );
    this.displayedPatientList = this.filteredPatientList.slice(
      this.showingStart - 1,
      this.showingEnd
    );
  }

  openPatientOverViewModal(patientData: Patient) {
    this.modalService.open(
      PatientOverviewModalComponent,
      patientData,
    );
  }
  editPatient(patient: Patient) {
    this.router.navigate([
      `/apps-hospital-patients-create/${patient.patientID}`,
    ]);
  }

  delProduct(index: number) {
    const clonedData = [...this.filteredPatientList];
    clonedData.splice(index, 1);
    this.filteredPatientList = [...clonedData];
    this.totalPages = Math.ceil(
      this.filteredPatientList.length / this.itemsPerPage
    );
    this.updateDisplayedPatients();
  }
}
