import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
import { LucideAngularModule } from 'lucide-angular';
import { v4 as uuidv4 } from 'uuid';
import { FlatpickrModule } from '../../../../../../module/flatpickr/flatpickr.module';
import { ImageUplodingService } from '../../../../../../service/image-uploding.service';

@Component({
  selector: 'app-add-employee-modal',
  imports: [NgSelectModule, CommonModule, ReactiveFormsModule, LucideAngularModule, FlatpickrModule],
  templateUrl: './add-employee-modal.component.html',
  styleUrl: './add-employee-modal.component.scss'
})
export class AddEmployeeModalComponent {
  @Input() config: any;
  fromGroup!: FormGroup;
  timePickerOptions = { enableTime: true, noCalendar: true, dateFormat: 'H:i' };

  constructor(
    private modalService: ModalService,
    public imgUploading: ImageUplodingService,
    public fb: FormBuilder
  ) { }
  ngOnInit() {
    this.fromGroup = this.fb.group({
      avatar: ['', Validators.required],
      name: new FormControl('', [Validators.required]),
      empType: new FormControl('', [Validators.required]),
      employeeID: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      joinDate: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });

    if (this.config) {
      this.fromGroup.patchValue(this.config);
    }
  }

  typeOptions = [
    { label: 'All Departments', value: 'All Departments' },
    { label: 'Sales', value: 'Sales' },
    { label: 'Management', value: 'Management' },
    { label: 'IT', value: 'IT' },
    { label: 'Human Resources', value: 'Human Resources' },
  ];
  EmploymentOptions = [
    { label: 'Full Time', value: 'Full Time' },
    { label: 'Part Time', value: 'Part Time' },
    { label: 'Management', value: 'Management' },
    { label: 'IT', value: 'IT' },
    { label: 'Human Resources', value: 'Human Resources' },
  ];
  StatusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
  ];

  onFileChange(event: any) {
    this.imgUploading.uploadFile(event).subscribe({
      next: (result) => {
        this.fromGroup.get('avatar')?.setValue(result);
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
    const contactID = this.config ? this.config.contactID : uuidv4();

    const formData = {
      ...this.fromGroup.value,
      contactID, // Include contactID in the form data
    };

    const data = {
      isAddOrEdit: !!this.config, // true if editing, false if adding
      formData,
    };

    this.modalService.close(data);
  }
}
