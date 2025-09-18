import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../../../../../../layouts/page-title/page-title.component';
import { DomixDropdownModule } from '../../../../../../module/domix dropdown/domix-dropdown.module';
import { DomixPaginationComponent } from '../../../../../../componate/domix-pagination/domix-pagination.component';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../../../../componate/domix-grid-test/domix-grid-test.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RestApiService } from '../../../../../../Core/service/rest-api.service';
import { DomixTableService } from '../../../../../../componate/domix-grid-test/service/domix-table.service';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
import { Router, RouterLink } from '@angular/router';
import { loadAppointmentBooks } from '../../store/actions/appointments-book.actions';
import { selectAppointmentBooks } from '../../store/selectors/appointments-book.selectors';
import { DeleteModalComponent } from '../../../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
import { OverviewModalComponent } from './modal/overview-modal/overview-modal.component';
import { CallModalComponent } from './modal/call-modal/call-modal.component';
import { LucideAngularModule } from 'lucide-angular';
export interface Appointment {
  image: string;
  patientName: string;
  treatment: string;
  date: string;
  email?: string; // Optional if you want to allow missing values
  phoneNumber?: string; // Optional if not always required
  startTime?: string; // Optional if you want to separate the time
  endTime?: string;
  doctorName?: string;
  appointmentsId?: string;
  status?: string;
}

@Component({
    selector: 'app-apps-hospital-appointments-lists',
    imports: [
        PageTitleComponent,
        CommonModule,
        DomixDropdownModule,
        DomixPaginationComponent,
        RouterLink,
        LucideAngularModule,
    ],
    templateUrl: './apps-hospital-appointments-lists.component.html',
    styleUrl: './apps-hospital-appointments-lists.component.scss'
})
export class AppsHospitalAppointmentsListsComponent extends DomixGridTestComponent {
  allAppointment: Appointment[] = [];
  todayAppointments: Appointment[] = [
    {
      image: 'assets/images/avatar/user-14.png',
      patientName: 'Laura Anderson',
      treatment: 'Heart check-up',
      date: '24, Tue',
      startTime: '11:20AM - 12:30PM',
    },
    {
      image: 'assets/images/avatar/user-15.png',
      patientName: 'Emily Johnson',
      treatment: 'Kidney function test',
      date: '24, Tue',
      startTime: '12:35AM - 01:40PM',
    },
    {
      image: 'assets/images/avatar/user-17.png',
      patientName: 'Sarah White',
      treatment: 'Eye examination',
      date: '24, Tue',
      startTime: '01:50AM - 02:20PM',
    },
    {
      image: 'assets/images/avatar/user-18.png',
      patientName: 'Michael Brown',
      treatment: 'Diabetes check-up',
      date: '24, Tue',
      startTime: '02:30PM - 03:00PM',
    },
    {
      image: 'assets/images/avatar/user-19.png',
      patientName: 'David Wilson',
      treatment: 'Skin condition evaluation',
      date: '24, Tue',
      startTime: '03:10PM - 03:40PM',
    },
    {
      image: 'assets/images/avatar/user-20.png',
      patientName: 'Jessica Lee',
      treatment: 'Annual physical exam',
      date: '24, Tue',
      startTime: '03:50PM - 04:20PM',
    },
    {
      image: 'assets/images/avatar/user-21.png',
      patientName: 'Paul Martinez',
      treatment: 'Orthopedic consultation',
      date: '24, Tue',
      startTime: '04:30PM - 05:00PM',
    },
  ];
  hasHeaderCheckbox = false;
  showAll = false;

  toggleShowAll() {
    this.showAll = !this.showAll;
  }

  store = inject(Store);
  appointment: Appointment[] = [];
  appointment$!: Observable<Appointment[]>;

  constructor(
    public restApiService: RestApiService,
    public domiex: DomixTableService,
    private modalService: ModalService,
    private router: Router
  ) {
    super(domiex);
    this.hasHeaderCheckbox = this.columnDefs.some((col) => col.headerCheckbox);
  }

  ngOnInit(): void {
    this.store.dispatch(loadAppointmentBooks());

    this.appointment$ = this.store.select(selectAppointmentBooks);

    this.appointment$.subscribe((products) => {
      this.gridData = products;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }

  generateAvatarText(name: string): string {
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return nameParts[0][0] + nameParts[1][0];
    }
    return name[0];
  }

  columnDefs: ColDefs[] = [
    {
      field: 'patientName',
      headerName: 'Patient Name',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'date',
      headerName: 'Date',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'startTime,endTime',
      headerName: 'Time',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'treatment',
      headerName: 'Treatment',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'doctorName',
      headerName: 'Doctor',
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

  editappointments(appointmentBook: Appointment) {
    this.router.navigate([
      `/apps-hospital-appointments-book/${appointmentBook.appointmentsId}`,
    ]);
  }
  deleteModal(index: number) {
    this.modalService.open(DeleteModalComponent, {}, (result) => {
      if (result) {
        this.displayedData.splice(index, 1);
      }
    });
  }

  openAppointmentsOverViewModal(appointmentBook: Appointment) {
    this.modalService.open(
      OverviewModalComponent,
      appointmentBook,
      (result) => {
        if (result) {
          this.callModal();
        }
      }
    );
  }

  callModal() {
    this.modalService.open(CallModalComponent, {}, (result) => {});
  }
}
