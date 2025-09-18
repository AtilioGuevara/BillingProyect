import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { FlatpickrModule } from '../../../../../../module/flatpickr/flatpickr.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
import { ImageUplodingService } from '../../../../../../service/image-uploding.service';

@Component({
    selector: 'app-parents-create-modal',
    imports: [
        LucideAngularModule,
        ReactiveFormsModule,
        CommonModule,
        NgSelectModule,
        FlatpickrModule,
    ],
    templateUrl: './parents-create-modal.component.html',
    styleUrl: './parents-create-modal.component.scss'
})
export class ParentsCreateModalComponent {
  @Input() config: any;
  fromGroup!: FormGroup;
  mainImage: string | ArrayBuffer | null = null;
  timePickerOptions = { enableTime: true, noCalendar: true, dateFormat: 'H:i' };

  constructor(
    private modalService: ModalService,
    public fb: FormBuilder,
    public imgUploading: ImageUplodingService
  ) { }
  ngOnInit() {
    this.fromGroup = this.fb.group({
      image: ['', Validators.required],
      parentsName: new FormControl('', [Validators.required]),
      studentName: new FormControl('', [Validators.required]),
      relation: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      occupation: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    });

    if (this.config) {
      this.fromGroup.patchValue(this.config);
    }
  }

  genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
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
    let data = {};
    data = {
      isAddOrEdit: this.config ? true : false,
      formData: this.fromGroup.value,
    };
    this.modalService.close(data);
  }
}
