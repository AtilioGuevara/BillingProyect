import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import timeGridPlugin from '@fullcalendar/timegrid'
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { FullCalendarModule } from '@fullcalendar/angular';


@Component({
    selector: 'app-apps-calender-timegrid',
    imports: [PageTitleComponent, FullCalendarModule],
    templateUrl: './apps-calender-timegrid.component.html',
    styleUrl: './apps-calender-timegrid.component.scss'
})
export class AppsCalenderTimegridComponent {

  calendarOptions: CalendarOptions = {
    timeZone: 'America/New_York',
    plugins: [
      timeGridPlugin,
    ],
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay' // user can switch between the two
    }
  };

}
