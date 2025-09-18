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
import { ModalService } from '../../../../../../../../Core/service/modal/modal.service';
import { FlatpickrModule } from '../../../../../../../../module/flatpickr/flatpickr.module';

@Component({
    selector: 'app-add-reports-modal',
    imports: [
        LucideAngularModule,
        ReactiveFormsModule,
        CommonModule,
        NgSelectModule,
        FlatpickrModule,
    ],
    templateUrl: './add-reports-modal.component.html',
    styleUrl: './add-reports-modal.component.scss'
})
export class AddReportsModalComponent {
  @Input() config: any;
  fromGroup!: FormGroup;
  mainImage: string | ArrayBuffer | null = null;
  timePickerOptions = { enableTime: true, noCalendar: true, dateFormat: 'H:i' };

  constructor(private modalService: ModalService, public fb: FormBuilder) {}
  ngOnInit() {
    this.fromGroup = this.fb.group({
      mainImage: [],
      name: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      doctor: new FormControl('', [Validators.required]),
      clientDetails: new FormControl('', [Validators.required]),
      impressions: new FormControl('', [Validators.required]),
      recommendations: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });

    if (this.config) {
      this.fromGroup.patchValue(this.config);
    }
  }

  reportTypeOptions = [
    { label: 'Max Boucaut', value: 'Max Boucaut' },
    { label: 'Nastasha Tegg', value: 'Nastasha Tegg' },
    { label: 'Ethan Zahel', value: 'Ethan Zahel' },
    { label: 'Ryan Frazer', value: 'Ryan Frazer' },
    { label: 'Julian Marconi', value: 'Julian Marconi' },
  ];

  statusOptions = [
    { label: 'Completed', value: 'Completed' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Pending', value: 'Pending' },
  ];
  RecommendationsOptions = [
    { label: 'Completed', value: 'Completed' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Pending', value: 'Pending' },
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
    let data = {};
    data = {
      isAddOrEdit: this.config ? true : false,
      formData: this.fromGroup.value,
    };
    this.modalService.close(data);
  }
}
