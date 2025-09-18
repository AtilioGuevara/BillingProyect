import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import multiMonthPlugin from '@fullcalendar/multimonth';

@Component({
  selector: 'app-apps-calender-multi-month-stack',
  standalone: true,
  imports: [PageTitleComponent, FullCalendarModule],
  templateUrl: './apps-calender-multi-month-stack.component.html',
  styleUrl: './apps-calender-multi-month-stack.component.scss'
})
export class AppsCalenderMultiMonthStackComponent {
  calendarOptions: CalendarOptions = {
    plugins: [multiMonthPlugin],
    initialView: 'multiMonthYear',
    views: {
      multiMonthYear: {
        type: 'multiMonthYear',
        multiMonthMaxColumns: 1 // Correct placement inside 'views'
      }
    }
  };
}
