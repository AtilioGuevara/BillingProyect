import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import multiMonthPlugin from '@fullcalendar/multimonth'

@Component({
    selector: 'app-apps-calender-multi-month-grid',
    imports: [FullCalendarModule, PageTitleComponent],
    templateUrl: './apps-calender-multi-month-grid.component.html',
    styleUrl: './apps-calender-multi-month-grid.component.scss'
})
export class AppsCalenderMultiMonthGridComponent {

  calendarOptions: CalendarOptions = {
    plugins: [
      multiMonthPlugin,
    ],
    themeSystem: 'sketchy',
    initialView: 'multiMonthYear',
  };

}
