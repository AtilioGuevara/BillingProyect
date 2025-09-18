import { Component, Input } from '@angular/core';
import { FlatpickrModule } from '../../../../../../../module/flatpickr/flatpickr.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { LucideAngularModule } from 'lucide-angular';
import { ModalService } from '../../../../../../../Core/service/modal/modal.service';

@Component({
    selector: 'app-add-teacher-modal',
    imports: [
        LucideAngularModule,
        ReactiveFormsModule,
        CommonModule,
        NgSelectModule,
        FlatpickrModule,
    ],
    templateUrl: './add-teacher-modal.component.html',
    styleUrl: './add-teacher-modal.component.scss'
})
export class AddTeacherModalComponent {
  @Input() config: any;
  fromGroup!: FormGroup;
  mainImage: string | ArrayBuffer | null = null;
  timePickerOptions = { enableTime: true, noCalendar: true, dateFormat: 'H:i' };

  constructor(private modalService: ModalService, public fb: FormBuilder) {}
  ngOnInit() {
    this.fromGroup = this.fb.group({
      mainImage: [],
      title: new FormControl('', [Validators.required]),
      teacherName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required]),
      experience: new FormControl('', [Validators.required]),
      lastSchool: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });

    if (this.config) {
      this.fromGroup.patchValue(this.config);
    }
  }

  assigneeOptions = [
    { label: 'Max Boucaut', value: 'Max Boucaut' },
    { label: 'Nastasha Tegg', value: 'Nastasha Tegg' },
    { label: 'Ethan Zahel', value: 'Ethan Zahel' },
    { label: 'Ryan Frazer', value: 'Ryan Frazer' },
    { label: 'Julian Marconi', value: 'Julian Marconi' },
  ];

  statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'On Hold', value: 'On Hold' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Completed', value: 'Completed' },
  ];

  typeOptions = [
    { label: 'Teacher', value: 'Teacher' },
    { label: 'Professor', value: 'Professor' },
    { label: 'Instructor', value: 'Instructor' },
    { label: 'Lecturer', value: 'Lecturer' },
    { label: 'Senior Lecturer', value: 'Senior Lecturer' },
    { label: 'Associate Professor', value: 'Associate Professor' },
    { label: 'Assistant Professor', value: 'Assistant Professor' },
    { label: 'Assistant', value: 'Assistant' },
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
    const teacherID = this.config ? this.config.teacherID : uuidv4();

    const formData = {
      ...this.fromGroup.value,
      teacherID, // Include teacherID in the form data
    };

    const data = {
      isAddOrEdit: !!this.config, // true if editing, false if adding
      formData,
    };

    this.modalService.close(data);
  }
}
