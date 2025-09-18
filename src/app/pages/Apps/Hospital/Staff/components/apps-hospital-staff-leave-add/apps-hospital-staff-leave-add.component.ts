import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../../../../../layouts/page-title/page-title.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from '../../../../../../module/flatpickr/flatpickr.module';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgSelectModule } from '@ng-select/ng-select';
import { addPatient } from '../../../Patients/store/actions/patients.actions';
import {
  addStaffleave,
  loadStaffleaves,
  updateStaffleave,
} from '../../store/actions/staff-leaves.actions';
import { Observable } from 'rxjs';
import { selectStaffleaves } from '../../store/selectors/staff-leaves.selectors';
export interface LeaveRequest {
  leaveType: string;
  contactNumber: string;
  emergencyNumber?: string; // Optional field
  startDate: string;
  endDate: string;
  totalDays: string;
  reason: string;
  approvedBy: string;
  dateRequested: string;
  dateApproved?: string; // Optional field
  status: string;
  staffleaveId: string;
}
export enum LeaveType {}

@Component({
    selector: 'app-apps-hospital-staff-leave-add',
    imports: [
        PageTitleComponent,
        ReactiveFormsModule,
        CommonModule,
        FlatpickrModule,
        NgSelectModule,
    ],
    templateUrl: './apps-hospital-staff-leave-add.component.html',
    styleUrl: './apps-hospital-staff-leave-add.component.scss'
})
export class AppsHospitalStaffLeaveAddComponent {
  formGroup!: FormGroup;
  sId!: string;
  leaveMenu = LeaveType;
  leaveCounts: { [key: string]: number } = {
    casual: 0,
    Sick: 0,
    Maternity: 0,
    emergency: 0,
    Vacation: 0,
  };
  // NgRx
  store = inject(Store);
  patients: LeaveRequest[] = [];
  patients$!: Observable<LeaveRequest[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      leaveType: ['', Validators.required],
      contactNumber: ['', Validators.required],
      emergencyNumber: [''],
      startDate: ['', Validators.required],
      endDate: ['', [Validators.required]],
      totalDays: ['', Validators.required],
      reason: ['', Validators.required],
      approvedBy: ['HR', Validators.required],
      dateRequested: ['18-09-2024', Validators.required],
      dateApproved: ['18-09-2024', Validators.required],
      status: ['done', Validators.required],
      staffleaveId: [this.generateCustomID()],
    });
    this.sId = this.activatedRoute.snapshot.params['staffLeaveId'];
    this.store.dispatch(loadStaffleaves());
    this.patients$ = this.store.select(selectStaffleaves);
    this.patients$.subscribe((data) => {
      const editedData = data.find(
        (product) => product.staffleaveId === this.sId
      );
      if (editedData) {
        this.formGroup.patchValue(editedData);
      }

      this.calculateLeaveCounts(data);
    });
  }

  leaveTypeOptions = [
    { label: 'casual', value: 'casual' },
    { label: 'sick', value: 'sick' },
    { label: 'Vacation', value: 'Vacation' },
    { label: 'Maternity Leave', value: 'Maternity Leave' },
    { label: 'emergency', value: 'emergency' },
    { label: 'Vacation', value: 'Vacation' },
    { label: 'Personal', value: 'Personal' },
  ];

  calculateLeaveCounts(data: LeaveRequest[]) {
    // Reset counts
    this.leaveCounts = {
      casual: 0,
      Sick: 0,
      Maternity: 0,
      emergency: 0,
      Vacation: 0,
    };

    data.forEach((leave) => {
      if (leave.leaveType in this.leaveCounts) {
        this.leaveCounts[leave.leaveType]++;
      }
    });
  }

  totalLeave(): number {
    return Object.values(this.leaveCounts).reduce(
      (sum, count) => sum + count,
      0
    );
  }

  generateCustomID(): string {
    const prefix = 'PES-';
    const randomPart = Math.random().toString(36).substr(2, 9);
    return `${prefix}${randomPart.toUpperCase()}`;
  }
  save() {
    this.store.dispatch(addStaffleave({ Staffleave: this.formGroup.value }));
    this.router.navigate([`/apps-hospital-staff-leaves/`]);
  }
  addOrEdit() {
    if (!this.formGroup.valid) {
      return;
    }

    if (this.sId) {
      this.edit();
    } else {
      this.save();
    }
  }

  edit() {
    this.store.dispatch(
      updateStaffleave({ Staffleave: this.formGroup.getRawValue() })
    );
    this.router.navigate([`/apps-hospital-staff-leaves/`]);
  }
}
