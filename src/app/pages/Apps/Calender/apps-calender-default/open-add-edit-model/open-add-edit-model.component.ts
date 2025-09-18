import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { generateRandomId } from '../../../../../Core/shared functions/shared-functions-varibles';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FlatpickrModule } from '../../../../../module/flatpickr/flatpickr.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { EventsType } from '../apps-calender-default.component';
import { ModalService } from '../../../../../Core/service/modal/modal.service';

@Component({
    selector: 'app-open-add-edit-model',
    imports: [ReactiveFormsModule, CommonModule, LucideAngularModule, FlatpickrModule, NgSelectModule],
    templateUrl: './open-add-edit-model.component.html',
    styleUrl: './open-add-edit-model.component.scss'
})
export class OpenAddEditModelComponent {

  @Input() config: any = {};
  eventData!: FormGroup;
  constructor(private fb: FormBuilder, private mService:ModalService) {
  }

  timePickerOptions = { enableTime: true, noCalendar: true, dateFormat: 'H:i' };
  eventType = EventsType;
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();
  
  defaultEndDate= new Date(this.currentYear, this.currentMonth, 1);
  defaultStartDate= new Date(this.currentYear, this.currentMonth, 1);


  eventTypeData = [
    { value: this.eventType.Events, text: 'Event' },
    { value: this.eventType.FestivalFunction, text: 'Festival Function' },
    { value: this.eventType.Meeting, text: 'Meeting' },
    { value: this.eventType.Personal, text: 'Personal' },
  ]

  ngOnInit() {
    this.eventData = this.fb.group({
      id: [this.config?.id || ''], // Use config for Edit, empty for Add
      title: [this.config?.title || '', Validators.required],
      start: [this.config?.start, Validators.required],
      end: [this.config?.end, Validators.required],    
      time: [this.config?.extendedProps?.time || '12:00', Validators.required],
      gEmail: ['', Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')],
      guests: [this.config?.extendedProps?.guests || ''],
      location: [this.config?.extendedProps?.location || '', Validators.required],
      eventype: [this.config?.extendedProps?.eventype, Validators.required]
    }, { validators: this.dateRangeValidator });
  }
  

  removeGuest(index: number): void {
    const guests = this.eventData.get('guests')?.value;
    if (guests) {
      guests.splice(index, 1);
      this.eventData.get('guests')?.setValue(guests); // Update the form control
    }
  }

  dateRangeValidator(formGroup: FormGroup) {
    const start = formGroup.get('start')?.value;
    const end = formGroup.get('end')?.value;

    return start && end && start <= end ? null : { dateRangeInvalid: true };
  }

  addGuest() {
    const gEmailControl = this.eventData.get('gEmail');

    if (gEmailControl?.invalid) {
      gEmailControl?.markAsTouched();
      return;
    }

    const currentGuests = this.eventData.get('guests')?.value || [];
    const randomImage = `assets/images/avatar/user-${Math.floor(Math.random() * 10) + 1}.png`;

    if (!currentGuests.includes(randomImage)) {
      currentGuests.push(randomImage);
    }
    this.eventData.get('guests')?.setValue(currentGuests);
    gEmailControl?.setValue('');
    gEmailControl?.markAsTouched();
    gEmailControl?.updateValueAndValidity();
  }

  onSubmit() {
    if (!this.eventData.valid) {
      return
    }

    this.mService.close(this.eventData.value)
  }
  
  close() {
    this.mService.close()
  }

}
