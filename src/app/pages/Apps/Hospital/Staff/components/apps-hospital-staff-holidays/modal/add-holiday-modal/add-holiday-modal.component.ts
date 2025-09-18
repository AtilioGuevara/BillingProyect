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
import { FlatpickrModule } from '../../../../../../../../module/flatpickr/flatpickr.module';
import { ModalService } from '../../../../../../../../Core/service/modal/modal.service';

@Component({
    selector: 'app-add-holiday-modal',
    imports: [
        LucideAngularModule,
        ReactiveFormsModule,
        CommonModule,
        NgSelectModule,
        FlatpickrModule,
    ],
    templateUrl: './add-holiday-modal.component.html',
    styleUrl: './add-holiday-modal.component.scss'
})
export class AddHolidayModalComponent {
  @Input() config: any;
  fromGroup!: FormGroup;
  timePickerOptions = { enableTime: true, noCalendar: true, dateFormat: 'H:i' };

  constructor(private modalService: ModalService, public fb: FormBuilder) {}
  ngOnInit() {
    this.fromGroup = this.fb.group({
      name: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      day: new FormControl('', [Validators.required]),
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
    let data = {};
    data = {
      isAddOrEdit: this.config ? true : false,
      formData: this.fromGroup.value,
    };
    this.modalService.close(data);
  }
}
