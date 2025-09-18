import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../../../../../layouts/page-title/page-title.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  addAppointmentBook,
  loadAppointmentBooks,
  updateAppointmentBook,
} from '../../store/actions/appointments-book.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { selectAppointmentBooks } from '../../store/selectors/appointments-book.selectors';
import { FlatpickrModule } from '../../../../../../module/flatpickr/flatpickr.module';
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
    selector: 'app-apps-hospital-appointments-book',
    imports: [
        PageTitleComponent,
        ReactiveFormsModule,
        CommonModule,
        NgSelectModule,
        FlatpickrModule,
    ],
    templateUrl: './apps-hospital-appointments-book.component.html',
    styleUrl: './apps-hospital-appointments-book.component.scss'
})
export class AppsHospitalAppointmentsBookComponent {
  formGroup!: FormGroup;
  abookId!: string;
  // NgRx
  store = inject(Store);
  patients: Appointment[] = [];
  patients$!: Observable<Appointment[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      patientName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      status: ['New'],
      endTime: ['', Validators.required],
      doctorName: ['', Validators.required],
      treatment: ['', Validators.required],
      appointmentsId: [this.generateCustomID()],
    });

    this.abookId = this.activatedRoute.snapshot.params['appointmentsId'];
    this.store.dispatch(loadAppointmentBooks());
    this.patients$ = this.store.select(selectAppointmentBooks);
    this.patients$.subscribe((data) => {
      const editedData = data.find(
        (product) => product.appointmentsId === this.abookId
      );
      if (editedData) {
        this.formGroup.patchValue(editedData);
      }
    });
  }

  doctorNameOptions = [
    { label: 'Dr. Michael Johnson', value: 'Dr. Michael Johnson' },
    { label: 'Dr. Sarah Evans', value: 'Dr. Sarah Evans' },
    { label: 'Dr. Emily Carter', value: 'Dr. Emily Carter' },
    { label: 'Dr. Robert Harris', value: 'Dr. Robert Harris' },
  ];

  onSubmit() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
    }
  }

  onReset() {
    this.formGroup.reset();
  }

  generateCustomID(): string {
    const prefix = 'PES-';
    const randomPart = Math.random().toString(36).substr(2, 9);
    return `${prefix}${randomPart.toUpperCase()}`;
  }
  save() {
    this.formGroup.patchValue({ status: 'New' });

    this.store.dispatch(
      addAppointmentBook({ AppointmentBook: this.formGroup.value })
    );

    this.router.navigate([`/apps-hospital-appointments-lists/`]);
  }

  addOrEdit() {
    if (!this.formGroup.valid) {
      return;
    }
    if (this.abookId) {
      this.edit();
    } else {
      this.save();
    }
  }

  edit() {
    this.store.dispatch(
      updateAppointmentBook({ AppointmentBook: this.formGroup.getRawValue() })
    );
    this.router.navigate([`/apps-hospital-appointments-lists/`]);
  }
}
