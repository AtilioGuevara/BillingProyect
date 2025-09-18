import { CommonModule } from '@angular/common';
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
import { LucideAngularModule } from 'lucide-angular';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
import { FlatpickrModule } from '../../../../../../module/flatpickr/flatpickr.module';
import { ImageUplodingService } from '../../../../../../service/image-uploding.service';

@Component({
    selector: 'app-add-event-modal',
    imports: [
        LucideAngularModule,
        ReactiveFormsModule,
        CommonModule,
        NgSelectModule,
        FlatpickrModule,
    ],
    templateUrl: './add-event-modal.component.html',
    styleUrl: './add-event-modal.component.scss'
})
export class AddEventModalComponent {
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
      eventName: new FormControl('', [Validators.required]),
      eventDate: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      peopleSize: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      eventType: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });

    if (this.config) {
      this.fromGroup.patchValue(this.config);
    }
  }

  typeOptions = [
    { label: 'Offline', value: 'Offline' },
    { label: 'Online', value: 'Online' },
  ];
  statusOptions = [
    { label: 'Published', value: 'Published' },
    { label: 'Coming Soon', value: 'Coming Soon' },
    { label: 'Expired', value: 'Expired' },
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
