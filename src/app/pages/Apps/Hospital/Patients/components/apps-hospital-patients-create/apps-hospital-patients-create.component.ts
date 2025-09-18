import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlatpickrModule } from '../../../../../../module/flatpickr/flatpickr.module';
import { PageTitleComponent } from '../../../../../../layouts/page-title/page-title.component';
import { countryCodes } from '../../../../../../Data/country-codes';
import { NgxMaskPipe, NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Store } from '@ngrx/store';
import {
  addPatient,
  loadPatients,
  updatePatient,
} from '../../store/actions/patients.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { selectPatients } from '../../store/selectors/patients.selectors';
import { LucideAngularModule } from 'lucide-angular';
import { ImageUplodingService } from '../../../../../../service/image-uploding.service';

export interface Patient {
  image: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  weight: string;
  height: string;
  bloodPressure: string;
  phoneNumber: string;
  emergencyNumber: string;
  email: string;
  occupation: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  familyDoctorName: string;
  referringDoctorName: string;
  assignedDoctorName: string;
  pharmacyName: string;
  insuranceOption: string;
  insuranceName: string;
  insurancePolicyNumber: string;
  startDate: string;
  treatmentType: string;
  date: string;
  effectiveDate: string;
  patientID: string;
}

@Component({
    selector: 'app-apps-hospital-patients-create',
    imports: [
        PageTitleComponent,
        CommonModule,
        ReactiveFormsModule,
        NgSelectModule,
        FlatpickrModule,
        FormsModule,
        NgxMaskDirective,
        LucideAngularModule,
    ],
    templateUrl: './apps-hospital-patients-create.component.html',
    styleUrl: './apps-hospital-patients-create.component.scss',
    providers: [provideNgxMask()]
})
export class AppsHospitalPatientsCreateComponent {
  formGroup!: FormGroup;
  patientId!: any;
  showInsuranceCard: boolean = false;
  countryCodes = countryCodes;
  currentMask: string;
  currentMaskForE: string;
  placeholderFormat: string;
  placeholderFormatForE: string;
  pId!: string;
  patients$!: Observable<Patient[]>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public imgUploading: ImageUplodingService
  ) {
    this.currentMask = '000-000-0000';
    this.currentMaskForE = '000-000-0000';
    this.placeholderFormat = '020 123 4567';
    this.placeholderFormatForE = '020 123 4567';
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      firstName: ['', Validators.required],
      image: ['', Validators.required],
      middleName: [''],
      lastName: ['', [Validators.required]],
      dateOfBirth: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      gender: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      bloodPressure: ['', Validators.required],
      phoneNumber: ['456-450-99', Validators.required],
      emergencyNumber: ['456-450-99', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      occupation: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      familyDoctorName: [''],
      referringDoctorName: [''],
      assignedDoctorName: '',
      pharmacyName: [''],
      insuranceOption: ['No', Validators.required],
      insuranceName: [''],
      insurancePolicyNumber: [''],
      startDate: [''],
      effectiveDate: [''],
      patientID: [this.generateCustomID()],
    });

    this.pId = this.activatedRoute.snapshot.params['patientId'];

    if (this.pId) {
      this.store.dispatch(loadPatients());

      this.patients$ = this.store.select(selectPatients);

      // this.store.dispatch(ProductActions.loadProducts());

      // this.products$ = this.store.select(ProductSelectors.selectProducts);

      this.patients$.subscribe((data) => {
        const editedData = data.find(
          (product) => product.patientID === this.pId
        );
        if (editedData) {
          this.formGroup.patchValue(editedData);
        }
      });
    }
  }

  onFileChange(event: any) {
    this.imgUploading.uploadFile(event).subscribe({
      next: (result) => {
        this.formGroup.get('image')?.setValue(result);
      },
    });
  }

  generateCustomID(): string {
    const prefix = 'PEP-';
    const randomPart = Math.random().toString(36).substr(2, 9);
    return `${prefix}${randomPart.toUpperCase()}`;
  }

  onInsuranceChange(event: any) {
    this.showInsuranceCard = event.target.value === 'Yes';
    if (!this.showInsuranceCard) {
      this.formGroup.get('insuranceName')?.reset();
      this.formGroup.get('insurancePolicyNumber')?.reset();
      this.formGroup.get('startDate')?.reset();
      this.formGroup.get('effectiveDate')?.reset();
    }
  }
  trtmentType = [
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Gastroenterology',
    'Oncology',
    'Urology',
    'General Medicine',
  ];

  genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  onSelectChangeHandler(event: any) {
    const selectedCountry = this.countryCodes.find(
      (country) => country.dial_code === event.target.value
    );
    if (selectedCountry) {
      this.currentMask = selectedCountry.mask;
      this.placeholderFormat = selectedCountry.format;
      this.formGroup.get('phoneNumber')?.setValue('');
    }
  }
  onSelectChangeHandlerForE(event: any) {
    const selectedCountry = this.countryCodes.find(
      (country) => country.dial_code === event.target.value
    );
    if (selectedCountry) {
      this.currentMaskForE = selectedCountry.mask;
      this.placeholderFormatForE = selectedCountry.format;
      this.formGroup.get('emergencyNumber')?.setValue('');
    }
  }
  addOrEdit() {
    if (!this.formGroup.valid) {
      return;
    }

    if (this.pId) {
      this.edit();
    } else {
      this.add();
    }
  }

  edit() {
    this.store.dispatch(
      updatePatient({ Patient: this.formGroup.getRawValue() })
    );
    this.router.navigate([`/apps-hospital-patients-lists/`]);
  }

  add() {
    this.store.dispatch(addPatient({ Patient: this.formGroup.getRawValue() }));
    this.router.navigate([`/apps-hospital-patients-lists/`]);
  }
}
