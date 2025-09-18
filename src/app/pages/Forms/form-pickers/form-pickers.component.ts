import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from '../../../module/flatpickr/flatpickr.module';

@Component({
    selector: 'app-form-pickers',
    imports: [PageTitleComponent, FlatpickrModule, CommonModule, FormsModule],
    templateUrl: './form-pickers.component.html',
    styleUrl: './form-pickers.component.scss'
})
export class FormPickersComponent {
  basicOptions= { dateFormat: 'd M, Y' };
  humanFriendlyOptions= { dateFormat: 'F j, Y' };
  minMaxDateOptions= { minDate: '2024-01-01', maxDate: '2024-02-13', dateFormat: 'd M, Y' };
  defaultDateOptions= { defaultDate: 'today', dateFormat: 'd M, Y' };
  disableDateOptions= { disable: ['2024-07-17'], dateFormat: 'Y-m-d' };
  shortDateOptions = { dateFormat: 'm/d/y' };
  multipleDatesOptions: any = {mode: 'multiple',dateFormat: 'Y-m-d' };
  fullDateTimeOptions= { enableTime: true, dateFormat: 'd M, Y H:i' };
  rangePickerOptions:any = { mode: 'range', dateFormat: 'd M, Y' };
  weekNumbersOptions= { weekNumbers: true, dateFormat: 'd M, Y' };
  timePickerOptions= { enableTime: true, noCalendar: true, dateFormat: 'H:i' };
  timePicker24hOptions= { enableTime: true, noCalendar: true, dateFormat: 'H:i', time_24hr: true };
  timePickerLimitsOptions= { enableTime: true, noCalendar: true, minTime: '10:30', maxTime: '12:30', dateFormat: 'H:i' };
  preloadingTimeOptions= { enableTime: true, noCalendar: true, defaultHour: 12, defaultMinute: 20, dateFormat: 'H:i' };
  inlineOptions= { inline: true, defaultDate: 'today', dateFormat: 'd M, Y' };
}
