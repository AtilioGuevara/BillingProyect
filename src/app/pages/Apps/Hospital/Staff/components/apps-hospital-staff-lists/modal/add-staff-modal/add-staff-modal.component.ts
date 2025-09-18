import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FlatpickrModule } from '../../../../../../../../module/flatpickr/flatpickr.module';
import { ModalService } from '../../../../../../../../Core/service/modal/modal.service';
import { ImageUplodingService } from '../../../../../../../../service/image-uploding.service';

@Component({
    selector: 'app-add-staff-modal',
    imports: [
        LucideAngularModule,
        ReactiveFormsModule,
        CommonModule,
        NgSelectModule,
        FlatpickrModule,
    ],
    templateUrl: './add-staff-modal.component.html',
    styleUrl: './add-staff-modal.component.scss'
})
export class AddStaffModalComponent {
  @Input() config: any;
  fromGroup!: FormGroup;
  timePickerOptions = { enableTime: true, noCalendar: true, dateFormat: 'H:i' };

  constructor(
    private modalService: ModalService,
    public fb: FormBuilder,
    public imgUploading: ImageUplodingService
  ) {}
  ngOnInit() {
    this.fromGroup = this.fb.group({
      image: ['', Validators.required],
      name: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });

    if (this.config) {
      this.fromGroup.patchValue(this.config);
    }
  }

  departmentOptions = [
    { label: 'STD 8', value: 'STD 8' },
    { label: 'STD 9', value: 'STD 9' },
    { label: 'STD 10', value: 'STD 10' },
    { label: 'STD 11', value: 'STD 11' },
    { label: 'STD 12', value: 'STD 12' },
  ];

  onFileChange(event: any) {
    this.imgUploading.uploadFile(event).subscribe({
      next: (result) => {
        this.fromGroup.get('image')?.setValue(result);
      },
    });
  }

  close() {
    this.modalService.close();
  }

  closeEventModal() {
    if (!this.fromGroup.valid) {
      return;
    }
    const staffID = this.config ? this.config.staffID : uuidv4();

    const formData = {
      ...this.fromGroup.value,
      staffID, // Include staffID in the form data
    };

    const data = {
      isAddOrEdit: !!this.config, // true if editing, false if adding
      formData,
    };

    this.modalService.close(data);
  }
}
