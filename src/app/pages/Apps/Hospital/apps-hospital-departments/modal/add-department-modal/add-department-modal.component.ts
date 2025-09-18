import { Component, Input } from '@angular/core';
import { FlatpickrModule } from '../../../../../../module/flatpickr/flatpickr.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
import { ImageUplodingService } from '../../../../../../service/image-uploding.service';

@Component({
    selector: 'app-add-department-modal',
    imports: [
        LucideAngularModule,
        ReactiveFormsModule,
        CommonModule,
        NgSelectModule,
        FlatpickrModule,
    ],
    templateUrl: './add-department-modal.component.html',
    styleUrl: './add-department-modal.component.scss'
})
export class AddDepartmentModalComponent {
  @Input() config: any;
  fromGroup!: FormGroup;
  timePickerOptions = { enableTime: true, noCalendar: true, dateFormat: 'H:i' };
  imgUrl:any;

  constructor(private modalService: ModalService, public fb: FormBuilder,public imgUploading: ImageUplodingService) {}
  ngOnInit() {
    this.fromGroup = this.fb.group({
      departmentName: new FormControl('', [Validators.required]),
      doctor: new FormControl('', [Validators.required]),
      totalEmployee: new FormControl('', [Validators.required]),
      headOfDepartment: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });

    if (this.config) {
      this.fromGroup.patchValue(this.config);
      this.imgUrl = this.config.image;
    }
  }

  statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Unactive', value: 'Unactive' },
  ];

  onFileChange(event: any) {
    this.imgUploading.uploadFile(event).subscribe({
      next: (result) => {
        // this.fromGroup.get('image')?.setValue(result);
        this.imgUrl = result;
      },
      error: (error) => {
        console.log(error.message);
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
    const departmentID = this.config ? this.config.departmentID : uuidv4();
    const image = this.imgUrl;

    const formData = {
      ...this.fromGroup.value,
      departmentID, // Include departmentID in the form data
      image,
    };

    const data = {
      isAddOrEdit: !!this.config, // true if editing, false if adding
      formData,
    };

    this.modalService.close(data);
  }
}
