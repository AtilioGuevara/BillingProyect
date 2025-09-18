import { Component, Input } from '@angular/core';
import { FlatpickrModule } from '../../../../../../../module/flatpickr/flatpickr.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ModalService } from '../../../../../../../Core/service/modal/modal.service';

@Component({
    selector: 'app-add-exam-modal',
    imports: [
        LucideAngularModule,
        ReactiveFormsModule,
        CommonModule,
        NgSelectModule,
        FlatpickrModule,
    ],
    templateUrl: './add-exam-modal.component.html',
    styleUrl: './add-exam-modal.component.scss'
})
export class AddExamModalComponent {
  @Input() config: any;
  fromGroup!: FormGroup;
  mainImage: string | ArrayBuffer | null = null;
  timePickerOptions = { enableTime: true, noCalendar: true, dateFormat: 'H:i' };

  constructor(private modalService: ModalService, public fb: FormBuilder) {}
  ngOnInit() {
    this.fromGroup = this.fb.group({
      mainImage: [],
      testName: new FormControl('', [Validators.required]),
      testCategory: new FormControl('', [Validators.required]),
      testType: new FormControl('', [Validators.required]),
      class: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });

    if (this.config) {
      this.fromGroup.patchValue(this.config);
    }
  }

  classOptions = [
    { label: 'STD 8', value: 'STD 8' },
    { label: 'STD 9', value: 'STD 9' },
    { label: 'STD 10', value: 'STD 10' },
    { label: 'STD 11', value: 'STD 11' },
    { label: 'STD 12', value: 'STD 12' },
  ];

  testCategoryOptions = [
    { label: 'Final Test', value: 'Final Test' },
    { label: 'Practice Test', value: 'Practice Test' },
    { label: 'Midterm Test', value: 'Midterm Test' },
    { label: 'Quarterm Test', value: 'Quarterm Test' },
  ];

  statusOptions = [
    { label: 'New', value: 'New' },
    { label: 'Scheduled', value: 'Scheduled' },
    { label: 'Completed', value: 'Completed' },
  ];

  testTypeOptions = [
    { label: 'General', value: 'General' },
    { label: 'Formative', value: 'Formative' },
    { label: 'Summative', value: 'Summative' },
    { label: 'Online', value: 'Online' },
    { label: 'Rejoining', value: 'Rejoining' },
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
    const scheduleID = this.config ? this.config.scheduleID : uuidv4();

    const formData = {
      ...this.fromGroup.value,
      scheduleID, // Include scheduleID in the form data
    };

    const data = {
      isAddOrEdit: !!this.config, // true if editing, false if adding
      formData,
    };

    this.modalService.close(data);
  }
}
