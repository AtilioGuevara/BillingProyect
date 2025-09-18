import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FlatpickrModule } from '../../../../../../../../module/flatpickr/flatpickr.module';
import { ModalService } from '../../../../../../../../Core/service/modal/modal.service';

@Component({
    selector: 'app-add-appointments-modal',
    imports: [
        LucideAngularModule,
        ReactiveFormsModule,
        CommonModule,
        NgSelectModule,
        FlatpickrModule,
    ],
    templateUrl: './add-appointments-modal.component.html',
    styleUrl: './add-appointments-modal.component.scss'
})
export class AddAppointmentsModalComponent {
  @Input() config: any;
  fromGroup!: FormGroup;
  mainImage: string | ArrayBuffer | null = null;
  timePickerOptions = { enableTime: true, noCalendar: true, dateFormat: 'H:i' };

  constructor(private modalService: ModalService, public fb: FormBuilder) {}
  ngOnInit() {
    this.fromGroup = this.fb.group({
      treatmentType: new FormControl('', [Validators.required]),
      reasonCondition: new FormControl('', [Validators.required]),
      notes: new FormControl('', [Validators.required]),
      doctor: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });

    if (this.config) {
      this.fromGroup.patchValue(this.config);
    }
  }

  doctorOptions = [
    { label: 'Dr. Thomas Clark', value: 'Dr. Thomas Clark' },
    { label: 'Dr. Maria Garcia', value: 'Dr. Maria Garcia' },
    { label: 'Dr. Daniel White', value: 'Dr. Daniel White' },
    { label: 'Dr. Samantha Lee', value: 'Dr. Samantha Lee' },
    { label: 'Dr. James Anderson', value: 'Dr. James Anderson' },
    { label: 'Dr. Emily Martinez', value: 'Dr. Emily Martinez' },
  ];
  statusOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Expired', value: 'Expired' },
  ];

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fromGroup.get('mainImage')?.setValue(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  close() {
    this.modalService.close();
  }

  closeEventModal() {
    if (!this.fromGroup.valid) {
      return;
    }
    const date = new Date().toLocaleDateString(); // e.g. 09/28/2024
    const time = new Date().toLocaleTimeString(); // e.g. 10:30:00 AM

    let data = {};
    data = {
      isAddOrEdit: this.config ? true : false,
      formData: {
        ...this.fromGroup.value,
        date, // Add current date
        time, // Add current time
      },
    };

    this.modalService.close(data);
  }
}
