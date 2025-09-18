import { Component, Input } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { FlatpickrModule } from '../../../../../../../../module/flatpickr/flatpickr.module';
import { ModalService } from '../../../../../../../../Core/service/modal/modal.service';

@Component({
    selector: 'app-add-medicine-modal',
    imports: [
        LucideAngularModule,
        ReactiveFormsModule,
        CommonModule,
        NgSelectModule,
        FlatpickrModule,
    ],
    templateUrl: './add-medicine-modal.component.html',
    styleUrl: './add-medicine-modal.component.scss'
})
export class AddMedicineModalComponent {
  @Input() config: any;
  fromGroup!: FormGroup;
  mainImage: string | ArrayBuffer | null = null;
  timePickerOptions = { enableTime: true, noCalendar: true, dateFormat: 'H:i' };

  constructor(private modalService: ModalService, public fb: FormBuilder) {}
  ngOnInit() {
    this.fromGroup = this.fb.group({
      mainImage: [],
      medicineName: new FormControl('', [Validators.required]),
      dosage: new FormControl('', [Validators.required]),
      frequency: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      prescribingDoctor: new FormControl('', [Validators.required]),
      reasonCondition: new FormControl('', [Validators.required]),
      notes: new FormControl('', [Validators.required]),
    });

    if (this.config) {
      this.fromGroup.patchValue(this.config);
    }
  }

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
