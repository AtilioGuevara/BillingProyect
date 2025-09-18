import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { v4 as uuidv4 } from 'uuid';
import { ImageUplodingService } from '../../../../../../service/image-uploding.service';

@Component({
    selector: 'app-contact-create-modal',
    imports: [
        LucideAngularModule,
        ReactiveFormsModule,
        CommonModule,
        NgSelectModule,
    ],
    templateUrl: './contact-create-modal.component.html',
    styleUrl: './contact-create-modal.component.scss'
})
export class ContactCreateModalComponent {
  @Input() config: any;
  fromGroup!: FormGroup;
  timePickerOptions = { enableTime: true, noCalendar: true, dateFormat: 'H:i' };

  constructor(
    private modalService: ModalService,
    public fb: FormBuilder,
    public imgUploading: ImageUplodingService
  ) { }
  ngOnInit() {
    this.fromGroup = this.fb.group({
      image: ['', Validators.required],
      contactName: new FormControl('', [Validators.required]),
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\(?\d{1,3}\)?[\s-]?\d{2,4}[\s-]?\d{2,4}[\s-]?\d{2,4}$/)]],
      company: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      website: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });

    if (this.config) {
      this.fromGroup.patchValue(this.config);
    }
  }

  typeOptions = [
    { label: 'Customer', value: 'Customer' },
    { label: 'Personal', value: 'Personal' },
    { label: 'Employee', value: 'Employee' },
    { label: 'Marketing', value: 'Marketing' },
  ];

  onFileChange(event: any) {
    this.imgUploading.uploadFile(event).subscribe({
      next: (result) => {
        this.fromGroup.get('image')?.setValue(result);
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
